import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import DatePicker from "@/components/ui/inputs/DatePicker";
import { useBusinessStore } from "@/stores/businessStore";
import axiosInstance from "@/utils/axios";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { toast } from "sonner-native";

const holidayTypes = [
  "Public Holiday",
  "Company Holiday",
  "Religious Holiday",
];

const CreateHoliday = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { selectedBusinesses } = useBusinessStore();
  const businessId = selectedBusinesses?.[0];
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidayType, setHolidayType] = useState(holidayTypes[0]);
  const [showHolidayDropdown, setShowHolidayDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiType = (() => {
    if (holidayType === "Company Holiday") return "company";
    if (holidayType === "Religious Holiday") return "religious";
    return "public";
  })();

  const formatApiDate = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleCreateHoliday = async () => {
    if (!businessId) {
      toast.error("Please select a business first.");
      return;
    }
    if (!title.trim()) {
      toast.error("Holiday title is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        `/holidays/business/${businessId}`,
        {
          title: title.trim(),
          date: formatApiDate(selectedDate),
          type: apiType,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to create holiday");
      }

      toast.success("Holiday created successfully.");
      router.back();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create holiday");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5">
          <ScreenHeader
            style={{ paddingTop: insets.top + 15, paddingBottom: 20 }}
            className=""
            onPressBack={() => router.back()}
            title="Create Holiday"
            titleClass="text-primary dark:text-dark-primary"
            iconColor={isDark ? "#fff" : "#111"}
          />
        </View>

        <ScrollView className="mt-6 mx-5 flex-1">
          <View>
            <Text className="mb-2.5 font-proximanova-semibold text-primary dark:text-dark-primary text-sm">
              Holiday Title
            </Text>
            <TextInput
              className="border border-[#EEEEEE] p-3.5 rounded-[10px] mr-0.5 "
              placeholder="Holiday Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View className="mt-4">
            <Text className="font-proximanova-semibold text-primary dark:text-dark-primary text-sm">
              Select Dates
            </Text>
            <DatePicker
              className="mt-2.5"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </View>

          <View className="py-5">
            {/* Holiday Type Section */}
            <View className="mb-6">
              <Text className="font-proximanova-semibold text-primary dark:text-dark-primary text-sm">
                Holiday Type
              </Text>

              <TouchableOpacity
                className="bg-white rounded-xl py-3 px-4 mt-4 flex-row justify-between items-center border border-gray-200 shadow-sm"
                onPress={() => {
                  setShowHolidayDropdown(!showHolidayDropdown);
                }}
              >
                <Text className="text-base text-gray-400" numberOfLines={1}>
                  {holidayType}
                </Text>
                <Ionicons
                  name={showHolidayDropdown ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>

              {showHolidayDropdown && (
                <View className="bg-white rounded-xl mt-2 border border-[#eeeeee] shadow-md overflow-hidden">
                  {holidayTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`p-4 flex-row justify-between items-center ${index !== holidayTypes.length - 1
                        ? "border-b border-gray-100"
                        : ""
                        }`}
                      onPress={() => {
                        setHolidayType(type);
                        setShowHolidayDropdown(false);
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        className={`text-base ${holidayType === type
                          ? "text-blue-500 font-semibold"
                          : "text-gray-700"
                          }`}
                      >
                        {type}
                      </Text>
                      {holidayType === type && (
                        <Ionicons name="checkmark" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          className="mx-5 my-10"
          title={isSubmitting ? "Creating..." : "Create Holiday"}
          onPress={handleCreateHoliday}
          disabled={isSubmitting}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateHoliday;
