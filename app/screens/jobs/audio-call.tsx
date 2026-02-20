import { callService } from "@/services/callService";
import { socketService } from "@/services/socketService";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import {
  mediaDevices,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from "@livekit/react-native-webrtc";
import {
  createAudioPlayer,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const INCOMING_RINGTONE_SOURCE = require("@/assets/sounds/phone_ring_sfx.wav");
const OUTGOING_RINGBACK_SOURCE = require("@/assets/sounds/phone_call_sfx.mp3");

const AudioCallScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    callId?: string;
    roomId?: string;
    mode?: "outgoing" | "incoming";
  }>();

  const callId = typeof params.callId === "string" ? params.callId : "";
  const mode = params.mode === "incoming" ? "incoming" : "outgoing";
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
  const [webrtcReady, setWebrtcReady] = useState(false);
  const [localAudioReady, setLocalAudioReady] = useState(false);
  const [remoteAudioReady, setRemoteAudioReady] = useState(false);
  const [pcConnectionState, setPcConnectionState] = useState("new");
  const [pcIceState, setPcIceState] = useState("new");
  const [pcSignalingState, setPcSignalingState] = useState("stable");
  const [lastWebrtcError, setLastWebrtcError] = useState<string>("");
  const hasLeftRef = useRef(false);
  const hasClosedRef = useRef(false);
  const hasAcceptedIncomingRef = useRef(mode !== "incoming");
  const hasConnectedOnceRef = useRef(false);
  const hasJoinedCallRoomRef = useRef(false);
  const hasSentOfferRef = useRef(false);
  const remoteUserIdRef = useRef<string | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<any>(null);
  const pendingCandidatesRef = useRef<any[]>([]);
  const incomingToneRef = useRef<any>(null);
  const ringbackToneRef = useRef<any>(null);

  useEffect(() => {
    console.log("[CALL_DEBUG] audio-call:mounted", { callId, mode, roomId: params.roomId });
  }, [callId, mode, params.roomId]);

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
    hasConnectedOnceRef.current = false;
  }, [mode]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      allowsRecording: true,
    }).catch(() => { });
  }, []);

  const cleanupWebRTC = async () => {
    try {
      pendingCandidatesRef.current = [];
      hasSentOfferRef.current = false;
      if (pcRef.current) {
        pcRef.current.onicecandidate = null;
        pcRef.current.ontrack = null;
        pcRef.current.close();
        pcRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks?.().forEach((track: any) => {
          try {
            track.stop();
          } catch {
            // no-op
          }
        });
        localStreamRef.current = null;
      }
      setWebrtcReady(false);
      setLocalAudioReady(false);
      setRemoteAudioReady(false);
      setPcConnectionState("closed");
      setPcIceState("closed");
      setPcSignalingState("closed");
    } catch {
      // no-op
    }
  };

  const ensureWebRTC = async () => {
    if (pcRef.current) return pcRef.current;

    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      throw new Error("Microphone permission denied");
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setLocalAudioReady(stream.getAudioTracks?.().length > 0);
    localStreamRef.current = stream;
    stream.getTracks().forEach((track: any) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      const candidate = event?.candidate;
      const targetUserId = remoteUserIdRef.current;
      if (!candidate || !targetUserId || !callId) return;
      socketService.sendIceCandidate(callId, targetUserId, candidate);
    };

    pc.ontrack = () => {
      // Remote audio track received; playback is handled by native WebRTC audio session.
      setRemoteAudioReady(true);
    };

    pc.onconnectionstatechange = () => {
      setPcConnectionState(String(pc.connectionState || ""));
    };

    pc.oniceconnectionstatechange = () => {
      setPcIceState(String(pc.iceConnectionState || ""));
    };

    pc.onsignalingstatechange = () => {
      setPcSignalingState(String(pc.signalingState || ""));
    };

    pcRef.current = pc;
    setWebrtcReady(true);
    setLastWebrtcError("");
    return pc;
  };

  const flushPendingCandidates = async () => {
    const pc = pcRef.current;
    if (!pc || !pc.remoteDescription) return;
    while (pendingCandidatesRef.current.length > 0) {
      const candidate = pendingCandidatesRef.current.shift();
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {
        // ignore malformed candidate
      }
    }
  };

  const createAndSendOffer = async () => {
    if (!callId) return;
    const targetUserId = remoteUserIdRef.current;
    if (!targetUserId) return;

    const pc = await ensureWebRTC();
    if (hasSentOfferRef.current && pc.localDescription && !pc.remoteDescription) {
      socketService.sendOffer(callId, targetUserId, pc.localDescription);
      return;
    }
    if (hasSentOfferRef.current) return;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketService.sendOffer(callId, targetUserId, offer);
    hasSentOfferRef.current = true;
  };

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

  useEffect(() => {
    const playState = async () => {
      const isConnected = remoteJoined || Boolean(startedAt);
      const shouldPlayIncoming = isIncomingPending && !isConnected;
      const shouldPlayRingback =
        mode === "outgoing" && !isIncomingPending && !isConnected;

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

  const leaveOnce = () => {
    if (!callId || hasLeftRef.current) return;
    hasLeftRef.current = true;
    socketService.changeCallStatus(callId, "left", "User left");
    if (hasJoinedCallRoomRef.current) {
      socketService.leaveCall(callId);
      hasJoinedCallRoomRef.current = false;
    }
    void stopTone(incomingToneRef.current);
    void stopTone(ringbackToneRef.current);
    void cleanupWebRTC();
  };

  const closeCallScreen = (message = "Call ended") => {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;
    toast.success(message);
    router.back();
  };

  useEffect(() => {
    if (!callId) return;

    let mounted = true;
    let onParticipants: ((payload: any) => void) | null = null;
    let onJoined: ((payload: any) => void) | null = null;
    let onEnded: ((payload: any) => void) | null = null;
    let onParticipantStatusChanged: ((payload: any) => void) | null = null;
    let onParticipantLeft: ((payload: any) => void) | null = null;
    let onParticipantDisconnected: ((payload: any) => void) | null = null;
    let onOffer: ((payload: any) => void) | null = null;
    let onAnswer: ((payload: any) => void) | null = null;
    let onIceCandidate: ((payload: any) => void) | null = null;

    const bindCallSocket = async () => {
      try {
        await socketService.connectCalls();
        const details = await callService.getCallById(callId);
        const participants = Array.isArray(details?.data?.participants)
          ? details.data.participants
          : [];
        const initialRemote = participants.find(
          (item: any) => item?.userId && item.userId !== user?.id
        );
        if (initialRemote?.userId) {
          remoteUserIdRef.current = initialRemote.userId;
        }
        const me = participants.find((item: any) => item?.userId === user?.id);
        const myRole = String(me?.role || "").toLowerCase();
        const myStatus = String(me?.status || "").toLowerCase();
        const isIncomingReceiverPending =
          mode === "incoming" &&
          myRole === "receiver" &&
          (myStatus === "invited" || myStatus === "ringing");
        const canJoinSocketRoom =
          !["left", "declined", "missed"].includes(myStatus) &&
          !isIncomingReceiverPending;
        if (canJoinSocketRoom) {
          socketService.joinCall(callId);
          hasJoinedCallRoomRef.current = true;
        }

        onParticipants = (payload: any) => {
          const sameCall = payload?.callId === callId;
          if (!sameCall) return;

          const participants = Array.isArray(payload?.participants)
            ? payload.participants
            : [];
          const remoteParticipants = participants.filter(
            (item: any) => item?.userId && item.userId !== user?.id
          );
          const hasRemoteActive = remoteParticipants.some((item: any) =>
            ["joined", "ringing", "invited"].includes(
              String(item?.status || "").toLowerCase()
            )
          );
          const active = participants.filter((item: any) =>
            item?.status === "joined" || item?.status === "ringing"
          );
          const hasSelfInPayload = participants.some(
            (item: any) => item?.userId === user?.id
          );
          const me = participants.find((item: any) => item?.userId === user?.id);
          const myStatus = String(me?.status || "").toLowerCase();

          if (!mounted) return;
          const hasOtherJoined = participants.some(
            (item: any) =>
              item?.userId &&
              item.userId !== user?.id &&
              item?.status === "joined"
          );
          const remote = participants.find(
            (item: any) => item?.userId && item.userId !== user?.id
          );
          remoteUserIdRef.current = remote?.userId || remoteUserIdRef.current;
          let nextCount = active.length || participants.length || 1;
          // Some backend payloads omit the current user from participant snapshots.
          if (hasOtherJoined && !hasSelfInPayload) {
            nextCount += 1;
          }
          if (hasOtherJoined) {
            nextCount = Math.max(2, nextCount);
          }
          // Backend may return a partial participant list (self only) on receiver side.
          // After accept/join, force connected UI/count.
          const shouldForceIncomingConnected =
            mode === "incoming" &&
            !isIncomingPending &&
            hasAcceptedIncomingRef.current;
          if (
            shouldForceIncomingConnected &&
            (myStatus === "joined" || !myStatus || !hasOtherJoined)
          ) {
            setRemoteJoined(true);
            hasConnectedOnceRef.current = true;
            nextCount = Math.max(2, nextCount);
          } else {
            if (hasOtherJoined) {
              hasConnectedOnceRef.current = true;
              setRemoteJoined(true);
            } else {
              setRemoteJoined((prev) =>
                hasConnectedOnceRef.current ? prev : false
              );
            }
          }
          setParticipantsCount(nextCount);
          if (hasOtherJoined) setJoining(false);
          if (
            mode === "incoming" &&
            !isIncomingPending &&
            (myStatus === "joined" || shouldForceIncomingConnected)
          ) {
            setJoining(false);
          }
          if (hasOtherJoined && mode === "outgoing") {
            void createAndSendOffer();
          }
          if (
            remoteParticipants.length > 0 &&
            !hasRemoteActive
          ) {
            closeCallScreen();
          }
        };

        onJoined = (payload: any) => {
          const participantId = payload?.userId;
          if (!mounted || !participantId || participantId === user?.id) return;
          setRemoteJoined(true);
          setJoining(false);
          setParticipantsCount((prev) => Math.max(2, prev + 1));
          remoteUserIdRef.current = participantId;
          if (mode === "outgoing") {
            void createAndSendOffer();
          }
        };

        onEnded = (payload: any) => {
          const endedCallId = payload?.callId;
          if (!mounted || endedCallId !== callId) return;
          closeCallScreen();
        };

        onParticipantStatusChanged = (payload: any) => {
          const eventCallId = payload?.callId;
          if (eventCallId && eventCallId !== callId) return;
          const participantId = payload?.userId;
          const status = String(payload?.status || "").toLowerCase();
          if (!mounted || !participantId) return;
          if (participantId === user?.id) {
            if (mode === "incoming" && status === "joined") {
              hasAcceptedIncomingRef.current = true;
              setIsIncomingPending(false);
              setJoining(false);
              setRemoteJoined(true);
              setParticipantsCount((prev) => Math.max(2, prev));
            }
            return;
          }
          remoteUserIdRef.current = participantId;
          if (mode === "outgoing" && status === "joined") {
            hasConnectedOnceRef.current = true;
            setRemoteJoined(true);
            setJoining(false);
            void stopTone(incomingToneRef.current);
            void stopTone(ringbackToneRef.current);
            void createAndSendOffer();
          }
          if (status === "declined" || status === "missed" || status === "left") {
            closeCallScreen();
          }
        };

        const closeIfRemoteEvent = (payload: any) => {
          const eventCallId = payload?.callId;
          if (!eventCallId || eventCallId !== callId) return;
          const participantId = payload?.userId;
          if (!participantId || participantId === user?.id) return;
          void (async () => {
            try {
              const details = await callService.getCallById(callId);
              const participants = Array.isArray(details?.data?.participants)
                ? details.data.participants
                : [];
              const hasOtherStillActive = participants.some(
                (item: any) =>
                  item?.userId &&
                  item.userId !== user?.id &&
                  ["joined", "ringing", "invited"].includes(
                    String(item?.status || "").toLowerCase()
                  )
              );
              if (hasOtherStillActive) return;
            } catch {
              // If call lookup fails, fall back to closing to avoid stale UI.
            }
            closeCallScreen();
          })();
        };

        onParticipantLeft = (payload: any) => closeIfRemoteEvent(payload);
        onParticipantDisconnected = (payload: any) => closeIfRemoteEvent(payload);

        onOffer = async (payload: any) => {
          const eventCallId = payload?.callId;
          const fromUserId = payload?.fromUserId;
          const offer = payload?.offer;
          if (!eventCallId || eventCallId !== callId || !offer || !fromUserId) return;
          remoteUserIdRef.current = fromUserId;
          try {
            const pc = await ensureWebRTC();
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            await flushPendingCandidates();
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socketService.sendAnswer(callId, fromUserId, answer);
          } catch (error: any) {
            setLastWebrtcError(error?.message || "offer handling failed");
            toast.error(error?.message || "Failed to process incoming call offer");
          }
        };

        onAnswer = async (payload: any) => {
          const eventCallId = payload?.callId;
          const answer = payload?.answer;
          if (!eventCallId || eventCallId !== callId || !answer) return;
          try {
            const pc = await ensureWebRTC();
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
            await flushPendingCandidates();
            hasConnectedOnceRef.current = true;
            setRemoteJoined(true);
            setJoining(false);
            void stopTone(incomingToneRef.current);
            void stopTone(ringbackToneRef.current);
          } catch (error: any) {
            setLastWebrtcError(error?.message || "answer handling failed");
            toast.error(error?.message || "Failed to process call answer");
          }
        };

        onIceCandidate = async (payload: any) => {
          const eventCallId = payload?.callId;
          const candidate = payload?.candidate;
          if (!eventCallId || eventCallId !== callId || !candidate) return;
          const pc = pcRef.current;
          if (!pc || !pc.remoteDescription) {
            pendingCandidatesRef.current.push(candidate);
            return;
          }
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {
            // ignore malformed candidate
          }
        };

        socketService.onCallParticipants(onParticipants);
        socketService.onParticipantJoined(onJoined);
        socketService.onCallEnded(onEnded);
        socketService.onParticipantStatusChanged(onParticipantStatusChanged);
        socketService.onParticipantLeft(onParticipantLeft);
        socketService.onParticipantDisconnected(onParticipantDisconnected);
        socketService.onOffer(onOffer);
        socketService.onAnswer(onAnswer);
        socketService.onIceCandidate(onIceCandidate);
      } catch (error: any) {
        if (mounted) {
          toast.error(error?.message || "Failed to connect call socket");
        }
      }
    };

    bindCallSocket();

    return () => {
      mounted = false;
      leaveOnce();
      if (onParticipants) socketService.offCallParticipants(onParticipants);
      if (onJoined) socketService.offParticipantJoined(onJoined);
      if (onEnded) socketService.offCallEnded(onEnded);
      if (onParticipantStatusChanged) {
        socketService.offParticipantStatusChanged(onParticipantStatusChanged);
      }
      if (onParticipantLeft) {
        socketService.offParticipantLeft(onParticipantLeft);
      }
      if (onParticipantDisconnected) {
        socketService.offParticipantDisconnected(onParticipantDisconnected);
      }
      if (onOffer) socketService.offOffer(onOffer);
      if (onAnswer) socketService.offAnswer(onAnswer);
      if (onIceCandidate) socketService.offIceCandidate(onIceCandidate);
    };
  }, [callId, mode, router, user?.id]);

  useEffect(() => {
    hasClosedRef.current = false;
    return () => {
      void stopTone(incomingToneRef.current);
      void stopTone(ringbackToneRef.current);
      void cleanupWebRTC();
      incomingToneRef.current?.remove?.();
      ringbackToneRef.current?.remove?.();
      incomingToneRef.current = null;
      ringbackToneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!callId) return;
    let isMounted = true;
    const interval = setInterval(async () => {
      if (!isMounted || hasClosedRef.current) return;
      try {
        const details = await callService.getCallById(callId);
        const status = String(details?.data?.status || "").toLowerCase();
        const participants = Array.isArray(details?.data?.participants)
          ? details.data.participants
          : [];
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
            ["joined", "ringing", "invited"].includes(
              String(item?.status || "").toLowerCase()
            )
        );

        if (hasRemoteJoined) {
          hasConnectedOnceRef.current = true;
          setRemoteJoined(true);
          setJoining(false);
          setIsIncomingPending(false);
          setParticipantsCount((prev) => Math.max(2, prev));
          void stopTone(incomingToneRef.current);
          void stopTone(ringbackToneRef.current);
        }

        if (["ended", "completed", "cancelled"].includes(status)) {
          closeCallScreen();
          return;
        }

        if (hasConnectedOnceRef.current && !hasRemoteActive) {
          closeCallScreen();
        }
      } catch {
        // no-op
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [callId, user?.id]);

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

  const handleAccept = async () => {
    if (!callId || accepting) return;
    try {
      setAccepting(true);
      await callService.joinCall(callId);
      hasAcceptedIncomingRef.current = true;
      hasConnectedOnceRef.current = true;
      if (!hasJoinedCallRoomRef.current) {
        socketService.joinCall(callId);
        hasJoinedCallRoomRef.current = true;
      }
      setIsIncomingPending(false);
      setJoining(false);
      setRemoteJoined(true);
      setParticipantsCount((prev) => Math.max(2, prev));
      await stopTone(incomingToneRef.current);
      await stopTone(ringbackToneRef.current);
      await ensureWebRTC();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to accept call";
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

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 justify-between px-6 py-8">
        <View className="items-center mt-10">
          <Text className="font-proximanova-bold text-white text-2xl">
            Audio Call
          </Text>
          <Text className="font-proximanova-regular text-[#CBD5E1] mt-2">
            {callStatusText}
          </Text>
          <Text className="font-proximanova-regular text-[#94A3B8] mt-1 text-xs">
            Participants: {participantsCount}
          </Text>
          <Text className="font-proximanova-regular text-[#94A3B8] mt-1 text-xs">
            Audio: {webrtcReady ? "connected" : "preparing"}
          </Text>
          <View className="mt-3 bg-[#111827] rounded-lg px-3 py-2 w-full">
            <Text className="text-[#93C5FD] text-[11px] font-proximanova-semibold">
              WebRTC Debug
            </Text>
            <Text className="text-[#CBD5E1] text-[10px] font-proximanova-regular mt-1">
              localAudio: {localAudioReady ? "yes" : "no"} | remoteAudio:{" "}
              {remoteAudioReady ? "yes" : "no"}
            </Text>
            <Text className="text-[#CBD5E1] text-[10px] font-proximanova-regular">
              pc: {pcConnectionState} | ice: {pcIceState}
            </Text>
            <Text className="text-[#CBD5E1] text-[10px] font-proximanova-regular">
              signaling: {pcSignalingState}
            </Text>
            {lastWebrtcError ? (
              <Text className="text-[#FCA5A5] text-[10px] font-proximanova-regular mt-1">
                error: {lastWebrtcError}
              </Text>
            ) : null}
          </View>
          {joining ? (
            <ActivityIndicator className="mt-4" color="#ffffff" />
          ) : null}
        </View>

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
          <View className="flex-row items-center justify-center gap-6 mb-8">
            <TouchableOpacity
              onPress={() => {
                const next = !muted;
                setMuted(next);
                if (callId) {
                  socketService.changeMediaState(callId, next);
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
              onPress={() => setSpeakerOn((prev) => !prev)}
              className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
            >
              <Ionicons
                name={speakerOn ? "volume-high-outline" : "volume-mute-outline"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AudioCallScreen;
