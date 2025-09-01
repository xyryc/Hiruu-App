import { HeaderProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const Header = ({ className, title, subtitle }: HeaderProps) => {
  return (
    <View className={className}>
      <Text className="text-2xl font-bold text-[#111111] text-center mb-4">
        {title}
      </Text>
      <Text className="text-sm text-[#7A7A7A] text-center w-4/5 mx-auto">
        {subtitle}
      </Text>
    </View>
  );
};

export default Header;
