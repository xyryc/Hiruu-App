import { HeaderProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const Header = ({ className }: HeaderProps) => {
  return (
    <View className={className}>
      <Text className="text-2xl font-bold text-[#111111] text-center mb-4">
        Create Your Account
      </Text>
      <Text className="text-sm text-[#7A7A7A] text-center w-4/5 mx-auto">
        Start By Creating Your Account To Explore Jobs, Manage Shifts, And
        Connect With Teams.
      </Text>
    </View>
  );
};

export default Header;
