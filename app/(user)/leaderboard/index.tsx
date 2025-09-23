// app/(buyer)/leaderboard.tsx
import businesses from "@/assets/data/businesses.json";
import ScreenHeader from "@/components/header/ScreenHeader";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Performer {
  id: string;
  name: string;
  avatar: string;
  points: number;
  verified?: boolean;
  rank: number;
}

export default function LeaderboardScreen() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 30,
    minutes: 60,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  const topPerformers: Performer[] = [
    {
      id: "1",
      name: "Emily Kristine",
      avatar: "https://via.placeholder.com/100",
      points: 100,
      verified: true,
      rank: 1,
    },
    {
      id: "2",
      name: "Ethan Lert",
      avatar: "https://via.placeholder.com/100",
      points: 30,
      rank: 2,
    },
    {
      id: "3",
      name: "Emily Kristine",
      avatar: "https://via.placeholder.com/100",
      points: 15,
      verified: true,
      rank: 3,
    },
  ];

  const currentUser = {
    name: "You",
    avatar: "https://via.placeholder.com/100",
    points: 10,
  };

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-orange-100 border-orange-300";
      case 2:
        return "bg-green-100 border-green-300";
      case 3:
        return "bg-blue-100 border-blue-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return ["#FED7AA", "#FDBA74"];
      case 2:
        return ["#BBF7D0", "#86EFAC"];
      case 3:
        return ["#BFDBFE", "#93C5FD"];
      default:
        return ["#E5E7EB", "#D1D5DB"];
    }
  };

  const getPointsColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-orange-500";
      case 2:
        return "text-green-500";
      case 3:
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#BDE4F9]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        className="px-5"
        title="Leaderboard"
        components={
          <BusinessSelectionModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            businesses={businesses}
            selectedBusinesses={selectedBusinesses}
            onSelectionChange={setSelectedBusinesses}
          />
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Countdown Timer Card */}
        <View className="mx-4 mt-6 bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm">
          <Text className="text-center text-sm text-gray-600 dark:text-gray-400 font-proximanova-regular mb-4">
            Next Top Performer Results in
          </Text>

          <View className="flex-row justify-center items-center mb-4">
            {/* Days */}
            <View className="items-center">
              <View className="bg-blue-100 dark:bg-blue-900/30 rounded-xl px-4 py-3 min-w-[70px]">
                <Text className="text-3xl font-proximanova-bold text-blue-500 dark:text-blue-400 text-center">
                  {timeLeft.days.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-proximanova-medium">
                Days
              </Text>
            </View>

            <Text className="text-2xl font-proximanova-bold text-gray-400 mx-2">
              :
            </Text>

            {/* Hours */}
            <View className="items-center">
              <View className="bg-blue-100 dark:bg-blue-900/30 rounded-xl px-4 py-3 min-w-[70px]">
                <Text className="text-3xl font-proximanova-bold text-blue-500 dark:text-blue-400 text-center">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-proximanova-medium">
                Hours
              </Text>
            </View>

            <Text className="text-2xl font-proximanova-bold text-gray-400 mx-2">
              :
            </Text>

            {/* Minutes */}
            <View className="items-center">
              <View className="bg-blue-100 dark:bg-blue-900/30 rounded-xl px-4 py-3 min-w-[70px]">
                <Text className="text-3xl font-proximanova-bold text-blue-500 dark:text-blue-400 text-center">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-proximanova-medium">
                Minutes
              </Text>
            </View>
          </View>

          {/* Bar Chart Illustration */}
          <View className="flex-row justify-center items-end space-x-4 mt-2">
            <View className="w-12 h-16 bg-gradient-to-t from-blue-400 to-blue-200 rounded-t-lg" />
            <View className="w-12 h-24 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" />
            <View className="w-12 h-16 bg-gradient-to-t from-blue-400 to-blue-200 rounded-t-lg" />
          </View>
        </View>

        {/* Top 3 Performer Section */}
        <View className="mx-4 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-proximanova-bold text-primary dark:text-dark-primary">
              Top 3 Performer
            </Text>
            <TouchableOpacity className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 items-center justify-center">
              <Ionicons name="information" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Performer Cards */}
          <View className="space-y-3">
            {topPerformers.map((performer) => (
              <View
                key={performer.id}
                className={`
                  flex-row items-center p-4 rounded-2xl border-2
                  ${getRankColor(performer.rank)}
                `}
              >
                {/* Rank Badge */}
                <LinearGradient
                  colors={getRankBadgeColor(performer.rank)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                >
                  <Text className="text-lg font-proximanova-bold text-white">
                    {performer.rank}
                  </Text>
                </LinearGradient>

                {/* Avatar */}
                <Image
                  source={{ uri: performer.avatar }}
                  className="w-12 h-12 rounded-full mr-3"
                />

                {/* Name & Verified */}
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-base font-proximanova-semibold text-primary dark:text-dark-primary mr-2">
                      {performer.name}
                    </Text>
                    {performer.verified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#3B82F6"
                      />
                    )}
                  </View>
                </View>

                {/* Points */}
                <View
                  className={`
                  px-4 py-2 rounded-full
                  ${performer.rank === 1 ? "bg-orange-50 dark:bg-orange-900/20" : ""}
                  ${performer.rank === 2 ? "bg-green-50 dark:bg-green-900/20" : ""}
                  ${performer.rank === 3 ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                `}
                >
                  <Text
                    className={`font-proximanova-bold ${getPointsColor(performer.rank)}`}
                  >
                    {performer.points} Points
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Current User Card */}
        <View className="mx-4 mt-6 mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={{ uri: currentUser.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <Text className="text-base font-proximanova-semibold text-primary dark:text-dark-primary">
              {currentUser.name}
            </Text>
          </View>

          <View className="bg-gray-800 dark:bg-gray-700 px-4 py-2 rounded-full">
            <Text className="text-white font-proximanova-bold">
              {currentUser.points} Points
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
