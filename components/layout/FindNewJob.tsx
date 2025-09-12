import { FindNewJobProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import ActionCard from "../ui/cards/ActionCard";

const FindNewJob = ({ className }: FindNewJobProps) => {
  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-semibold mb-4">Find New Job</Text>

      {/* job listing card */}
      <ActionCard />
    </View>
  );
};

export default FindNewJob;
