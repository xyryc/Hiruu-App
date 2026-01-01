import { PrimaryButtonProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({
  className,
  title,
  onPress,
  iconSize = 24,
  loading,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`${className} p-0.5 bg-[#11293A] rounded-full flex-row items-center justify-center pl-10`}
    >
      <Text className="font-proximanova-semibold text-white text-center flex-1">
        {title}
      </Text>

      {loading ? (
        <ActivityIndicator
          size="small"
          color="#ffffff"
          className="p-2 bg-white rounded-full"
        />
      ) : (
        <Feather
          name="arrow-right"
          size={iconSize}
          color="#000000"
          className="p-2 bg-white rounded-full"
        />
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
