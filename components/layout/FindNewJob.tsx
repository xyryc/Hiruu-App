import { FindNewJobProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import ActionCard from "../ui/cards/ActionCard";

const FindNewJob = ({ className }: FindNewJobProps) => {
  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-proximanova-semibold mb-4">
        Find New Job
      </Text>

      {/* job listing card */}
      <ActionCard
        title="Explore All Job Listings"
        buttonTitle="Find Now"
        rightImage={require("@/assets/images/toolbox.svg")}
        imageWidth={110}
        imageHeight={80}
        background={require("@/assets/images/chessboard-bg.svg")}
      />
    </View>
  );
};

export default FindNewJob;
