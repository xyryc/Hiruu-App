import businesses from "@/assets/data/businesses.json";
import { WorkInsightsProps } from "@/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import StatCardPrimary from "../ui/cards/StatCardPrimary";
import StatCardSecondary from "../ui/cards/StatCardSecondary";
import MonthPicker from "../ui/inputs/MonthPicker";
import BusinessSelectionModal from "../ui/modals/BusinessSelectionModal";

const WorkInsights = ({ className }: WorkInsightsProps) => {
  const [reportMonth, setReportMonth] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  const handleReportMonthChange = (date: Date) => {
    setReportMonth(date);
    console.log("Report month selected:", date.toLocaleDateString());
  };

  return (
    <View className={`${className} px-4`}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-proximanova-semibold">Work Insights</Text>

        {/* picker */}
        <View className="flex-row items-center gap-2">
          <MonthPicker
            value={reportMonth}
            onDateChange={handleReportMonthChange}
          />

          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-[#E5F4FD] flex-row items-center p-0.5 rounded-[26px]"
          >
            <Image
              source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
              style={{ width: 30, height: 30, borderRadius: 999 }}
              contentFit="cover"
            />
            <SimpleLineIcons
              className="p-1.5"
              name="arrow-down"
              size={12}
              color="#111111"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* modal */}
      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={businesses}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />

      {/* stats*/}
      <View className="flex-row gap-3 mb-4">
        <StatCardPrimary background={require("@/assets/images/stats-bg.svg")} />
        <StatCardPrimary background={require("@/assets/images/stats-bg.svg")} />
      </View>

      <StatCardSecondary
        background={require("@/assets/images/stats-bg2.svg")}
      />
    </View>
  );
};

export default WorkInsights;
