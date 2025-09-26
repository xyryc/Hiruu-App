import businesses from "@/assets/data/businesses.json";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Header Component
const ShiftHeader = ({ setShowModal }) => (
  <View className="px-5 pb-4">
    <View className="flex-row justify-between items-center mb-2">
      <View>
        <Text className="font-proximanova-regular text-primary dark:text-dark-primary">
          All Shift
        </Text>
        <View className="flex-row items-center">
          <Text className="text-xl font-proximanova-bold text-primary dark:text-dark-primary">
            12 June, 2025
          </Text>
          <Ionicons
            name="chevron-down"
            size={18}
            color="#666"
            className="ml-2.5"
          />
        </View>
      </View>

      <View className="flex-row items-center gap-1.5">
        <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
          <Ionicons name="calendar-outline" size={24} color="#111111" />
        </TouchableOpacity>

        {/* notification */}
        <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
          <Image
            source={require("@/assets/images/bell.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="scale-down"
          />
          <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
            <Text className="text-[10px] text-white">1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

    <View className="flex-row justify-between items-center mt-4">
      <Text className="text-lg font-semibold text-black">
        Friday, 16 June, 2025
      </Text>

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="bg-[#E5F4FD] flex-row items-center p-0.5 rounded-[26px]"
      >
        <Image
          source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
          style={{ width: 30, height: 30, borderRadius: 999 }}
          contentFit="cover"
        />
        <SimpleLineIcons
          className="p-1.5"
          name="arrow-down"
          size={12}
          color="#111111"
        />
      </TouchableOpacity>
    </View>
  </View>
);

// Company Avatar Component
const CompanyAvatar = ({ company }) => (
  <View
    className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
      company === "Space Hotel"
        ? "bg-black"
        : company === "Hotel Paradise"
          ? "bg-green-600"
          : company === "Farout Beach..."
            ? "bg-pink-500"
            : company === "Palm Beach"
              ? "bg-gray-700"
              : "bg-black"
    }`}
  >
    <Text className="text-white text-xs font-semibold">
      {company === "Space Hotel"
        ? "SH"
        : company === "Hotel Paradise"
          ? "HP"
          : company === "Farout Beach..."
            ? "FB"
            : company === "Palm Beach"
              ? "PB"
              : "SH"}
    </Text>
  </View>
);

// Status Badge Component
const StatusBadge = ({ type, status }) => (
  <View className="flex-row items-center">
    <View
      className={`w-2 h-2 rounded-full mr-2 ${
        type === "completed"
          ? "bg-gray-500"
          : type === "leave"
            ? "bg-green-500"
            : type === "ongoing"
              ? "bg-orange-500"
              : type === "upcoming"
                ? "bg-blue-500"
                : "bg-gray-500"
      }`}
    />
    <Text className="text-sm text-gray-600">{status}</Text>
    <TouchableOpacity className="ml-2">
      <Ionicons name="chatbubble-outline" size={16} color="#666" />
    </TouchableOpacity>
  </View>
);

// Shift Details Component
const ShiftDetails = ({ shift }) => (
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
        <Text className="text-sm text-gray-500">Location:</Text>
        <Text className="text-sm text-gray-700 font-medium">
          {shift.location}
        </Text>
      </View>
    )}
  </View>
);

// Leave Card Component
const LeaveCard = ({ shift }) => (
  <View>
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center">
        <Feather name="check-circle" size={16} color="#10B981" />
        <Text className="ml-2 font-semibold text-green-700">{shift.title}</Text>
      </View>
    </View>

    <View className="flex-row items-center mb-4">
      <View className="w-16 h-12 bg-green-100 rounded-lg mr-3 items-center justify-center">
        <MaterialIcons name="beach-access" size={20} color="#10B981" />
      </View>
      <Text className="text-gray-700 font-medium">{shift.subtitle}</Text>
    </View>

    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <CompanyAvatar company={shift.company} />
        <Text className="text-sm text-gray-600">{shift.company}</Text>
      </View>
      <Text className="text-sm text-gray-500">{shift.workTime}</Text>
    </View>
  </View>
);

// Regular Shift Card Component
const RegularShiftCard = ({ shift }) => (
  <View>
    <Text className="font-semibold text-gray-900 text-base mb-3">
      {shift.title}
    </Text>

    <ShiftDetails shift={shift} />

    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <CompanyAvatar company={shift.company} />
        <Text className="text-sm text-gray-600">{shift.company}</Text>
      </View>
      <StatusBadge type={shift.type} status={shift.status} />
    </View>
  </View>
);

// Timeline Component
const Timeline = ({ index, shiftsLength }) => (
  <View className="absolute top-0 left-5 items-center">
    {index < shiftsLength - 1 && (
      <View className="">
        <Image
          source={require("@/assets/images/vertical-dotted-line.svg")}
          style={{
            width: 1,
            height: 175,
          }}
        />
      </View>
    )}
  </View>
);

// Countdown Component
const Countdown = ({ shift }) =>
  shift.countdown && (
    <View className="mt-2 px-4">
      <Text className="text-sm text-gray-600">
        {shift.type === "ongoing" ? "Shift ends in: " : "Shift starts in: "}
        <Text
          className={`font-mono font-semibold ${
            shift.type === "ongoing" ? "text-orange-600" : "text-blue-600"
          }`}
        >
          {shift.countdown}
        </Text>
      </Text>
    </View>
  );

// Shift Item Component
const ShiftItem = ({ shift, index, shiftsLength }) => (
  <View className="flex-row mb-6 relative">
    {/* Time Column */}
    <View className="w-16 mr-4 relative">
      <Text className="font-proximanova-regular text-secondary dark:text-dark-secondary w-10 text-center">
        {shift.time}
      </Text>
      <Timeline index={index} shiftsLength={shiftsLength} />
    </View>

    {/* Content Column */}
    <View className="flex-1">
      {shift.type === "completed" && (
        <View className="mb-2">
          <Text className="text-sm text-gray-600">{shift.message}</Text>
        </View>
      )}

      <View
        className={`p-4 rounded-2xl ${
          shift.type === "completed"
            ? "bg-gray-100"
            : shift.type === "leave"
              ? "bg-green-50"
              : shift.type === "ongoing"
                ? "bg-orange-50"
                : shift.type === "upcoming"
                  ? "bg-blue-50"
                  : "bg-gray-50"
        }`}
      >
        {shift.type === "leave" ? (
          <LeaveCard shift={shift} />
        ) : (
          <RegularShiftCard shift={shift} />
        )}
      </View>

      <Countdown shift={shift} />
    </View>
  </View>
);

// Main Component
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

  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ShiftHeader setShowModal={setShowModal} />

      <ScrollView className="flex-1 px-5">
        {shifts.map((shift, index) => (
          <ShiftItem
            key={shift.id}
            shift={shift}
            index={index}
            shiftsLength={shifts.length}
          />
        ))}
      </ScrollView>

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

export default ShiftSchedule;
