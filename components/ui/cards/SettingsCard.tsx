import React from "react";
import { View, Text } from "react-native";

type SettingsCardProps = {
  text: string;
  icon: any;
  aroIcon: any;
  className?: string;
};

const SettingsCard = ({
  text,
  icon,
  aroIcon,
  className,
}: SettingsCardProps) => {
  return (
    <View className={`${className}`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-4">
          <View className="bg-[#EEEEEE] h-[50px] w-[50px] justify-center items-center rounded-2xl border border-[#11293A1A]">
            {icon}
            {/* <Ionicons name="language-outline" size={24} color="#11293A" /> */}
          </View>
          <Text className="text-primary dark:text-dark-primary font-proximanova-bold">
            {/* App Preferences */}
            {text}
          </Text>
        </View>
        {aroIcon}
        {/* <Entypo name="chevron-thin-right" size={20} color="#111111" /> */}
      </View>
      <View className="border-b-2 border-[#EEEEEE] mt-5" />
    </View>
  );
};

export default SettingsCard;
