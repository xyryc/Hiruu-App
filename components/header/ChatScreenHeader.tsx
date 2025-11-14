import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatScreenHeader = () => {
  return (
    <View className="bg-white px-4 pt-2.5 pb-5 flex-row items-center justify-between border-b border-[#EEEEEE]">
      <View className="flex-row items-center flex-1">
        <TouchableOpacity className="mr-3">
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-proximanova-semibold text-primary">
          Mohammad Anik
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Ionicons
            className="p-2 bg-[#F5F5F5] rounded-full"
            name="call-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            className="p-2 bg-[#F5F5F5] rounded-full"
            name="videocam-outline"
            size={26}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
