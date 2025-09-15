import { PrimaryButtonProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({ className, title, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} p-0.5 bg-[#11293A] rounded-full flex-row items-center justify-center w-5/6 pl-10`}
    >
      <Text className="text-white text-center flex-1">{title}</Text>

      <Feather
        name="arrow-right"
        size={24}
        color="#000000"
        className="p-2 bg-white rounded-full"
      />
    </TouchableOpacity>
  );
};

export default PrimaryButton;
