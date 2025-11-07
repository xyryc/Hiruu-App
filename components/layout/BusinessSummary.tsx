import { View, Text } from "react-native";
import React, { useState } from "react";
import StatCardPrimary from "../ui/cards/StatCardPrimary";
import BusinessSelectionModal from "../ui/modals/BusinessSelectionModal";
import businesses from "@/assets/data/businesses.json";

type BusinessSummaryProps = {
  className?: string;
};

const BusinessSummary = ({ className }: BusinessSummaryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  return (
    <View className={`${className} px-4`}>
      <View className="">
        <Text className="text-xl font-proximanova-semibold">
          Business Summary
        </Text>

        <BusinessSelectionModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          businesses={businesses}
          selectedBusinesses={selectedBusinesses}
          onSelectionChange={setSelectedBusinesses}
        />
      </View>
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
