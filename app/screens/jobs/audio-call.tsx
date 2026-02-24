import { callService } from "@/services/callService";
import { socketService } from "@/services/socketService";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import {
  createAudioPlayer,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createAgoraRtcEngine, { RenderModeType, RtcSurfaceView, RtcTextureView, VideoSourceType } from "react-native-agora";
import { ActivityIndicator, PermissionsAndroid, Platform, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const INCOMING_RINGTONE_SOURCE = require("@/assets/sounds/phone_ring_sfx.wav");
const OUTGOING_RINGBACK_SOURCE = require("@/assets/sounds/phone_call_sfx.mp3");

type AgoraSession = {
  appId?: string;
  channelName?: string;
  rtcToken?: string;
  userAccount?: string;
};

const TERMINAL_CALL_STATUSES = new Set(["ended", "completed", "cancelled", "failed"]);
const ACTIVE_PARTICIPANT_STATUSES = new Set(["invited", "ringing", "joined"]);
const TERMINAL_PARTICIPANT_STATUSES = new Set(["left", "declined", "missed"]);
const AUDIO_DEBUG_PREFIX = "[CALL_DEBUG][AUDIO]";

const AudioCallScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    callId?: string;
    roomId?: string;
    mode?: "outgoing" | "incoming";
    callType?: "audio" | "video";
  }>();

  const callId = typeof params.callId === "string" ? params.callId : "";
  const mode = params.mode === "incoming" ? "incoming" : "outgoing";
  const initialCallType = params.callType === "video" ? "video" : "audio";
  const { user } = useAuthStore();

  const [joining, setJoining] = useState(mode === "incoming");
  const [ending, setEnding] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(1);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [isIncomingPending, setIsIncomingPending] = useState(mode === "incoming");
  const [callType, setCallType] = useState<"audio" | "video">(initialCallType);
  const [cameraOff, setCameraOff] = useState(initialCallType !== "video");
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [agoraReady, setAgoraReady] = useState(false);
  const [localJoinedAgora, setLocalJoinedAgora] = useState(false);
  const [agoraError, setAgoraError] = useState("");
  const [remoteVideoUid, setRemoteVideoUid] = useState<number | null>(null);

  const hasLeftRef = useRef(false);
  const hasClosedRef = useRef(false);
  const hasJoinedCallRoomRef = useRef(false);
  const hasAcceptedIncomingRef = useRef(mode !== "incoming");
  const incomingToneRef = useRef<any>(null);
  const ringbackToneRef = useRef<any>(null);
  const agoraEngineRef = useRef<any>(null);
  const localUidRef = useRef<number>(0);
  const remoteUidsRef = useRef<Set<number>>(new Set());
  const joinedAgoraChannelRef = useRef(false);
  const isVideoCall = callType === "video";
  const VideoView = Platform.OS === "android" ? RtcTextureView : RtcSurfaceView;

  useEffect(() => {
    const nextType = params.callType === "video" ? "video" : "audio";
    setCallType(nextType);
    setCameraOff(nextType !== "video");
  }, [params.callType]);

  const getMyParticipantStatus = (callDetails: any) => {
    const participants = Array.isArray(callDetails?.data?.participants)
      ? callDetails.data.participants
      : [];
    const me = participants.find((item: any) => item?.userId === user?.id);
    return String(me?.status || "").toLowerCase();
  };

  const ensureParticipantJoined = async () => {
    if (!callId || !user?.id) throw new Error("Missing call or user context");

    let callDetails = await callService.getCallById(callId);
    let myStatus = getMyParticipantStatus(callDetails);
    console.log(`${AUDIO_DEBUG_PREFIX} ensureParticipantJoined:init`, { callId, myStatus });
    if (myStatus === "joined") return;

    try {
      console.log(`${AUDIO_DEBUG_PREFIX} ensureParticipantJoined:joinCall`, { callId });
      await callService.joinCall(callId, { isMicMuted: muted, isCameraOff: !isVideoCall });
    } catch {
      // If backend already transitioned status, refetch below.
    }

    callDetails = await callService.getCallById(callId);
    myStatus = getMyParticipantStatus(callDetails);
    console.log(`${AUDIO_DEBUG_PREFIX} ensureParticipantJoined:afterJoinCall`, {
      callId,
      myStatus,
    });
    if (myStatus === "joined") return;

    if (!TERMINAL_PARTICIPANT_STATUSES.has(myStatus)) {
      try {
        console.log(`${AUDIO_DEBUG_PREFIX} ensureParticipantJoined:updateStatus`, {
          callId,
          status: "joined",
        });
        await callService.updateCallStatus(callId, "joined");
        socketService.changeCallStatus(callId, "joined", "Joined call");
      } catch {
        // Refetch and validate final status below.
      }
    }

    callDetails = await callService.getCallById(callId);
    myStatus = getMyParticipantStatus(callDetails);
    console.log(`${AUDIO_DEBUG_PREFIX} ensureParticipantJoined:final`, { callId, myStatus });
    if (myStatus !== "joined") {
      throw new Error(
        `Cannot join media session while participant status is '${myStatus || "unknown"}'`
      );
    }
  };

  useEffect(() => {
    if (!startedAt) {
      setElapsed(0);
      return;
    }
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  useEffect(() => {
    if (remoteJoined && !startedAt) {
      setStartedAt(Date.now());
    }
  }, [remoteJoined, startedAt]);

  useEffect(() => {
    if (mode !== "incoming") {
      setJoining(false);
      setIsIncomingPending(false);
      hasAcceptedIncomingRef.current = true;
    } else {
      setJoining(true);
      setIsIncomingPending(true);
      hasAcceptedIncomingRef.current = false;
    }
  }, [mode]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      allowsRecording: true,
    }).catch(() => { });
  }, []);

  const stopTone = async (player: any) => {
    if (!player) return;
    try {
      if (typeof player.stop === "function") {
        player.stop();
      } else {
        player.pause?.();
        await player.seekTo?.(0);
      }
    } catch {
      // no-op
    }
  };

  const ensureIncomingTone = () => {
    if (incomingToneRef.current) return incomingToneRef.current;
    const player = createAudioPlayer(INCOMING_RINGTONE_SOURCE, {
      keepAudioSessionActive: true,
    });
    player.loop = true;
    incomingToneRef.current = player;
    return player;
  };

  const ensureRingbackTone = () => {
    if (ringbackToneRef.current) return ringbackToneRef.current;
    const player = createAudioPlayer(OUTGOING_RINGBACK_SOURCE, {
      keepAudioSessionActive: true,
    });
    player.loop = true;
    ringbackToneRef.current = player;
    return player;
  };

  const closeCallScreen = (message = "Call ended") => {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;
    toast.success(message);
    router.back();
  };

  const cleanupAgora = async () => {
    const engine = agoraEngineRef.current;
    if (!engine) return;
    try {
      if (isVideoCall) {
        engine.stopPreview?.();
        engine.disableVideo?.();
      }
      if (joinedAgoraChannelRef.current && typeof engine.leaveChannel === "function") {
        await engine.leaveChannel();
      }
      engine.unregisterEventHandler?.();
      engine.release?.();
    } catch {
      // no-op
    } finally {
      agoraEngineRef.current = null;
      joinedAgoraChannelRef.current = false;
      localUidRef.current = 0;
      remoteUidsRef.current.clear();
      setRemoteVideoUid(null);
      setLocalJoinedAgora(false);
      setAgoraReady(false);
    }
  };

  const ensureAgoraJoined = async () => {
    if (!callId || joinedAgoraChannelRef.current || !user?.id) return;
    try {
      console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:start`, { callId, mode });
      // Backend requires participant status=joined before media session.
      await ensureParticipantJoined();

      const permission = await requestRecordingPermissionsAsync();
      console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:micPermission`, {
        callId,
        granted: permission.granted,
      });
      if (!permission.granted) throw new Error("Microphone permission denied");

      if (isVideoCall && Platform.OS === "android") {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:cameraPermission`, {
          callId,
          granted: cameraPermission === PermissionsAndroid.RESULTS.GRANTED,
          result: cameraPermission,
        });
        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error("Camera permission denied");
        }
      }

      const sessionResponse = await callService.createMediaSession(callId);
      const session: AgoraSession = sessionResponse?.data || {};
      console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:mediaSession`, {
        callId,
        hasAppId: Boolean(session.appId),
        hasChannelName: Boolean(session.channelName),
        hasRtcToken: Boolean(session.rtcToken),
        hasUserAccount: Boolean(session.userAccount),
        userAccount: session.userAccount || null,
      });
      if (!session.appId || !session.channelName || !session.rtcToken) {
        throw new Error("Invalid media session response");
      }

      const engine = createAgoraRtcEngine();
      const events = {
        onJoinChannelSuccess: (_: string, uid: number) => {
          console.log(`${AUDIO_DEBUG_PREFIX} agora:onJoinChannelSuccess`, { callId, uid });
          localUidRef.current = uid;
          setLocalJoinedAgora(true);
          setJoining(false);
          setAgoraError("");
          if (isVideoCall) {
            try {
              engine.setupLocalVideo?.({
                uid: 0,
                renderMode: RenderModeType.RenderModeHidden,
                sourceType: VideoSourceType.VideoSourceCameraPrimary,
              });
              engine.startPreview?.();
            } catch {
              // no-op
            }
          }
        },
        onUserJoined: (uid: number) => {
          console.log(`${AUDIO_DEBUG_PREFIX} agora:onUserJoined`, { callId, uid });
          remoteUidsRef.current.add(uid);
          if (isVideoCall) {
            setRemoteVideoUid(uid);
            try {
              engine.setupRemoteVideo?.({
                uid,
                renderMode: RenderModeType.RenderModeHidden,
              });
            } catch {
              // no-op
            }
          }
          setRemoteJoined(true);
          setParticipantsCount(Math.max(2, remoteUidsRef.current.size + 1));
          void stopTone(incomingToneRef.current);
          void stopTone(ringbackToneRef.current);
        },
        onUserOffline: (uid: number) => {
          console.log(`${AUDIO_DEBUG_PREFIX} agora:onUserOffline`, { callId, uid });
          remoteUidsRef.current.delete(uid);
          setRemoteVideoUid((prev) => (prev === uid ? null : prev));
          if (remoteUidsRef.current.size === 0) {
            setRemoteJoined(false);
          }
          setParticipantsCount(Math.max(1, remoteUidsRef.current.size + 1));
        },
        onError: (err: number) => {
          console.log(`${AUDIO_DEBUG_PREFIX} agora:onError`, { callId, err });
          setAgoraError(`Agora error: ${err}`);
        },
      };

      engine.initialize({ appId: session.appId });
      engine.registerEventHandler(events);
      engine.enableAudio();
      if (isVideoCall) {
        engine.enableVideo();
      }
      engine.setEnableSpeakerphone?.(speakerOn);

      const channelOptions = {
        autoSubscribeAudio: true,
        autoSubscribeVideo: isVideoCall,
        publishMicrophoneTrack: true,
        publishCameraTrack: isVideoCall && !cameraOff,
        channelProfile: 0,
        clientRoleType: 1,
      };

      if (session.userAccount && typeof engine.joinChannelWithUserAccount === "function") {
        console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:joinChannelWithUserAccount`, {
          callId,
          channelName: session.channelName,
          userAccount: session.userAccount,
        });
        engine.joinChannelWithUserAccount(
          session.rtcToken,
          session.channelName,
          session.userAccount,
          channelOptions
        );
      } else {
        console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:joinChannelUidFallback`, {
          callId,
          channelName: session.channelName,
        });
        engine.joinChannel(
          session.rtcToken,
          session.channelName,
          0,
          channelOptions
        );
      }

      agoraEngineRef.current = engine;
      joinedAgoraChannelRef.current = true;
      setAgoraReady(true);
    } catch (error: any) {
      console.log(`${AUDIO_DEBUG_PREFIX} ensureAgoraJoined:error`, {
        callId,
        message: error?.message,
        responseMessage: error?.response?.data?.message,
      });
      setAgoraError(error?.message || "Failed to join media session");
      toast.error(error?.message || "Failed to join media session");
    }
  };

  const leaveOnce = () => {
    if (!callId || hasLeftRef.current) return;
    console.log(`${AUDIO_DEBUG_PREFIX} leaveOnce`, { callId });
    hasLeftRef.current = true;
    socketService.changeCallStatus(callId, "left", "User left");
    if (hasJoinedCallRoomRef.current) {
      socketService.leaveCall(callId);
      hasJoinedCallRoomRef.current = false;
    }
    void stopTone(incomingToneRef.current);
    void stopTone(ringbackToneRef.current);
    void cleanupAgora();
  };

  useEffect(() => {
    const playState = async () => {
      const isConnected = remoteJoined || Boolean(startedAt);
      const shouldPlayIncoming = isIncomingPending && !isConnected;
      const shouldPlayRingback = mode === "outgoing" && !isIncomingPending && !isConnected;

      if (shouldPlayIncoming) {
        const incoming = ensureIncomingTone();
        if (!incoming.playing) incoming.play();
      } else {
        await stopTone(incomingToneRef.current);
      }

      if (shouldPlayRingback) {
        const ringback = ensureRingbackTone();
        if (!ringback.playing) ringback.play();
      } else {
        await stopTone(ringbackToneRef.current);
      }
    };

    void playState();
  }, [isIncomingPending, mode, remoteJoined, startedAt]);

  useEffect(() => {
    if (!(remoteJoined || startedAt)) return;
    void stopTone(incomingToneRef.current);
    void stopTone(ringbackToneRef.current);
  }, [remoteJoined, startedAt]);

  useEffect(() => {
    if (!callId || !user?.id) return;

    const bindEffectStartedAt = Date.now();
    let mounted = true;
    let onParticipants: ((payload: any) => void) | null = null;
    let onJoined: ((payload: any) => void) | null = null;
    let onEnded: ((payload: any) => void) | null = null;
    let onParticipantStatusChanged: ((payload: any) => void) | null = null;
    let onParticipantLeft: ((payload: any) => void) | null = null;
    let onParticipantDisconnected: ((payload: any) => void) | null = null;

    const bindCallSocket = async () => {
      try {
        await socketService.connectCalls();
        const details = await callService.getCallById(callId);
        const detectedType = String(details?.data?.type || "").toLowerCase() === "video" ? "video" : "audio";
        setCallType(detectedType);
        if (detectedType === "video") {
          setCameraOff(false);
        }
        const participants = Array.isArray(details?.data?.participants) ? details.data.participants : [];
        const me = participants.find((item: any) => item?.userId === user.id);
        const myStatus = String(me?.status || "").toLowerCase();
        const shouldJoinCallRoom = !["left", "declined", "missed"].includes(myStatus);

        if (shouldJoinCallRoom) {
          socketService.joinCall(callId);
          hasJoinedCallRoomRef.current = true;
        }

        if (mode === "outgoing" && shouldJoinCallRoom) {
          await ensureAgoraJoined();
        }

        onParticipants = (payload: any) => {
          if (payload?.callId !== callId || !mounted) return;
          const participantsList = Array.isArray(payload?.participants) ? payload.participants : [];
          const active = participantsList.filter((item: any) =>
            ACTIVE_PARTICIPANT_STATUSES.has(String(item?.status || "").toLowerCase())
          );
          const hasOtherJoined = participantsList.some(
            (item: any) =>
              item?.userId &&
              item.userId !== user.id &&
              String(item?.status || "").toLowerCase() === "joined"
          );
          setParticipantsCount(Math.max(1, active.length || participantsList.length || 1));
          setRemoteJoined(hasOtherJoined);
          if (hasOtherJoined) setJoining(false);
        };

        onJoined = (payload: any) => {
          const participantId = payload?.userId;
          if (!participantId || participantId === user.id || !mounted) return;
          setRemoteJoined(true);
          setJoining(false);
          setParticipantsCount((prev) => Math.max(2, prev + 1));
        };

        onEnded = (payload: any) => {
          if (!mounted || payload?.callId !== callId) return;
          closeCallScreen();
        };

        onParticipantStatusChanged = (payload: any) => {
          const participantId = payload?.userId;
          const status = String(payload?.status || "").toLowerCase();
          const eventCallId = payload?.callId;
          if (!mounted || !participantId) return;
          if (eventCallId && eventCallId !== callId) return;

          if (participantId === user.id) {
            if (mode === "incoming" && status === "joined") {
              setIsIncomingPending(false);
              setJoining(true);
            }
            return;
          }

          if (status === "joined") {
            setRemoteJoined(true);
            setJoining(false);
          }
          if (status === "declined" || status === "missed" || status === "left") {
            closeCallScreen();
          }
        };

        const closeOnRemoteLeave = (payload: any) => {
          const participantId = payload?.userId;
          const eventCallId = payload?.callId;
          if (!mounted || !participantId || participantId === user.id) return;
          if (eventCallId && eventCallId !== callId) return;
          closeCallScreen();
        };

        onParticipantLeft = closeOnRemoteLeave;
        onParticipantDisconnected = closeOnRemoteLeave;

        socketService.onCallParticipants(onParticipants);
        socketService.onParticipantJoined(onJoined);
        socketService.onCallEnded(onEnded);
        socketService.onParticipantStatusChanged(onParticipantStatusChanged);
        socketService.onParticipantLeft(onParticipantLeft);
        socketService.onParticipantDisconnected(onParticipantDisconnected);
      } catch (error: any) {
        if (mounted) toast.error(error?.message || "Failed to connect call socket");
      }
    };

    void bindCallSocket();

    return () => {
      mounted = false;
      const mountedForMs = Date.now() - bindEffectStartedAt;
      const isDevStrictModeCleanup = __DEV__ && mountedForMs < 120;
      if (!isDevStrictModeCleanup) {
        leaveOnce();
      }
      if (onParticipants) socketService.offCallParticipants(onParticipants);
      if (onJoined) socketService.offParticipantJoined(onJoined);
      if (onEnded) socketService.offCallEnded(onEnded);
      if (onParticipantStatusChanged) socketService.offParticipantStatusChanged(onParticipantStatusChanged);
      if (onParticipantLeft) socketService.offParticipantLeft(onParticipantLeft);
      if (onParticipantDisconnected) socketService.offParticipantDisconnected(onParticipantDisconnected);
    };
  }, [callId, mode, user?.id]);

  useEffect(() => {
    hasClosedRef.current = false;
    return () => {
      void stopTone(incomingToneRef.current);
      void stopTone(ringbackToneRef.current);
      void cleanupAgora();
      incomingToneRef.current?.remove?.();
      ringbackToneRef.current?.remove?.();
      incomingToneRef.current = null;
      ringbackToneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!callId) return;
    let mounted = true;
    const interval = setInterval(async () => {
      if (!mounted || hasClosedRef.current) return;
      try {
        const details = await callService.getCallById(callId);
        const status = String(details?.data?.status || "").toLowerCase();
        const participants = Array.isArray(details?.data?.participants) ? details.data.participants : [];
        const hasRemoteJoined = participants.some(
          (item: any) =>
            item?.userId &&
            item.userId !== user?.id &&
            String(item?.status || "").toLowerCase() === "joined"
        );
        const hasRemoteActive = participants.some(
          (item: any) =>
            item?.userId &&
            item.userId !== user?.id &&
            ACTIVE_PARTICIPANT_STATUSES.has(String(item?.status || "").toLowerCase())
        );

        if (hasRemoteJoined) {
          if (mode === "outgoing" || hasAcceptedIncomingRef.current) {
            setRemoteJoined(true);
            setJoining(false);
            setIsIncomingPending(false);
            setParticipantsCount((prev) => Math.max(2, prev));
            void stopTone(incomingToneRef.current);
            void stopTone(ringbackToneRef.current);
          }
        }

        if (TERMINAL_CALL_STATUSES.has(status)) {
          closeCallScreen();
          return;
        }

        if ((mode === "outgoing" || hasAcceptedIncomingRef.current) && !hasRemoteActive && remoteJoined) {
          closeCallScreen();
        }
      } catch {
        // no-op
      }
    }, 2500);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [callId, mode, remoteJoined, user?.id]);

  const durationText = useMemo(() => {
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [elapsed]);

  const callStatusText = useMemo(() => {
    if (isIncomingPending) return "Incoming call...";
    if (joining) return "Connecting...";
    if (!remoteJoined) return "Ringing...";
    return durationText;
  }, [durationText, isIncomingPending, joining, remoteJoined]);

  const debugUiText = useMemo(() => {
    return [
      `callId: ${callId || "-"}`,
      `mode: ${mode}`,
      `type: ${callType}`,
      `status: ${callStatusText}`,
      `joining: ${joining} | remoteJoined: ${remoteJoined}`,
      `incomingPending: ${isIncomingPending}`,
      `participants: ${participantsCount}`,
      `agoraReady: ${agoraReady} | localJoined: ${localJoinedAgora}`,
      `socketJoinedCallRoom: ${hasJoinedCallRoomRef.current}`,
      `hasLeft: ${hasLeftRef.current}`,
      `muted: ${muted} | speaker: ${speakerOn}`,
      `cameraOff: ${cameraOff}`,
      `cameraFacing: ${isFrontCamera ? "front" : "back"}`,
    ].join("\n");
  }, [
    callId,
    mode,
    callStatusText,
    callType,
    joining,
    remoteJoined,
    isIncomingPending,
    participantsCount,
    agoraReady,
    localJoinedAgora,
    muted,
    speakerOn,
    cameraOff,
    isFrontCamera,
  ]);

  const handleAccept = async () => {
    if (!callId || accepting) return;
    try {
      console.log(`${AUDIO_DEBUG_PREFIX} handleAccept:start`, { callId });
      setAccepting(true);
      await callService.joinCall(callId, { isMicMuted: false, isCameraOff: !isVideoCall });
      try {
        await callService.updateCallStatus(callId, "joined");
      } catch {
        // backend may set status via join call
      }
      hasAcceptedIncomingRef.current = true;
      if (!hasJoinedCallRoomRef.current) {
        socketService.joinCall(callId);
        hasJoinedCallRoomRef.current = true;
      }
      socketService.changeCallStatus(callId, "joined", "User accepted call");
      setIsIncomingPending(false);
      setJoining(true);
      await stopTone(incomingToneRef.current);
      await stopTone(ringbackToneRef.current);
      await ensureAgoraJoined();
    } catch (error: any) {
      console.log(`${AUDIO_DEBUG_PREFIX} handleAccept:error`, {
        callId,
        message: error?.message,
        responseMessage: error?.response?.data?.message,
      });
      const message = error?.response?.data?.message || error?.message || "Failed to accept call";
      toast.error(message);
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = async () => {
    if (!callId || rejecting) return;
    try {
      setRejecting(true);
      socketService.changeCallStatus(callId, "declined", "User declined");
      await callService.updateCallStatus(callId, "declined");
      leaveOnce();
    } finally {
      setRejecting(false);
      router.back();
    }
  };

  const handleEnd = async () => {
    if (!callId || ending) {
      router.back();
      return;
    }
    try {
      console.log(`${AUDIO_DEBUG_PREFIX} handleEnd:start`, { callId });
      setEnding(true);
      leaveOnce();
      await callService.endCall(callId);
    } catch (error: any) {
      toast.error(error?.message || "Failed to end call");
    } finally {
      setEnding(false);
      router.back();
    }
  };

  const handleToggleCamera = useCallback(() => {
    if (!isVideoCall) return;
    const next = !cameraOff;
    setCameraOff(next);
    try {
      agoraEngineRef.current?.muteLocalVideoStream?.(next);
      if (!next) {
        agoraEngineRef.current?.startPreview?.();
      } else {
        agoraEngineRef.current?.stopPreview?.();
      }
    } catch {
      // no-op
    }
    if (callId) {
      socketService.changeMediaState(callId, muted, next, false);
      void callService.updateMediaState(callId, {
        isMicMuted: muted,
        isCameraOff: next,
        isSharingScreen: false,
      });
    }
  }, [callId, cameraOff, isVideoCall, muted]);

  const handleSwitchCamera = useCallback(() => {
    if (!isVideoCall) return;
    try {
      agoraEngineRef.current?.switchCamera?.();
      setIsFrontCamera((prev) => !prev);
      console.log(`${AUDIO_DEBUG_PREFIX} switchCamera`, {
        callId,
        nextFacing: isFrontCamera ? "back" : "front",
      });
    } catch (error: any) {
      console.log(`${AUDIO_DEBUG_PREFIX} switchCamera:error`, {
        callId,
        message: error?.message,
      });
      toast.error("Failed to switch camera");
    }
  }, [callId, isFrontCamera, isVideoCall]);

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 justify-between px-6 py-8">
        <View className="items-center mt-10">
          <Text className="font-proximanova-bold text-white text-2xl">
            {isVideoCall ? "Video Call" : "Audio Call"}
          </Text>
          <Text className="font-proximanova-regular text-[#CBD5E1] mt-2">{callStatusText}</Text>
          <Text className="font-proximanova-regular text-[#94A3B8] mt-1 text-xs">
            Participants: {participantsCount}
          </Text>
          <Text className="font-proximanova-regular text-[#94A3B8] mt-1 text-xs">
            Agora: {agoraReady ? "ready" : "initializing"} | Local: {localJoinedAgora ? "joined" : "pending"}
          </Text>
          {agoraError ? (
            <Text className="font-proximanova-regular text-[#FCA5A5] mt-1 text-xs">{agoraError}</Text>
          ) : null}
          <View className="mt-3 w-full rounded-lg bg-[#111827] p-3">
            <Text className="font-proximanova-semibold text-[11px] text-[#93C5FD]">Debug</Text>
            <Text className="mt-1 font-proximanova-regular text-[10px] text-[#CBD5E1]">
              {debugUiText}
            </Text>
          </View>
          {joining ? <ActivityIndicator className="mt-4" color="#ffffff" /> : null}
        </View>

        {isVideoCall ? (
          <View className="flex-1 mt-6">
            {remoteVideoUid !== null ? (
              <VideoView
                canvas={{ uid: remoteVideoUid, renderMode: RenderModeType.RenderModeHidden }}
                style={{ flex: 1, backgroundColor: "#0A0F1F" }}
              />
            ) : (
              <View
                style={{ flex: 1, borderRadius: 12, backgroundColor: "#0A0F1F", alignItems: "center", justifyContent: "center" }}
              >
                <Text className="font-proximanova-regular text-[#CBD5E1]">
                  Waiting for video...
                </Text>
              </View>
            )}
            <View style={{ position: "absolute", right: 12, bottom: 12, width: 110, height: 160, borderRadius: 10, backgroundColor: "#111827" }}>
              <VideoView
                canvas={{
                  uid: 0,
                  renderMode: RenderModeType.RenderModeHidden,
                  sourceType: VideoSourceType.VideoSourceCameraPrimary,
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ) : null}

        {isIncomingPending ? (
          <View className="flex-row items-center justify-center gap-8 mb-8">
            <TouchableOpacity
              onPress={handleReject}
              disabled={rejecting || accepting}
              className="w-16 h-16 rounded-full bg-[#EF4444] items-center justify-center"
            >
              {rejecting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Ionicons name="call" size={26} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAccept}
              disabled={accepting || rejecting}
              className="w-16 h-16 rounded-full bg-[#22C55E] items-center justify-center"
            >
              {accepting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Ionicons name="call" size={26} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row items-center justify-center gap-6 mb-8 mt-8">
            <TouchableOpacity
              onPress={async () => {
                const next = !muted;
                setMuted(next);
                if (callId) {
                  socketService.changeMediaState(callId, next);
                  void callService.updateMediaState(callId, { isMicMuted: next, isCameraOff: !isVideoCall || cameraOff, isSharingScreen: false });
                }
                try {
                  agoraEngineRef.current?.muteLocalAudioStream?.(next);
                } catch {
                  // no-op
                }
              }}
              className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
            >
              <Ionicons
                name={muted ? "mic-off-outline" : "mic-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEnd}
              className="w-16 h-16 rounded-full bg-[#EF4444] items-center justify-center"
            >
              {ending ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Ionicons name="call" size={26} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const next = !speakerOn;
                setSpeakerOn(next);
                try {
                  agoraEngineRef.current?.setEnableSpeakerphone?.(next);
                } catch {
                  // no-op
                }
              }}
              className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
              >
              <Ionicons
                name={speakerOn ? "volume-high-outline" : "volume-mute-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {isVideoCall ? (
              <TouchableOpacity
                onPress={handleToggleCamera}
                className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
              >
                <Ionicons
                  name={cameraOff ? "videocam-off-outline" : "videocam-outline"}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            ) : null}

            {isVideoCall ? (
              <TouchableOpacity
                onPress={handleSwitchCamera}
                className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
              >
                <Ionicons name="camera-reverse-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AudioCallScreen;
