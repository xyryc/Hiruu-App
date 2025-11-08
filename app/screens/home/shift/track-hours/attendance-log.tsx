import ScreenHeader from "@/components/header/ScreenHeader";
import AttendanceLogCard from "@/components/ui/cards/AttendanceLogCard";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AttendanceLog = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <SafeAreaView
      className="flex-1  dark:bg-dark-background"
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Header */}
      <ScreenHeader
        className="mx-5 rounded-3xl"
        onPressBack={() => router.back()}
        title="Attendance Log"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111"}
        components={<></>}
      />
      <View className="mx-5 mt-8 ">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View>
            <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary">
              09 june 2025
            </Text>
            <AttendanceLogCard
              startTime="10:00"
              endTime="01:00"
              totalWorkTime="03:00:00"
              workTimeColor="#3EBF5A"
              status="accepted"
              statusLabel="Overtime"
            />
            <AttendanceLogCard
              startTime="12:30"
              endTime="15:00"
              totalWorkTime="02:30:00"
              workTimeColor="#F34F4F"
              status="rejected"
              statusLabel="Late Entry"
            />
          </View>
          <View className="mt-8">
            <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary">
              08 june 2025
            </Text>
            <AttendanceLogCard
              startTime="10:00"
              endTime="11:00"
              totalWorkTime="1:00:00"
            />
            <AttendanceLogCard
              startTime="00:00"
              endTime="00:00"
              totalWorkTime="00:00:00"
              workTimeColor="#F3934F"
              status="pending"
              statusLabel="Absent"
            />
          </View>
          <View className="mt-8">
            <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary">
              07 june 2025
            </Text>
            <AttendanceLogCard
              startTime="10:00"
              endTime="01:00"
              totalWorkTime="03:00:00"
              workTimeColor="#3EBF5A"
              status="accepted"
              statusLabel="Overtime"
            />
            <AttendanceLogCard
              startTime="00:00"
              endTime="00:00"
              totalWorkTime="00:00:00"
              workTimeColor="#F3934F"
              status="pending"
              statusLabel="Absent"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AttendanceLog;
