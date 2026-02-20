import { Ionicons } from "@expo/vector-icons";
import { callService } from "@/services/callService";
import { socketService } from "@/services/socketService";
import { useAuthStore } from "@/stores/authStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

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
  const hasLeftRef = useRef(false);
  const hasJoinedCallRoomRef = useRef(false);

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
    } else {
      setJoining(true);
      setIsIncomingPending(true);
    }
  }, [mode]);

  const leaveOnce = () => {
    if (!callId || hasLeftRef.current) return;
    hasLeftRef.current = true;
    socketService.changeCallStatus(callId, "left", "User left");
    if (hasJoinedCallRoomRef.current) {
      socketService.leaveCall(callId);
      hasJoinedCallRoomRef.current = false;
    }
  };

  useEffect(() => {
    if (!callId) return;

    let mounted = true;
    let onParticipants: ((payload: any) => void) | null = null;
    let onJoined: ((payload: any) => void) | null = null;
    let onEnded: ((payload: any) => void) | null = null;
    let onParticipantStatusChanged: ((payload: any) => void) | null = null;

    const bindCallSocket = async () => {
      try {
        await socketService.connectCalls();
        const details = await callService.getCallById(callId);
        const participants = Array.isArray(details?.data?.participants)
          ? details.data.participants
          : [];
        const me = participants.find((item: any) => item?.userId === user?.id);
        const myStatus = String(me?.status || "").toLowerCase();
        const canJoinSocketRoom = !["left", "declined", "missed"].includes(myStatus);
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
          const active = participants.filter((item: any) =>
            item?.status === "joined" || item?.status === "ringing"
          );
          const hasSelfInPayload = participants.some(
            (item: any) => item?.userId === user?.id
          );

          if (!mounted) return;
          const hasOtherJoined = participants.some(
            (item: any) =>
              item?.userId &&
              item.userId !== user?.id &&
              item?.status === "joined"
          );
          let nextCount = active.length || participants.length || 1;
          // Some backend payloads omit the current user from participant snapshots.
          if (hasOtherJoined && !hasSelfInPayload) {
            nextCount += 1;
          }
          if (hasOtherJoined) {
            nextCount = Math.max(2, nextCount);
          }
          setParticipantsCount(nextCount);
          setRemoteJoined(hasOtherJoined);
          if (hasOtherJoined) setJoining(false);
        };

        onJoined = (payload: any) => {
          const participantId = payload?.userId;
          if (!mounted || !participantId || participantId === user?.id) return;
          setRemoteJoined(true);
          setJoining(false);
          setParticipantsCount((prev) => Math.max(2, prev + 1));
        };

        onEnded = (payload: any) => {
          const endedCallId = payload?.callId;
          if (!mounted || endedCallId !== callId) return;
          toast.success("Call ended");
          router.back();
        };

        onParticipantStatusChanged = (payload: any) => {
          const participantId = payload?.userId;
          const status = String(payload?.status || "").toLowerCase();
          if (!mounted || !participantId || participantId === user?.id) return;
          if (status === "declined" || status === "missed" || status === "left") {
            toast.success("Call ended");
            router.back();
          }
        };

        socketService.onCallParticipants(onParticipants);
        socketService.onParticipantJoined(onJoined);
        socketService.onCallEnded(onEnded);
        socketService.onParticipantStatusChanged(onParticipantStatusChanged);
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
    };
  }, [callId, router, user?.id]);

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
      setIsIncomingPending(false);
      setJoining(false);
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
