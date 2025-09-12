import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import SecondaryButton from "../buttons/SecondaryButton";

const ActionCard = () => {
  return (
    <View className="flex-row justify-between p-4 bg-[#4FB2F3] rounded-[14px]">
      <View>
        <Text className="text-lg font-bold mb-4 text-white">
          Explore All Job Listings
        </Text>

        <SecondaryButton title="Find Now" />
      </View>

      <Image
        source={require("@/assets/images/toolbox.svg")}
        style={{
          width: 110,
          height: 80,
        }}
        contentFit="scale-down"
      />

      {/* background */}
      <View className="absolute -right-10 top-0">
        <Image
          source={require("@/assets/images/chessboard-bg.svg")}
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

export default ActionCard;
