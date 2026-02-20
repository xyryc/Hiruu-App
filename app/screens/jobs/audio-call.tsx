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
  const [startedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const hasLeftRef = useRef(false);

  useEffect(() => {
    console.log("[CALL_DEBUG] audio-call:mounted", { callId, mode, roomId: params.roomId });
  }, [callId, mode, params.roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  useEffect(() => {
    const joinIncoming = async () => {
      if (mode !== "incoming" || !callId) return;
      try {
        const details = await callService.getCallById(callId);
        const participants = Array.isArray(details?.data?.participants)
          ? details.data.participants
          : [];
        const me = participants.find((p: any) => p?.userId === user?.id);
        const status = String(me?.status || "").toLowerCase();
        const role = String(me?.role || "").toLowerCase();

        if (role === "receiver" && (status === "invited" || status === "ringing")) {
          await callService.joinCall(callId);
        }
      } catch (error: any) {
        const message =
          error?.response?.data?.message || error?.message || "Failed to join call";
        if (!String(message).toLowerCase().includes("cannot join this call")) {
          toast.error(message);
        }
      } finally {
        setJoining(false);
      }
    };

    joinIncoming();
  }, [callId, mode, user?.id]);

  const leaveOnce = () => {
    if (!callId || hasLeftRef.current) return;
    hasLeftRef.current = true;
    socketService.changeCallStatus(callId, "left", "User left");
    socketService.leaveCall(callId);
  };

  useEffect(() => {
    if (!callId) return;

    let mounted = true;
    let onParticipants: ((payload: any) => void) | null = null;
    let onJoined: ((payload: any) => void) | null = null;
    let onEnded: ((payload: any) => void) | null = null;

    const bindCallSocket = async () => {
      try {
        await socketService.connectCalls();
        socketService.joinCall(callId);

        onParticipants = (payload: any) => {
          const sameCall = payload?.callId === callId;
          if (!sameCall) return;

          const participants = Array.isArray(payload?.participants)
            ? payload.participants
            : [];
          const active = participants.filter((item: any) =>
            item?.status === "joined" || item?.status === "ringing"
          );

          if (!mounted) return;
          setParticipantsCount(active.length || participants.length || 1);
          const hasOtherJoined = participants.some(
            (item: any) =>
              item?.userId &&
              item.userId !== user?.id &&
              item?.status === "joined"
          );
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
          toast.message("Call ended");
          router.back();
        };

        socketService.onCallParticipants(onParticipants);
        socketService.onParticipantJoined(onJoined);
        socketService.onCallEnded(onEnded);
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
    };
  }, [callId, router, user?.id]);

  const durationText = useMemo(() => {
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [elapsed]);

  const callStatusText = useMemo(() => {
    if (joining) return "Connecting...";
    if (!remoteJoined) return "Ringing...";
    return durationText;
  }, [durationText, joining, remoteJoined]);

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
      </View>
    </SafeAreaView>
  );
};

export default AudioCallScreen;
