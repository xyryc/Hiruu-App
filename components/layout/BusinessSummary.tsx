import { View, Text } from "react-native";
import React, { useState } from "react";
import StatCardPrimary from "../ui/cards/StatCardPrimary";
import BusinessSelectionModal from "../ui/modals/BusinessSelectionModal";
import businesses from "@/assets/data/businesses.json";
import BusinessSelectionTrigger from "../ui/dropdown/BusinessSelectionTrigger";

type BusinessSummaryProps = {
  className?: string;
};

const BusinessSummary = ({ className }: BusinessSummaryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  // Get display content for header button
  const getDisplayContent = () => {
    if (selectedBusinesses.length === 0) {
      return { type: "all", content: "All" };
    } else if (selectedBusinesses.length === 1) {
      const selectedBusiness = businesses.find(
        (b) => b.id === selectedBusinesses[0]
      );
      return { type: "single", content: selectedBusiness };
    }
  };

  const displayContent = getDisplayContent();

  return (
    <View className={`${className} px-4`}>
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xl font-proximanova-semibold">
            Business Summary
          </Text>
        </View>

        <BusinessSelectionTrigger
          displayContent={displayContent as any}
          onPress={() => setShowModal(true)}
          compact
        />
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
