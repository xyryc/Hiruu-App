import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
  title: string;
  statusText: string;
  participantsCount: number;
  joining: boolean;
};

const CallHeaderInfo = ({ title, statusText, participantsCount, joining }: Props) => {
  return (
    <View className="px-6 pt-8 items-center">
      <Text className="font-proximanova-bold text-white text-2xl">{title}</Text>
      <Text className="font-proximanova-regular text-[#CBD5E1] mt-2">{statusText}</Text>
      <Text className="font-proximanova-regular text-[#94A3B8] mt-1 text-xs">
        Participants: {participantsCount}
      </Text>
      {joining ? <ActivityIndicator className="mt-4" color="#ffffff" /> : null}
    </View>
  );
};

export default CallHeaderInfo;
