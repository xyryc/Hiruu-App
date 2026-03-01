import ShiftHeader from "@/components/header/ShiftHeader";
import ShiftItem from "@/components/layout/ShiftItem";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import { useShiftStore } from "@/stores/shiftStore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

type ApiShift = {
  id: string;
  date: string;
  shiftTemplate?: {
    name?: string;
    startTime?: string;
    endTime?: string;
    breakDuration?: Array<{ startTime?: string; endTime?: string }>;
  };
  employment?: {
    business?: {
      id?: string;
      name?: string;
      logo?: string;
    };
  };
};

type UiShift = {
  id: string;
  businessId: string;
  type: "ongoing" | "upcoming" | "completed";
  time: string;
  title: string;
  workTime: string;
  breakTime?: string;
  company: string;
  status: "ongoing" | "upcoming" | "completed";
  countdown?: string;
  message?: string;
};

const ShiftSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const value = new Date();
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, "0");
    const day = `${value.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [refreshing, setRefreshing] = useState(false);
  const { myShifts, myShiftsLoading, fetchMyShifts } = useShiftStore();

  const to12Hour = useCallback((value?: string) => {
    if (!value) return "--:--";
    const [rawHour = "0", rawMinute = "0"] = value.split(":");
    const hour = Number(rawHour);
    const minute = Number(rawMinute);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return value;
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
  }, []);

  const timeToMinutes = useCallback((value?: string) => {
    if (!value) return 0;
    const [h = "0", m = "0"] = value.split(":");
    return Number(h) * 60 + Number(m);
  }, []);

  const formatCountdown = useCallback((seconds: number) => {
    const safe = Math.max(0, Math.floor(seconds));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const secs = safe % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }, []);

  const toUiShift = useCallback(
    (shift: ApiShift): UiShift => {
      const start = shift?.shiftTemplate?.startTime || "00:00";
      const end = shift?.shiftTemplate?.endTime || "00:00";
      const shiftDate = new Date(shift?.date || Date.now());
      const now = new Date();

      const shiftStart = new Date(shiftDate);
      shiftStart.setHours(Math.floor(timeToMinutes(start) / 60), timeToMinutes(start) % 60, 0, 0);

      const shiftEnd = new Date(shiftDate);
      shiftEnd.setHours(Math.floor(timeToMinutes(end) / 60), timeToMinutes(end) % 60, 0, 0);
      if (shiftEnd <= shiftStart) {
        shiftEnd.setDate(shiftEnd.getDate() + 1);
      }

      let type: UiShift["type"] = "upcoming";
      let countdown: string | undefined;
      let message: string | undefined;

      if (now >= shiftStart && now <= shiftEnd) {
        type = "ongoing";
        countdown = formatCountdown((shiftEnd.getTime() - now.getTime()) / 1000);
      } else if (now < shiftStart) {
        type = "upcoming";
        countdown = formatCountdown((shiftStart.getTime() - now.getTime()) / 1000);
      } else {
        type = "completed";
        message = `You finished your ${to12Hour(start)} shift.`;
      }

      const breakDuration = Array.isArray(shift?.shiftTemplate?.breakDuration)
        ? shift.shiftTemplate.breakDuration
        : [];
      const breakTime =
        breakDuration.length > 0
          ? breakDuration
            .map((item) => `${to12Hour(item?.startTime)} - ${to12Hour(item?.endTime)}`)
            .join(", ")
          : undefined;

      return {
        id: shift.id,
        businessId: shift?.employment?.business?.id || "",
        type,
        time: to12Hour(start),
        title: shift?.shiftTemplate?.name || "Shift",
        workTime: `${to12Hour(start)} - ${to12Hour(end)}`,
        breakTime,
        company: shift?.employment?.business?.name || "Business",
        status: type,
        countdown,
        message,
      };
    },
    [formatCountdown, timeToMinutes, to12Hour]
  );

  const loadShifts = useCallback(async () => {
    try {
      await fetchMyShifts(selectedDate);
    } catch (error: any) {
      toast.error(error?.message || "Failed to load shifts");
    }
  }, [fetchMyShifts, selectedDate]);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadShifts();
    setRefreshing(false);
  }, [loadShifts]);

  const uiShifts = useMemo(
    () => (Array.isArray(myShifts) ? myShifts : []).map(toUiShift),
    [myShifts, toUiShift]
  );

  const filteredShifts = useMemo(() => {
    if (selectedBusinesses.length === 0) return uiShifts;
    return uiShifts.filter((shift) => selectedBusinesses.includes(shift.businessId));
  }, [selectedBusinesses, uiShifts]);

  const modalBusinesses = useMemo(() => {
    const map = new Map<string, { id: string; name: string; logo?: string }>();
    (Array.isArray(myShifts) ? myShifts : []).forEach((shift) => {
      const business = shift?.employment?.business;
      if (!business?.id) return;
      if (map.has(business.id)) return;
      map.set(business.id, {
        id: business.id,
        name: business.name || "Business",
        logo: business.logo,
      });
    });
    return Array.from(map.values());
  }, [myShifts]);

  // Get display content for header button
  const getDisplayContent = () => {
    if (selectedBusinesses.length === 0 || modalBusinesses.length === 0) {
      return { type: "all", content: "All" };
    } else if (selectedBusinesses.length === 1) {
      const selectedBusiness = modalBusinesses.find(
        (b) => b.id === selectedBusinesses[0]
      );
      return { type: "single", content: selectedBusiness };
    }
    return { type: "all", content: "All" };
  };

  const displayContent = getDisplayContent();

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ShiftHeader
        setShowModal={setShowModal}
        displayContent={displayContent}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4FB2F3" />
        }
      >
        {myShiftsLoading ? (
          <View className="py-8 items-center">
            <ActivityIndicator size="small" color="#4FB2F3" />
          </View>
        ) : filteredShifts.length > 0 ? (
          filteredShifts.map((shift, index) => (
            <ShiftItem
              key={shift.id}
              shift={shift}
              index={index}
              shiftsLength={filteredShifts.length}
            />
          ))
        ) : (
          <Text className="text-center text-secondary py-8">No shifts found.</Text>
        )}
      </ScrollView>

      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={modalBusinesses}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />
    </SafeAreaView>
  );
};

export default ShiftSchedule;
