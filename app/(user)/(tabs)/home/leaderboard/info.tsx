import ScreenHeader from "@/components/header/ScreenHeader";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderboardInfo = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-4"
        title="Leaderboard Info"
      />

      {/* rules */}
      <View className="bg-[#E5F4FD] rounded-xl p-4 mt-7 mx-5">
        {/* Title */}
        <Text className="font-proximanova-semibold text-lg mb-4">
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

      <ScrollView className="px-5 flex-1" contentContainerClassName="pb-10">
        {/* point list */}
        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Ionicons
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="time-outline"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Be On Time
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +40 Points/month
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              +2 points for every day you arrive on time
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Ionicons
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="calendar-outline"
              size={2}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Arrive Early
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +1 Points/shift
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Show up 10+ minutes early
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Feather
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="repeat"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Cover a Teammate's Shift
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +2 Points/shift
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Accept and complete a swap request
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Feather
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="star"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Get 5-Star Client Feedback
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +100 Points
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Deliver great service that clients love and rate highly.
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Feather
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="check-circle"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Complete All Assigned Tasks
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +120 Points
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Stay on top of your daily duties to earn extra points.
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <Ionicons
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="time-outline"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                Weekly Attendance with 0 Delays
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +150 Points
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Show up on time all week and get a loyalty bonus.
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2.5 border-b border-[#EEEEEE] pb-2.5 mt-7">
          <View>
            <SimpleLineIcons
              className="p-2 bg-[#E5F4FD] rounded-full border-[0.5px] border-[#b2b1b159]"
              name="close"
              size={24}
              color="#4FB2F3"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-proximanova-semibold text-primary">
                No Leave in One Month
              </Text>

              <Text className="font-proximanova-regular text-sm text-[#4FB2F3] p-1.5 border-[0.5px] border-[#4FB2F34D] bg-[#4FB2F31A] rounded-[30px]">
                +180 Points
              </Text>
            </View>

            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Maintain perfect monthly attendance to earn a consistency bonus.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardInfo;
