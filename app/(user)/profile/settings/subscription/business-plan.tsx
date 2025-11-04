import ScreenHeader from "@/components/header/ScreenHeader";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PricingPlans from "@/components/test/PricingPlan";
import BusinessDropdown from "@/components/ui/modals/BusinessDropdownModal";
import BusinessPlanChart from "@/components/test/PricingPlan";

const BusinessPlan = () => {
  const leaveTypes = [
    {
      label: "Sick Leave",
      value: "sick",
      avatar:
        "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
    },
    {
      label: "Personal Leave",
      value: "personal",
      avatar:
        "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
    },
    {
      label: "Work From Home",
      value: "wfh",
      avatar:
        "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
    },
    {
      label: "Emergency Leave",
      value: "emergency",
      avatar:
        "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
    },
  ];
  const [selectedLeave, setSelectedLeave] = useState<string>("");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Business Plan"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>
      <View className="mx-5">
        <View className="flex-row justify-between mt-4 items-center">
          <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
            Select your business
          </Text>
          <BusinessDropdown
            className="w-16 h-8"
            placeholder="Select"
            options={leaveTypes}
            value={selectedLeave}
            onSelect={(value: any) => setSelectedLeave(value)}
            hideSelectedText={true}
            imageHeight={20}
            imageWidth={20}
          />
        </View>
      </View>

      <BusinessPlanChart />
    </SafeAreaView>
  );
};

export default BusinessPlan;
