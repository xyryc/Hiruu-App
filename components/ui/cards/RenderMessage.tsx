import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const getStatusMeta = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "read":
      return { name: "checkmark-done" as const, color: "#4FB2F3" };
    case "delivered":
      return { name: "checkmark-done" as const, color: "#111827" };
    case "sent":
      return { name: "checkmark" as const, color: "#111827" };
    case "failed":
      return { name: "alert-circle" as const, color: "#EF4444" };
    case "deleted":
      return { name: "trash" as const, color: "#9CA3AF" };
    default:
      return null;
  }
};

interface MessageProps {
  msg: {
    id: string;
    text: string;
    time: string;
    isSent: boolean;
    status: string;
    avatar: any;
  };
}

const RenderMessage: React.FC<MessageProps> = ({ msg }) => {
  const statusMeta = getStatusMeta(msg.status);

  // Handle avatar source - can be URL string or require() object
  const avatarSource = typeof msg.avatar === 'string'
    ? { uri: msg.avatar }
    : msg.avatar;

  return (
    <View
      className={`flex-row gap-1.5 mb-4 ${msg.isSent ? "justify-end" : "justify-start"
        }`}
    >
      {!msg.isSent && (
        <Image
          source={avatarSource}
          style={{ width: 40, height: 40, borderRadius: 999 }}
          contentFit="cover"
        />
      )}

      <View
        className={`max-w-[70%] ${msg.isSent ? "items-end" : "items-start"}`}
      >
        <View className="flex-row items-end gap-1.5">
          <View
            className={`p-2.5 rounded-2xl ${msg.isSent
                ? "bg-[#4FB2F3] rounded-br-sm"
                : "bg-white rounded-bl-sm"
              }`}
          >
            <Text
              className={`font-proximanova-regular text-sm ${msg.isSent ? "text-white" : "text-primary"
                }`}
            >
              {msg.text}
            </Text>
          </View>

          {msg.isSent && (
            <Image
              source={avatarSource}
              style={{ width: 40, height: 40, borderRadius: 999 }}
              contentFit="cover"
            />
          )}
        </View>

        <View className="flex-row items-center mt-1 gap-1">
          {msg.isSent && statusMeta && (
            <Ionicons
              name={statusMeta.name}
              size={14}
              color={statusMeta.color}
            />
          )}

          <Text className="font-proximanova-regular text-xs text-secondary">
            {msg.time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderMessage;
