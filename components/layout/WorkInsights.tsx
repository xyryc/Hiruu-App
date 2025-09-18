import { WorkInsightsProps } from "@/types";
import React, { useState } from "react";
import { Text, View } from "react-native";
import MonthPicker from "../ui/inputs/MonthPicker";

const WorkInsights = ({ className }: WorkInsightsProps) => {
  const [reportMonth, setReportMonth] = useState<Date | null>(new Date());

  const handleReportMonthChange = (date: Date) => {
    setReportMonth(date);
    console.log("Report month selected:", date.toLocaleDateString());
  };

  return (
    <View className={`${className} px-4`}>
      <View className="flex-row justify-between items-center border">
        <Text className="text-xl font-proximanova-semibold">Work Insights</Text>

        <MonthPicker
          value={reportMonth}
          onDateChange={handleReportMonthChange}
        />
      </View>
    </View>
  );
};

export default WorkInsights;
