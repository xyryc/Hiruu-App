import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WorkShiftCardProps {
  shiftTitle: string;
  startTime: string;
  endTime: string;
  shiftImage: any;
  teamMembers: string[];
  totalMembers: number;
  address: string;
  city: string;
  onLoginPress: () => void;
  status?: "ongoing" | "upcoming" | "completed";
}

const TaskCard: React.FC<WorkShiftCardProps> = ({
  shiftTitle,
  startTime,
  endTime,
  shiftImage,
  teamMembers,
  totalMembers,
  address,
  city,
  onLoginPress,
  status = "ongoing",
}) => {
  const [elapsedTime, setElapsedTime] = useState("00:00:05");

  // Timer effect for ongoing shifts
  useEffect(() => {
    if (status === "ongoing") {
      const interval = setInterval(() => {
        // Simulate timer increment
        setElapsedTime((prev) => {
          const [hours, minutes, seconds] = prev.split(":").map(Number);
          let newSeconds = seconds + 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds >= 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
          }

          return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const getStatusColor = () => {
    switch (status) {
      case "ongoing":
        return "#10B981";
      case "upcoming":
        return "#F59E0B";
      case "completed":
        return "#6B7280";
      default:
        return "#10B981";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "ongoing":
        return "Ongoing:";
      case "upcoming":
        return "Starts in:";
      case "completed":
        return "Completed:";
      default:
        return "Ongoing:";
    }
  };

  return (
    <View className="mx-4 rounded-3xl p-6 mb-4 bg-[#E5F4FD] border border-[#4fb1f333]">
      {/* Status Timer */}
      {status === "ongoing" && (
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center bg-white px-3 py-2 rounded-full">
            <Text className="text-gray-700 font-medium mr-2">
              {getStatusText()}
            </Text>
            <View
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: getStatusColor() }}
            />
            <Text
              className="font-mono font-bold"
              style={{ color: getStatusColor() }}
            >
              {elapsedTime}
            </Text>
          </View>
        </View>
      )}

      <View className="flex-row">
        {/* Left Side - Image */}
        <View className="mr-4">
          <Image
            source={shiftImage}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
            }}
            contentFit="contain"
          />
        </View>

        {/* Right Side - Content */}
        <View className="flex-1">
          {/* Shift Title */}
          <Text className="text-lg font-bold text-gray-900 mb-2">
            {shiftTitle}
          </Text>

          {/* Time */}
          <View className="flex-row items-center mb-3">
            <View className="w-5 h-5 mr-2">
              <Text className="text-gray-500">🕐</Text>
            </View>
            <Text className="text-gray-600 font-medium">
              {startTime} - {endTime}
            </Text>
          </View>

          {/* Team Members */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {/* Avatar Stack */}
              <View className="flex-row">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <View
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 justify-center items-center"
                    style={{
                      marginLeft: index > 0 ? -8 : 0,
                      zIndex: 10 - index,
                    }}
                  >
                    <Text className="text-xs font-medium text-gray-600">
                      {member.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                ))}

                {teamMembers.length > 3 && (
                  <View
                    className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 justify-center items-center"
                    style={{ marginLeft: -8, zIndex: 7 }}
                  >
                    <Text className="text-xs font-bold text-white">
                      +{teamMembers.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Member Count */}
            <View className="flex-row items-center">
              <FontAwesome5 name="user" size={14} color="#7A7A7A" />
              <Text className="text-gray-600 font-medium ml-1">
                {teamMembers.length}/{totalMembers}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="items-center my-4">
        <Image
          source={require("@/assets/images/dotted-line.svg")}
          style={{
            width: 290,
            height: 1,
          }}
        />
      </View>

      {/* Location & Login */}
      <View className="flex-row justify-between items-center">
        {/* Location */}
        <View className="flex-row items-center flex-1">
          <View className="mr-2 bg-white rounded-md">
            <Image
              source={require("@/assets/images/location.svg")}
              style={{
                width: 34,
                height: 34,
              }}
              contentFit="cover"
            />
          </View>

          <View className="flex-1">
            <Text className="font-proximanova-regular text-sm text-primary">
              {address}
            </Text>
            <Text className="font-proximanova-regular text-sm text-primary">
              {city}
            </Text>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={onLoginPress}
          className="bg-gray-800 px-8 py-3 rounded-2xl"
        >
          <Text className="text-white font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
