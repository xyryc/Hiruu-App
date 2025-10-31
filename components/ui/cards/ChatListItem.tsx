import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const ChatListItem = () => {
  return (
    <View className="flex-row items-center gap-2.5 py-4 border-b border-[#EEEEEE]">
      {/* left */}
      <Image
        source="https://images-platform.99static.com//XA86QPjmKC7CdDnzMsNPiEH5O-Y=/63x55:1588x1580/fit-in/500x500/projects-files/66/6611/661127/3fcadb3b-493d-4b86-8b30-3d38007c3a79.png"
        style={{
          width: 50,
          height: 50,
          borderRadius: 999,
        }}
        contentFit="cover"
      />

      {/* right */}
      <View className="flex-1">
        {/* top */}
        <View className="flex-row justify-between items-center">
          <Text className="font-proximanova-semibold text-primary">
            Farout Beach Club
          </Text>
          <Text className="font-proximanova-regular text-primary">12.00PM</Text>
        </View>

        {/* bottom */}
        <View className="flex-1 flex-row justify-between items-center">
          <View className="flex-row gap-1.5 items-center">
            <Text className="font-proximanova-semibold text-sm text-[#4FB2F3]">
              You:
            </Text>
            <Text className="text-sm font-proximanova-regular text-primary">
              Hi, I just applied for the bartender position
            </Text>
          </View>

          <View className="w-6 h-6 bg-[#4FB2F3] rounded-full items-center justify-center">
            <Text className="font-proximanova-semibold text-sm text-white">
              1
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatListItem;
