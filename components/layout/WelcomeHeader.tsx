import { WelcomeHeaderProps } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const WelcomeHeader = ({ className }: WelcomeHeaderProps) => {
  return (
    <View className={`${className} px-4 flex-row justify-between`}>
      {/* profile */}
      <View className="flex-row items-center gap-2.5">
        <Image
          source="https://upload.wikimedia.org/wikipedia/commons/7/7b/Julian_Assange_at_2025_Cannes_The_Six_Billion_Dollar_Man_Photocall_3_%28cropped%29.jpg"
          style={{
            width: 44,
            height: 44,
            borderRadius: 100,
          }}
          contentFit="cover"
        />

        <View>
          <Text className="text-sm text-[#7A7A7A] mb-1.5">
            👋 Hello, Julian Assange
          </Text>
          <Text className="font-semibold">Ready for today's task?</Text>
        </View>
      </View>

      {/* coin */}
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/images/hiruu-coin.svg")}
          style={{
            width: 32,
            height: 32,
          }}
          contentFit="scale-down"
        />
        <View className="px-5 py-2 bg-[#DDF1FF] -ml-4 -z-10 rounded-r-[40px]">
          <Text className="text-sm font-semibold">05</Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeHeader;
