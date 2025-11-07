import { View, Text } from "react-native";
import React from "react";
import StatCardPrimary from "../ui/cards/StatCardPrimary";

type BusinessSummaryProps = {
  className?: string;
};

const BusinessSummary = ({ className }: BusinessSummaryProps) => {
  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-proximanova-semibold">
        Business Summary
      </Text>
      {/* stats*/}
      <View className="flex-row gap-3 mb-4 mt-4">
        <StatCardPrimary
          title="Total"
          point={25}
          subtitle="Employees"
          background={require("@/assets/images/stats-bg.svg")}
        />
        <StatCardPrimary
          title="Total"
          point="03"
          subtitle="Managers"
          background={require("@/assets/images/stats-bg.svg")}
        />
      </View>
      <View className="flex-row gap-3 mb-4">
        <StatCardPrimary
          title="Total Shifts"
          point={35}
          subtitle="Today"
          background={require("@/assets/images/stats-bg.svg")}
        />
        <StatCardPrimary
          title="Completion"
          point="75%"
          subtitle="Managers"
          background={require("@/assets/images/stats-bg.svg")}
        />
      </View>
    </View>
  );
};

export default BusinessSummary;
