import { SecondaryButtonProps } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SecondaryButton = ({
  className,
  title,
  onPress,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} p-0.5 bg-white rounded-full flex-row items-center justify-center w-36`}
    >
      <Text className="font-semibold text-sm pl-6 pr-4">{title}</Text>

      <AntDesign
        name="arrowright"
        size={18}
        color="#fff"
        className="p-2 bg-primary rounded-full"
      />
    </TouchableOpacity>
  );
};

export default SecondaryButton;
