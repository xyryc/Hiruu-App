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
}: ActionCardProps) => {
  return (
    <View className="flex-row justify-between p-4 bg-[#4FB2F3] rounded-[14px]">
      <View>
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
      <View className="absolute -right-6 top-0">
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

export default ActionCard;
