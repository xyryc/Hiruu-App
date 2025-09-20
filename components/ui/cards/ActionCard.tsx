import { ActionCardProps } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import SecondaryButton from "../buttons/SecondaryButton";

const ActionCard = ({
  title,
  buttonTitle,
  rightImage,
  imageClass,
  imageWidth,
  imageHeight,
  background,
  backgroundClass,
  backgroundWidth = 100,
  backgroundHeight = 100,
}: ActionCardProps) => {
  return (
    <View className="flex-row justify-between items-center p-4 bg-[#4FB2F3] rounded-[14px]">
      <View className="w-6/12">
        <Text className="text-lg font-proximanova-bold mb-4 text-white">
          {title}
        </Text>

        <SecondaryButton title={buttonTitle} />
      </View>

      <View className={imageClass}>
        <Image
          source={rightImage}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          contentFit="scale-down"
        />
      </View>

      {/* background */}
      <View className={`${backgroundClass} absolute -right-6 top-0`}>
        <Image
          source={background}
          style={{
            width: backgroundWidth,
            height: backgroundHeight,
          }}
          contentFit="scale-down"
        />
      </View>
    </View>
  );
};

export default ActionCard;
