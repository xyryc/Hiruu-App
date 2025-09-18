import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const StatCardPrimary = ({ background }) => {
  return (
    <View className="flex-1 p-4 border border-[#EEEEEE] rounded-xl overflow-hidden">
      <Text className="text-sm font-proximanova-regular text-secondary">
        Completed
      </Text>
      <View className="flex-row gap-1">
        <Text className="font-proximanova-bold text-2xl text-[#4FB2F3]">8</Text>
        <Text className="font-proximanova-bold text-sm text-primary mt-2">
          Tasks
        </Text>
      </View>

      {/* background */}
      <View className="absolute top-0 right-0">
        <Image
          source={background}
          style={{
            width: 100,
            height: 100,
          }}
          contentFit="scale-down"
        />
      </View>
    </View>
  );
};

export default StatCardPrimary;
