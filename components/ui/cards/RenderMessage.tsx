import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const RenderMessage = ({ msg }) => {
  return (
    <View
      className={`flex-row gap-1.5 mb-4 ${
        msg.isSent ? "justify-end" : "justify-start"
      }`}
    >
      {!msg.isSent && (
        <Image
          source={{ uri: msg.avatar }}
          style={{ width: 40, height: 40, borderRadius: 999 }}
        />
      )}

      <View
        className={`max-w-[70%] ${msg.isSent ? "items-end" : "items-start"}`}
      >
        <View
          className={`px-4 py-3 rounded-2xl ${
            msg.isSent ? "bg-[#4FB2F3] rounded-br-sm" : "bg-white rounded-bl-sm"
          }`}
        >
          <Text
            className={`font-proximanova-regular text-sm ${
              msg.isSent ? "text-white" : "text-primary"
            }`}
          >
            {msg.text}
          </Text>
        </View>

        <View className="flex-row items-center mt-1 gap-1">
          {msg.isSent && msg.isRead && (
            <Ionicons name="checkmark-done" size={14} color="#4FB2F3" />
          )}
          <Text className="font-proximanova-regular text-xs text-gray-500">
            {msg.time}
          </Text>
        </View>
      </View>

      {msg.isSent && (
        <Image
          source={{ uri: msg.avatar }}
          style={{ width: 40, height: 40, borderRadius: 999 }}
        />
      )}
    </View>
  );
};

export default RenderMessage;
