import PrimaryButton from "@/components/ui/PrimaryButton";
import React from "react";
import { Text, View } from "react-native";

const Welcome = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <View className="w-2/3">
        <Text className="text-2xl capitalize mb-4 text-center text-[#111111]">
          Welcome to Hiruu
        </Text>

        <Text className="text-sm text-center capitalize text-[#7A7A7A]">
          Manage your team, track shifts, and grow your business — all in one
          place. Let’s get started!
        </Text>
      </View>

      {/* button */}
      <PrimaryButton className="mt-7" title="Get Started" />
    </View>
  );
};

export default Welcome;
