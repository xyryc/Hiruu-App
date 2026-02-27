import ScreenHeader from "@/components/header/ScreenHeader";
import BusinessSelectionTrigger from "@/components/ui/dropdown/BusinessSelectionTrigger";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import WeeklyBlockActionsModal from "@/components/ui/modals/WeeklyBlockActionsModal";
import { useBusinessStore } from "@/stores/businessStore";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

type MarkedDates = Record<
  string,
  {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  }
>;

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

const addDays = (date: Date, days: number) => {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
};

const ManageWeeklySchedules = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const {
    myBusinesses,
    selectedBusinesses,
    setSelectedBusinesses,
    getMyBusinesses,
    getWeeklyScheduleBlocks,
  } = useBusinessStore();

  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showBlockActions, setShowBlockActions] = useState(false);
  const [existingBlocks, setExistingBlocks] = useState<
    Array<{ id: string; startDate: string; endDate: string; name?: string }>
  >([]);
  const [selectedBlock, setSelectedBlock] = useState<{
    id: string;
    startDate: string;
    endDate: string;
    name?: string;
  } | null>(null);

  const businessId = selectedBusinesses[0];

  const isoToYmd = (value?: string) => {
    if (!value) return "";
    return value.slice(0, 10);
  };

  useEffect(() => {
    getMyBusinesses().catch(() => {});
  }, [getMyBusinesses]);

  useEffect(() => {
    const loadBlocks = async () => {
      if (!businessId) {
        setExistingBlocks([]);
        return;
      }
      try {
        const blocks = await getWeeklyScheduleBlocks(businessId);
        setExistingBlocks(
          blocks.map((item: any) => ({
            id: item.id,
            startDate: item.startDate,
            endDate: item.endDate,
            name: item.name,
          }))
        );
      } catch (error: any) {
        setExistingBlocks([]);
        toast.error(error?.message || "Failed to load weekly schedules.");
      }
    };

    loadBlocks();
  }, [businessId, getWeeklyScheduleBlocks]);

  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};

    existingBlocks.forEach((block) => {
      const start = toDate(isoToYmd(block.startDate));
      const end = toDate(isoToYmd(block.endDate));
      const totalDays = Math.max(
        0,
        Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
      );

      for (let index = 0; index <= totalDays; index += 1) {
        const dateKey = formatDate(addDays(start, index));
        marks[dateKey] = {
          color: "#D1D5DB",
          textColor: "#111111",
          startingDay: index === 0,
          endingDay: index === totalDays,
        };
      }
    });

    return marks;
  }, [existingBlocks]);

  const findBlockByDate = useCallback(
    (dateString: string) => {
      const target = toDate(dateString).getTime();
      return (
        existingBlocks.find((block) => {
          const blockStart = toDate(isoToYmd(block.startDate)).getTime();
          const blockEnd = toDate(isoToYmd(block.endDate)).getTime();
          return target >= blockStart && target <= blockEnd;
        }) || null
      );
    },
    [existingBlocks]
  );

  const handleDayPress = (day: DateData) => {
    const block = findBlockByDate(day.dateString);
    if (!block) return;
    setSelectedBlock(block);
    setShowBlockActions(true);
  };

  const handleUpdate = () => {
    if (!selectedBlock) return;
    setShowBlockActions(false);
    router.push({
      pathname: "/screens/schedule/business/weekly-schedule",
      params: {
        mode: "edit",
        blockId: selectedBlock.id,
        startDate: isoToYmd(selectedBlock.startDate),
        endDate: isoToYmd(selectedBlock.endDate),
        name: selectedBlock.name || "",
      },
    });
  };

  const getDisplayContent = () => {
    if (selectedBusinesses.length === 0) {
      return { type: "all", content: "All" };
    } else if (selectedBusinesses.length === 1) {
      const selectedBusiness = myBusinesses.find(
        (b) => b.id === selectedBusinesses[0]
      );
      return { type: "single", content: selectedBusiness };
    }
    return { type: "multi", content: `${selectedBusinesses.length} Selected` };
  };

  const displayContent = getDisplayContent();

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <ScreenHeader
        className="capitalize bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5"
        style={{ paddingTop: insets.top + 10, paddingBottom: 20 }}
        onPressBack={() => router.back()}
        title="Manage Weekly Schedules"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111"}
      />

      <ScrollView className="mx-5 pt-4" showsVerticalScrollIndicator={false}>
        <View className="border border-[#EEEEEE] dark:border-dark-border rounded-2xl p-4">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary">
            Business
          </Text>
          <View className="mt-3 self-start">
            <BusinessSelectionTrigger
              displayContent={displayContent as any}
              onPress={() => setShowBusinessModal(true)}
            />
          </View>
          <Text className="mt-3 font-proximanova-regular text-secondary dark:text-dark-secondary text-xs">
            Tap an occupied date range to update or delete its weekly block.
          </Text>
        </View>

        <View className="mt-4 border border-[#EEEEEE] dark:border-dark-border rounded-2xl p-2 mb-6">
          <Calendar
            markingType="period"
            markedDates={markedDates}
            onDayPress={handleDayPress}
            enableSwipeMonths={true}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: isDark ? "#9CA3AF" : "#64748B",
              selectedDayBackgroundColor: "#4FB2F3",
              selectedDayTextColor: "#FFFFFF",
              todayTextColor: "#4FB2F3",
              dayTextColor: isDark ? "#F9FAFB" : "#111111",
              textDisabledColor: "#C7CDD3",
              monthTextColor: isDark ? "#F9FAFB" : "#111111",
              indicatorColor: "#4FB2F3",
              arrowColor: "#4FB2F3",
            }}
          />
        </View>
      </ScrollView>

      <BusinessSelectionModal
        visible={showBusinessModal}
        onClose={() => setShowBusinessModal(false)}
        businesses={myBusinesses.map((b) => ({
          id: b.id,
          name: b.name,
          address: b.address,
          imageUrl: b.logo,
          logo: b.logo,
        }))}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />

      <WeeklyBlockActionsModal
        visible={showBlockActions}
        onClose={() => setShowBlockActions(false)}
        onUpdate={handleUpdate}
        onDelete={() => {
          setShowBlockActions(false);
          toast.info("Delete API integration pending.");
        }}
        title="Weekly Block Actions"
        subtitle={selectedBlock?.name || "Selected block"}
      />
    </SafeAreaView>
  );
};

export default ManageWeeklySchedules;
