import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ShiftSchedule = () => {
  const shifts = [
    {
      id: 1,
      type: "completed",
      time: "2:00 PM",
      title: "Maintenance Staff",
      workTime: "2:00 PM - 9:00 PM",
      breakTime: "4:30 PM - 5:00 PM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Space Hotel",
      status: "Completed",
      message: "You finished your 2:00 PM shift.",
    },
    {
      id: 2,
      type: "leave",
      time: "9:00 PM",
      title: "Leave Approved",
      subtitle: "You're on leave for this shift",
      workTime: "9:00 PM - 2:00 AM",
      company: "Hotel Paradise",
      status: "Leave Approved",
    },
    {
      id: 3,
      type: "ongoing",
      time: "2:00 AM",
      title: "Inventory Associate",
      workTime: "2:00 AM - 8:00 AM",
      breakTime: "4:30 AM - 5:00 AM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Farout Beach...",
      status: "Ongoing",
      countdown: "00:59:21",
    },
    {
      id: 4,
      type: "upcoming",
      time: "8:00 AM",
      title: "Kitchen Helper / Dishwasher",
      workTime: "8:00 AM - 2:00 PM",
      breakTime: "11:30 AM - 12:00 AM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Palm Beach",
      status: "Upcoming",
      countdown: "03:30:60",
    },
  ];

  const getStatusColor = (type) => {
    switch (type) {
      case "completed":
        return "bg-gray-100";
      case "leave":
        return "bg-green-50";
      case "ongoing":
        return "bg-orange-50";
      case "upcoming":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusBadgeColor = (type) => {
    switch (type) {
      case "completed":
        return "bg-gray-500";
      case "leave":
        return "bg-green-500";
      case "ongoing":
        return "bg-orange-500";
      case "upcoming":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCompanyInitials = (company) => {
    return company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getCompanyColor = (company) => {
    const colors = ["bg-black", "bg-green-600", "bg-pink-500", "bg-gray-700"];
    const index = company.length % colors.length;
    return colors[index];
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-4 pt-12 pb-4 bg-white">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-sm text-gray-500">All Shift</Text>
            <View className="flex-row items-center">
              <Text className="text-xl font-semibold text-black">
                12 June, 2025
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color="#666"
                className="ml-1"
              />
            </View>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-semibold text-black">
            Friday, 16 June, 2025
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-sm text-gray-500 mr-1">All</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {shifts.map((shift, index) => (
          <View key={shift.id} className="flex-row mb-6 relative">
            {/* Time Column */}
            <View className="w-16 mr-4 relative">
              <Text className="text-sm font-medium text-gray-400">
                {shift.time}
              </Text>

              {/* Timeline dot and line */}
              <View className="absolute top-1 left-12 items-center">
                <View className="w-2 h-2 bg-gray-300 rounded-full" />
                {index < shifts.length - 1 && (
                  <View
                    className="w-0.5 h-20 mt-2"
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: "#D1D5DB",
                      borderStyle: "dotted",
                    }}
                  />
                )}
              </View>
            </View>

            {/* Content Column */}
            <View className="flex-1">
              {shift.type === "completed" && (
                <View className="mb-2">
                  <Text className="text-sm text-gray-600">{shift.message}</Text>
                </View>
              )}

              <View className={`p-4 rounded-2xl ${getStatusColor(shift.type)}`}>
                {shift.type === "leave" ? (
                  // Leave Card Layout
                  <View>
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Feather
                          name="check-circle"
                          size={16}
                          color="#10B981"
                        />
                        <Text className="ml-2 font-semibold text-green-700">
                          {shift.title}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-4">
                      <View className="w-16 h-12 bg-green-100 rounded-lg mr-3 items-center justify-center">
                        <MaterialIcons
                          name="beach-access"
                          size={20}
                          color="#10B981"
                        />
                      </View>
                      <Text className="text-gray-700 font-medium">
                        {shift.subtitle}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View
                          className={`w-8 h-8 rounded-full ${getCompanyColor(shift.company)} items-center justify-center mr-3`}
                        >
                          <Text className="text-white text-xs font-semibold">
                            {getCompanyInitials(shift.company)}
                          </Text>
                        </View>
                        <Text className="text-sm text-gray-600">
                          {shift.company}
                        </Text>
                      </View>
                      <Text className="text-sm text-gray-500">
                        {shift.workTime}
                      </Text>
                    </View>
                  </View>
                ) : (
                  // Regular Shift Card Layout
                  <View>
                    <Text className="font-semibold text-gray-900 text-base mb-3">
                      {shift.title}
                    </Text>

                    <View className="space-y-2 mb-4">
                      <View className="flex-row justify-between">
                        <Text className="text-sm text-gray-500">Time:</Text>
                        <Text className="text-sm text-gray-700 font-medium">
                          {shift.workTime}
                        </Text>
                      </View>
                      {shift.breakTime && (
                        <View className="flex-row justify-between">
                          <Text className="text-sm text-gray-500">Break:</Text>
                          <Text className="text-sm text-gray-700 font-medium">
                            {shift.breakTime}
                          </Text>
                        </View>
                      )}
                      {shift.location && (
                        <View className="flex-row justify-between">
                          <Text className="text-sm text-gray-500">
                            Location:
                          </Text>
                          <Text className="text-sm text-gray-700 font-medium">
                            {shift.location}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View
                          className={`w-8 h-8 rounded-full ${getCompanyColor(shift.company)} items-center justify-center mr-3`}
                        >
                          <Text className="text-white text-xs font-semibold">
                            {getCompanyInitials(shift.company)}
                          </Text>
                        </View>
                        <Text className="text-sm text-gray-600">
                          {shift.company}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <View
                          className={`w-2 h-2 rounded-full ${getStatusBadgeColor(shift.type)} mr-2`}
                        />
                        <Text className="text-sm text-gray-600">
                          {shift.status}
                        </Text>
                        <TouchableOpacity className="ml-2">
                          <Ionicons
                            name="chatbubble-outline"
                            size={16}
                            color="#666"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* Countdown for ongoing/upcoming shifts */}
              {shift.countdown && (
                <View className="mt-2 px-4">
                  <Text className="text-sm text-gray-600">
                    {shift.type === "ongoing"
                      ? "Shift ends in: "
                      : "Shift starts in: "}
                    <Text
                      className={`font-mono font-semibold ${
                        shift.type === "ongoing"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {shift.countdown}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShiftSchedule;
