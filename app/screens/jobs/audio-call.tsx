import { Ionicons } from "@expo/vector-icons";
import { callService } from "@/services/callService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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

  const [joining, setJoining] = useState(mode === "incoming");
  const [ending, setEnding] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [startedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

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
        await callService.joinCall(callId);
      } catch (error: any) {
        toast.error(error?.message || "Failed to join call");
      } finally {
        setJoining(false);
      }
    };

    joinIncoming();
  }, [callId, mode]);

  const durationText = useMemo(() => {
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [elapsed]);

  const handleEnd = async () => {
    if (!callId || ending) {
      router.back();
      return;
    }

    try {
      setEnding(true);
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
            {joining ? "Connecting..." : durationText}
          </Text>
          {joining ? (
            <ActivityIndicator className="mt-4" color="#ffffff" />
          ) : null}
        </View>

        <View className="flex-row items-center justify-center gap-6 mb-8">
          <TouchableOpacity
            onPress={() => setMuted((prev) => !prev)}
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
