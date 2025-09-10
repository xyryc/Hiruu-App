import { PrimaryButtonProps } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SecondaryButton = ({ className, title, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} bg-[#11293A] rounded-full px-4 py-2.5`}
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
