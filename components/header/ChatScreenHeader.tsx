import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const ChatScreenHeader = () => {
  return (
    <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        <TouchableOpacity className="mr-3">
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-proximanova-semibold text-primary">
          Rohan Mehta
        </Text>
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
