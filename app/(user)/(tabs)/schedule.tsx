import businesses from "@/assets/data/businesses.json";
import shifts from "@/assets/data/shifts.json";
import ShiftHeader from "@/components/header/ShiftHeader";
import ShiftItem from "@/components/layout/ShiftItem";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShiftSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ShiftHeader setShowModal={setShowModal} />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {shifts.map((shift, index) => (
          <ShiftItem
            key={shift.id}
            shift={shift}
            index={index}
            shiftsLength={shifts.length}
          />
        ))}
      </ScrollView>

      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={businesses}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />
    </SafeAreaView>
  );
};

export default ShiftSchedule;
