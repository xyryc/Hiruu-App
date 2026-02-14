import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useBusinessStore } from "@/stores/businessStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { toast } from "sonner-native";

const ListofShifts = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { selectedBusinesses, getShiftTemplates } = useBusinessStore();
  const businessId = selectedBusinesses[0];
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);

  const to12Hour = (value?: string) => {
    if (!value) return "--:--";
    const [rawHour = "0", rawMinute = "0"] = value.split(":");
    const hour = Number(rawHour);
    const minute = Number(rawMinute);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return value;

    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
  };

  const loadTemplates = useCallback(async () => {
    if (!businessId) {
      setTemplates([]);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getShiftTemplates(businessId);
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch shifts");
    } finally {
      setIsLoading(false);
    }
  }, [businessId, getShiftTemplates]);

  useFocusEffect(
    useCallback(() => {
      loadTemplates();
    }, [loadTemplates])
  );

  const handleShiftPress = (id: string) => {
    setSelectedShiftId((prev) => (prev === id ? null : id));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <SafeAreaView
        className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
        edges={["left", "right", "bottom"]}
      >
        <ScreenHeader
          className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5"
          style={{ paddingTop: insets.top + 10, paddingBottom: 16 }}
          onPressBack={() => router.back()}
          title="List of Shifts"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />

        <ScrollView
          className="mx-5 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {isLoading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" />
            </View>
          ) : templates.length === 0 ? (
            <View className="py-10 items-center">
              <Text className="text-sm text-secondary dark:text-dark-secondary">
                {businessId
                  ? "No shifts found for selected business."
                  : "Select a business first."}
              </Text>
            </View>
          ) : (
            <View className="mt-4">
              {templates.map((item) => (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => handleShiftPress(item?.id)}
                  className="flex-row items-center p-4 mt-4 rounded-xl border border-[#eeeeee]"
                >
                  <Image
                    source={
                      item?.business?.logo
                        ? { uri: item.business.logo }
                        : require("@/assets/images/placeholder.png")
                    }
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-base font-proximanova-semibold text-primary dark:text-dark-primary">
                      {item?.name || "Shift"}
                    </Text>
                    <Text className="text-sm text-secondary dark:text-dark-secondary font-proximanova-regular">
                      {`${to12Hour(item?.startTime)} to ${to12Hour(item?.endTime)}`}
                    </Text>
                  </View>

                  <Ionicons
                    name={
                      selectedShiftId === item?.id
                        ? "checkmark-circle"
                        : "radio-button-off"
                    }
                    size={24}
                    color={selectedShiftId === item?.id ? "#11293A" : "#C7C7CC"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* button  */}
        <View className='absolute bottom-10 w-full'>
          <PrimaryButton className="mx-5" title="Next" />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ListofShifts;
