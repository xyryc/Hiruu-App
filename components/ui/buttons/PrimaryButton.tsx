import { PrimaryButtonProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({
  className,
  title,
  onPress,
  iconSize = 24,
  showIcon = true,
  loading,
  disabled,
}: PrimaryButtonProps) => {
  const isDisabled = Boolean(loading || disabled);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${className} p-0.5 rounded-full flex-row items-center justify-center ${showIcon ? "pl-10" : "px-6"} ${isDisabled ? "bg-gray-300" : "bg-[#11293A]"}`}
    >
      <Text
        className={`font-proximanova-semibold text-center flex-1 ${isDisabled ? "text-gray-600" : "text-white"}`}
      >
        {title}
      </Text>

      {loading && showIcon ? (
        <ActivityIndicator
          size="small"
          color="#ffffff"
          className="p-2 bg-black rounded-full"
        />
      ) : showIcon ? (
        <Feather
          name="arrow-right"
          size={iconSize}
          color={isDisabled ? "#6B7280" : "#000000"}
          className={`p-2 rounded-full ${isDisabled ? "bg-gray-200" : "bg-white"}`}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
