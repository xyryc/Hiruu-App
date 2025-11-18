import ScreenHeader from "@/components/header/ScreenHeader";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderboardInfo = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-4"
        title="Leaderboard Info"
      />

      {/* rules */}
      <ScrollView className="mt-7 mx-5">
        {/* rules */}
        <View className="bg-[#E5F4FD] rounded-xl p-4">
          {/* Title */}
          <Text className="font-proximanova-semibold text-lg mb-3">
            Visibility Rules:
          </Text>

          {/* Item 1 */}
          <View className="flex-row gap-2">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              1.
            </Text>
            <Text className="flex-1 text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Employees automatically appear on the leaderboard when they start
              earning points through their shift activity.
            </Text>
          </View>

          {/* Item 2 */}
          <View className="flex-row gap-2">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              2.
            </Text>
            <Text className="flex-1 text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Rankings reset at the start of each month.
            </Text>
          </View>
        </View>

        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardInfo;
