import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Dropdown from "@/components/ui/dropdown/DropDown";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OvertimeRequest = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [overtimeStart, setOvertimeStart] = useState("10:00Am");
  const [overtimeEnd, setOvertimeEnd] = useState("04:00pm");

  const [reason, setReason] = useState("");
  const companies = [
    { label: "Company A", value: "company-a" },
    { label: "Company B", value: "company-b" },
    { label: "Company C", value: "company-c" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#E5F4FD] dark:bg-dark-background">
      {/* Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-5 pb-6 rounded-b-3xl overflow-hidden"
        title="Overtime Request"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111111"}
      />

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 bg-white dark:bg-dark-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 py-6">
          {/* Overtime Details Section */}
          <Text className="text-xl font-proximanova-semibold text-primary dark:text-dark-primary mb-7">
            Overtime Details
          </Text>

          {/* Select Company */}
          <View className="mb-5">
            <Dropdown
              label="Select Company"
              placeholder="Select Company"
              options={companies}
              value={selectedCompany}
              onSelect={setSelectedCompany}
            />
          </View>

          {/* Select Dates */}
          <View className="mb-5">
            <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
              Select Dates
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-3.5 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border">
              <Text className="text-sm font-proximanova-regular text-placeholder dark:text-dark-placeholder">
                Start Date
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#4FB2F3" />
            </TouchableOpacity>
          </View>

          {/* Overtime Start and End Time */}
          <View className="flex-row mb-5 gap-3">
            {/* Overtime Start */}
            <View className="flex-1">
              <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
                Overtime Start
              </Text>
              <TouchableOpacity className="flex-row items-center justify-between px-4 py-3.5 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border">
                <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
                  {overtimeStart}
                </Text>

                <Octicons name="clock-fill" size={20} color="#4FB2F3" />
              </TouchableOpacity>
            </View>

            {/* To Separator */}
            <View className="items-center justify-end pb-3.5">
              <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
                To
              </Text>
            </View>

            {/* Overtime End */}
            <View className="flex-1">
              <Text className="text-sm font-proximanova-medium text-primary dark:text-dark-primary mb-2.5">
                Overtime End
              </Text>
              <TouchableOpacity className="flex-row items-center justify-between px-4 py-3.5 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border">
                <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
                  {overtimeEnd}
                </Text>

                <Octicons name="clock-fill" size={20} color="#4FB2F3" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reason (Optional) */}
          <View className="mb-5">
            <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
              Reason (Optional)
            </Text>
            <View className="bg-white dark:bg-dark-surface rounded-xl border border-[#EEEEEE] dark:border-dark-border overflow-hidden">
              <TextInput
                className="px-4 py-3.5 text-sm font-proximanova-regular text-primary dark:text-dark-primary min-h-[120px]"
                placeholder="Mention any reason or notes for manager...."
                placeholderTextColor="#7D7D7D"
                multiline
                textAlignVertical="top"
                value={reason}
                onChangeText={setReason}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 py-5 items-center justify-end bg-white dark:bg-dark-background rounded-t-[20px]">
        <PrimaryButton
          title="Send Request"
          onPress={() => setShowModal(true)}
        />
      </View>
    </SafeAreaView>
  );
};

export default OvertimeRequest;
