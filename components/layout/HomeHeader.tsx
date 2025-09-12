import { HomeHeaderProps } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const HomeHeader = ({ className }: HomeHeaderProps) => {
  return (
    <View className={`${className} px-4 flex-row justify-between`}>
      <Image
        source={require("@/assets/images/hiruu-logo.svg")}
        style={{
          width: 97,
          height: 34,
        }}
      />

      <View className="flex-row items-center gap-1.5">
        {/* messages */}
        <View className="bg-[#EEEEEE] border-[0.5px] border-[#B2B1B1] rounded-full p-2">
          <Image
            source={require("@/assets/images/messages.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="scale-down"
          />
        </View>

        {/* notification */}
        <View className="bg-[#EEEEEE] border-[0.5px] border-[#B2B1B1] rounded-full p-2">
          <Image
            source={require("@/assets/images/bell.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="scale-down"
          />
          <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
            <Text className="text-[10px] text-white">1</Text>
          </View>
        </View>

        {/* scanner */}
        <View className="bg-[#F5F5F5] border-[0.5px] border-[#B2B1B1] rounded-full p-2">
          <Image
            source={require("@/assets/images/scan.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="scale-down"
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
