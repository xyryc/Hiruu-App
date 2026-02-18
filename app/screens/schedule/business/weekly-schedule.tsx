import ScreenHeader from "@/components/header/ScreenHeader";
import GradientButton from "@/components/ui/buttons/GradientButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import ShiftTemplateCard from "@/components/ui/cards/ShiftTemplateCard";
import { useBusinessStore } from "@/stores/businessStore";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const SavedShiftTemplate = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { weeklyShiftSelections } = useBusinessStore();

  const daysData = [
    { label: "Monday" },
    { label: "Tuesday" },
    { label: "Wednesday" },
    { label: "Thursday" },
    { label: "Friday" },
    { label: "Saturday" },
    { label: "Sunday" },
  ];

  const allDaysSelected = useMemo(
    () =>
      daysData.every(
        (day) =>
          Array.isArray(weeklyShiftSelections[day.label]) &&
          weeklyShiftSelections[day.label].length > 0
      ),
    [daysData, weeklyShiftSelections]
  );

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
          className="capitalize bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5"
          style={{ paddingTop: insets.top + 10, paddingBottom: 20 }}
          onPressBack={() => router.back()}
          title="Weekly Schedule"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />

        <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
          <View>
            {daysData.map((day) => {
              const selectedTemplates = Array.isArray(weeklyShiftSelections[day.label])
                ? weeklyShiftSelections[day.label]
                : [];

              return (
                <View key={day.label}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/screens/schedule/business/list-shifts",
                        params: { day: day.label },
                      })
                    }
                    className="border mt-3 border-[#eeeeee] rounded-[10px] py-4 px-4 gap-4 flex-row items-center"
                  >
                    <SimpleLineIcons name="plus" size={24} color="#4FB2F3" />
                    <View className="flex-1">
                      <Text className="font-proximanova-semibold text-primary dark:text-dark-primary">
                        {day.label}
                      </Text>
                      <Text className="mt-1 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                        {selectedTemplates.length > 0
                          ? `${selectedTemplates.length} template(s) selected`
                          : "No shift selected"}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {selectedTemplates.map((template: any) => (
                    <ShiftTemplateCard
                      weekly={true}
                      key={`${day.label}-${template?.id}`}
                      className="mt-3"
                      title={template?.name || `${day.label} Shift`}
                      timeRange={`${to12Hour(template?.startTime)} - ${to12Hour(template?.endTime)}`}
                      breakTimeRange={
                        Array.isArray(template?.breakDuration) &&
                          template.breakDuration.length > 0
                          ? template.breakDuration
                            .map(
                              (item: any) =>
                                `${to12Hour(item?.startTime)} - ${to12Hour(item?.endTime)}`
                            )
                            .join(", ")
                          : "No break"
                      }
                      location={template?.business?.name || "Location not defined"}
                      roles={template?.roleRequirements || []}
                      businessName={template?.business?.name}
                      businessLogo={template?.business?.logo}
                      templateId={template?.id}
                      businessId={template?.businessId}
                    />
                  ))}
                </View>
              );
            })}
          </View>

          <GradientButton
            className="mt-10"
            title="Fill With AI"
            icon={<FontAwesome6 name="crown" size={20} color="white" />}
          />
          <PrimaryButton title="Next" className="my-4" disabled={!allDaysSelected} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SavedShiftTemplate;
