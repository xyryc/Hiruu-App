import { user } from "@/assets/data/user.json";
import { HomeHeaderProps } from "@/types";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
        <View className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
          <Image
            source={require("@/assets/images/messages.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="contain"
          />
        </View>

        {/* notification */}
        <TouchableOpacity
          onPress={() => router.push("/shared/notification")}
          className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2"
        >
          <Image
            source={require("@/assets/images/bell.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="contain"
          />
          <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
            <Text className="text-[10px] text-white">1</Text>
          </View>
        </TouchableOpacity>

        {/* scanner */}
        <TouchableOpacity
          onPress={
            user.role !== "user"
              ? () => router.push("/screens/home/business/qr-generate")
              : () => router.push("/screens/home/qr-scanner")
          }
          className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2"
        >
          <Image
            source={require("@/assets/images/scan.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
