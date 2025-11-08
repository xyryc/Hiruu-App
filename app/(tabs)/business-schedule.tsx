import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import businesses from "@/assets/data/businesses.json";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";

const BusinessScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  // Get display content for header button
  const getDisplayContent = () => {
    if (selectedBusinesses.length === 0) {
      return { type: "all", content: "All" };
    } else if (selectedBusinesses.length === 1) {
      const selectedBusiness = businesses.find(
        (b) => b.id === selectedBusinesses[0]
      );
      return { type: "single", content: selectedBusiness };
    }
  };

  const displayContent = getDisplayContent();

  const dates = [
    { date: 1, day: "AM" },
    { date: 2, day: "AM" },
    { date: 3, day: "AM" },
    { date: 4, day: "AM" },
    { date: 5, day: "AM" },
    { date: 6, day: "AM" },
    { date: 7, day: "AM" },
    { date: 8, day: "AM" },
    { date: 9, day: "AM" },
    { date: 10, day: "AM" },
    { date: 11, day: "AM" },
    { date: 12, day: "PM" },
    { date: 1, day: "PM" },
    { date: 2, day: "PM" },
    { date: 3, day: "PM" },
    { date: 4, day: "PM" },
    { date: 5, day: "PM" },
    { date: 6, day: "PM" },
    { date: 7, day: "PM" },
    { date: 8, day: "PM" },
    { date: 9, day: "PM" },
    { date: 10, day: "PM" },
    { date: 11, day: "PM" },
    { date: 12, day: "PM" },
  ];

  const filters = [
    { id: "all", label: "All", count: 20 },
    { id: "cashier", label: "Cashier", count: 5 },
    { id: "bartender", label: "Bartender", count: 8 },
    { id: "housekeeping", label: "Housekeeping", count: 7 },
  ];

  const shifts = [
    {
      id: 1,
      name: "Amid Hazelwood",
      role: "Cashier",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      shiftTime: "6:00 AM - 2:00 PM",
      location: "136 Avenue-Maciezine, Ne...",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Bartender",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      shiftTime: "6:00 AM - 2:00 PM",
      location: "136 Avenue-Maciezine, Ne...",
      status: "upcoming",
    },
  ];

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="py-4">
        <View className="flex-row items-center justify-between mb-4 px-5">
          {/* left */}
          <View>
            <Text className="font-proximanova-regular text-primary">
              All Shift
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-xl font-proximanova-bold text-primary">
                12 June, 2025
              </Text>
              <Ionicons name="chevron-down" size={18} color="black" />
            </View>
          </View>

          {/* right */}
          <View className="flex-row gap-3">
            {/* calendar */}
            <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#F5F5F5] rounded-full">
              <Ionicons name="calendar-outline" size={22} color="black" />
            </TouchableOpacity>

            {/* notification */}
            <TouchableOpacity
              onPress={() => router.push("/shared/notification")}
              className="w-10 h-10 items-center justify-center bg-[#F5F5F5] rounded-full"
            >
              <Image
                source={require("@/assets/images/bell.svg")}
                style={{
                  width: 24,
                  height: 24,
                }}
                contentFit="contain"
              />
              <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
                <Text className="text-[10px] text-white">1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shift Type Selector */}
        <View className="flex-row items-center gap-2.5 mb-5 pl-5">
          {/* business selection */}
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-[#E5F4FD] flex-row items-center p-0.5 rounded-[26px]"
          >
            {displayContent?.type === "all" ? (
              <View className="pl-2.5 py-1.5">
                <Text className="font-semibold text-sm text-primary">All</Text>
              </View>
            ) : (
              <Image
                source={displayContent?.content?.imageUrl}
                style={{ width: 30, height: 30, borderRadius: 999 }}
                contentFit="cover"
              />
            )}
            <SimpleLineIcons
              className="p-1.5"
              name="arrow-down"
              size={12}
              color="#111111"
            />
          </TouchableOpacity>

          {/* shift selection */}
          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              onPress={() => setSelectedShift("morning")}
              className="px-2.5 py-1"
            >
              <Text
                className={`text-sm ${
                  selectedShift === "morning"
                    ? "text-primary font-proximanova-semibold"
                    : "text-secondary"
                }`}
              >
                Morning Shift
              </Text>
            </TouchableOpacity>

            <Text className="text-secondary">|</Text>

            <TouchableOpacity
              onPress={() => setSelectedShift("afternoon")}
              className="px-2.5 py-1"
            >
              <Text
                className={`text-sm ${
                  selectedShift === "afternoon"
                    ? "text-primary font-proximanova-semibold"
                    : "text-secondary"
                }`}
              >
                Afternoon Shift
              </Text>
            </TouchableOpacity>

            <Text className="text-secondary">|</Text>

            <TouchableOpacity
              onPress={() => setSelectedShift("evening")}
              className="px-2.5 py-1"
            >
              <Text
                className={`text-sm ${
                  selectedShift === "evening"
                    ? "text-primary font-proximanova-semibold"
                    : "text-secondary"
                }`}
              >
                Evening Shift
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selector */}
        <ScrollView
          horizontal
          className="mb-5 pl-5"
          showsHorizontalScrollIndicator={false}
        >
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(item.date)}
              className={`w-8 h-14 items-center justify-center rounded-2xl mr-3 ${
                selectedDate === item.date
                  ? "bg-[#4FB2F3]"
                  : "bg-white border border-[#EEEEEE]"
              }`}
            >
              <Text
                className={`font-proximanova-bold ${
                  selectedDate === item.date ? "text-white" : "text-primary"
                }`}
              >
                {item.date}
              </Text>
              <Text
                className={`text-xs font-proximanova-regular mt-1 ${
                  selectedDate === item.date ? "text-white" : "text-gray-600"
                }`}
              >
                {item.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 pl-5"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              className={`px-2.5 py-2 rounded-full mr-3 ${
                selectedFilter === filter.id ? "bg-[#4FB2F3]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-proximanova-semibold text-sm ${
                  selectedFilter === filter.id ? "text-white" : "text-primary"
                }`}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Shifts List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-proximanova-bold text-primary">
            Morning Shifts (15)
          </Text>
          <Text className="text-sm font-proximanova-regular text-gray-600">
            10:00AM to 5:00PM
          </Text>
        </View>

        {shifts.map((shift) => (
          <View
            key={shift.id}
            className="bg-[#F8F9FA] rounded-2xl p-4 mb-3 flex-row items-start"
          >
            <Image
              source={{ uri: shift.avatar }}
              style={{ width: 50, height: 50 }}
              className="rounded-full mr-3"
            />

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-proximanova-bold text-primary">
                  {shift.name}
                </Text>
                <TouchableOpacity>
                  <Entypo name="dots-three-vertical" size={16} color="#666" />
                </TouchableOpacity>
              </View>

              <Text className="text-sm font-proximanova-regular text-gray-600 mb-3">
                {shift.role}
              </Text>

              <View className="flex-row items-center mb-2">
                <Text className="text-xs font-proximanova-regular text-gray-500 w-20">
                  Shift Time:
                </Text>
                <Text className="text-sm font-proximanova-semibold text-primary">
                  {shift.shiftTime}
                </Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Text className="text-xs font-proximanova-regular text-gray-500 w-20">
                  Location:
                </Text>
                <Text className="text-sm font-proximanova-regular text-primary">
                  {shift.location}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="text-sm font-proximanova-semibold text-[#4FB2F3]">
                    View Details
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#4FB2F3" />
                </TouchableOpacity>

                <View
                  className={`px-3 py-1.5 rounded-full ${
                    shift.status === "ongoing"
                      ? "bg-orange-100"
                      : "bg-green-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-proximanova-semibold capitalize ${
                      shift.status === "ongoing"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    ● {shift.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* modal */}
      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={businesses}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />
    </SafeAreaView>
  );
};

export default BusinessScheduleScreen;
