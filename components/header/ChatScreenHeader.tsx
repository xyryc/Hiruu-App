import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ChatScreenHeaderProps {
  onAudioCallPress?: () => void;
  onVideoCallPress?: () => void;
  isStartingAudioCall?: boolean;
  isStartingVideoCall?: boolean;
}

const ChatScreenHeader = ({
  onAudioCallPress,
  onVideoCallPress,
  isStartingAudioCall = false,
  isStartingVideoCall = false,
}: ChatScreenHeaderProps) => {
  const router = useRouter();

  return (
    <View className="bg-white px-4 pt-2.5 pb-5 flex-row items-center justify-between border-b border-[#EEEEEE]">
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-lg font-proximanova-semibold text-primary">
          Md Talath Un Nabi Anik
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F5] border-[0.5px] border-[#B2B1B165]"
          onPress={onAudioCallPress}
          disabled={isStartingAudioCall}
        >
          {isStartingAudioCall ? (
            <ActivityIndicator size="small" color="#111111" />
          ) : (
            <Ionicons name="call-outline" size={20} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-[#F5F5F5] border-[0.5px] border-[#b2b1b165]"
          onPress={onVideoCallPress}
          disabled={isStartingVideoCall}
        >
          {isStartingVideoCall ? (
            <ActivityIndicator size="small" color="#111111" />
          ) : (
            <Ionicons name="videocam-outline" size={20} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
