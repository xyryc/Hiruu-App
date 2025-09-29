import businesses from "@/assets/data/businesses.json";
import ShiftHeader from "@/components/header/ShiftHeader";
import HolidayCard from "@/components/ui/cards/HolidayCard";
import RegularShiftCard from "@/components/ui/cards/RegularShiftCard";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <View className="flex-row items-center gap-2">
        <Image
          source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
          }}
        />

        <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
          {shift.company}
        </Text>
      </View>
      <Text className="text-sm text-gray-500">{shift.workTime}</Text>
    </View>
  </View>
);

// Countdown Component
const Countdown = ({ shift }) =>
  shift.countdown && (
    <View className="px-4">
      <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary">
        {shift.type === "ongoing" ? "Shift ends in: " : "Shift starts in: "}
        <Text
          className={`font-proximanova-bold ${
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
  <View className="flex-row mb-4 overflow-hidden relative">
    {/* Time Column */}
    <View className="mr-5 relative">
      <Text className="font-proximanova-regular text-secondary dark:text-dark-secondary w-10 text-center">
        {shift.time}
      </Text>

      <View className="absolute top-12 left-5 items-center">
        {index < shiftsLength - 1 && (
          <Image
            source={require("@/assets/images/vertical-dotted-line.svg")}
            style={{
              width: 1,
              height: 175,
            }}
          />
        )}
      </View>
    </View>

    {/* Content Column */}
    <View className="flex-1 relative">
      {/* shift status */}
      <View className="absolute top-0 inset-x-0 items-center z-20">
        {shift.type === "completed" && (
          <View className="py-2">
            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              {shift.message}
            </Text>
          </View>
        )}

        {shift.type === "missed" && (
          <View className="py-2">
            <Text className="text-sm font-proximanova-regular text-[#F34F4F]">
              {shift.message}
            </Text>
          </View>
        )}

        {shift.type === "leave" && (
          <View className="py-2">
            <Text className="font-bold text-[#F1C400] capitalize">
              {shift.title}
            </Text>
          </View>
        )}

        {shift.type === "holiday" && (
          <View className="py-2">
            <Text className="font-bold text-primary dark:text-dark-primary">
              {shift.title}
            </Text>
          </View>
        )}

        {shift.type === "ongoing" && (
          <View className="py-2">
            <Countdown shift={shift} />
          </View>
        )}

        {shift.type === "upcoming" && (
          <View className="py-2">
            <Countdown shift={shift} />
          </View>
        )}
      </View>

      {/* background */}
      <View className="absolute top-0 inset-x-0 items-center z-10">
        {shift.type === "completed" && (
          <Image
            source={require("@/assets/images/shift-completed-bg.svg")}
            style={{
              width: 244,
              height: 34,
            }}
          />
        )}
        {shift.type === "missed" && (
          <Image
            source={require("@/assets/images/shift-missed-bg.svg")}
            style={{
              width: 244,
              height: 34,
            }}
          />
        )}
        {shift.type === "ongoing" && (
          <Image
            source={require("@/assets/images/shift-ongoing-bg.svg")}
            style={{
              width: 244,
              height: 34,
            }}
          />
        )}
        {(shift.type === "upcoming" || shift.type === "holiday") && (
          <Image
            source={require("@/assets/images/shift-upcoming-bg.svg")}
            style={{ width: 244, height: 34 }}
          />
        )}
        {shift.type === "leave" && shift.status === "pending" && (
          <Image
            source={require("@/assets/images/leave-pending-bg.svg")}
            style={{
              width: 244,
              height: 34,
            }}
          />
        )}
        {shift.type === "leave" && shift.status === "approved" && (
          <Image
            source={require("@/assets/images/leave-approved-bg.svg")}
            style={{
              width: 244,
              height: 34,
            }}
          />
        )}
      </View>

      <View className="px-4 pb-4 pt-12 rounded-2xl dark:bg-dark-surface border border-[#EEEEEE]">
        {shift.type === "holiday" ? (
          <HolidayCard shift={shift} />
        ) : shift.type === "leave" ? (
          <LeaveCard shift={shift} />
        ) : (
          <RegularShiftCard shift={shift} />
        )}
      </View>
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
      status: "completed",
      message: "You finished your 2:00 PM shift.",
    },
    {
      id: 2,
      type: "missed",
      time: "2:00 PM",
      title: "Maintenance Staff",
      workTime: "2:00 PM - 9:00 PM",
      breakTime: "4:30 PM - 5:00 PM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Hotel Paradise",
      status: "missed",
      message: "Missed your 9:00 PM shift.",
    },
    {
      id: 3,
      type: "leave",
      time: "9:00 PM",
      title: "Leave Pending",
      subtitle: "You're on leave for this shift",
      workTime: "9:00 PM - 2:00 AM",
      company: "Hotel Paradise",
      status: "pending",
    },
    {
      id: 4,
      type: "leave",
      time: "9:00 PM",
      title: "Leave Approved",
      subtitle: "You're on leave for this shift",
      workTime: "9:00 PM - 2:00 AM",
      company: "Hotel Paradise",
      status: "approved",
    },
    {
      id: 5,
      type: "ongoing",
      time: "2:00 AM",
      title: "Inventory Associate",
      workTime: "2:00 AM - 8:00 AM",
      breakTime: "4:30 AM - 5:00 AM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Farout Beach...",
      status: "ongoing",
      countdown: "00:59:21",
    },
    {
      id: 6,
      type: "upcoming",
      time: "8:00 AM",
      title: "Kitchen Helper / Dishwasher",
      workTime: "8:00 AM - 2:00 PM",
      breakTime: "11:30 AM - 12:00 AM",
      location: "136 Avenue-Maclezine, Ne...",
      company: "Palm Beach",
      status: "upcoming",
      countdown: "03:30:60",
    },
    {
      id: 7,
      type: "holiday",
      time: "Mon, 17 June -  10:00 AM",
      title: "Today is a Holiday",
      subtitle: "No Shifts - Rio Carnival Holiday",
      workTime: "N/A",
      company: "Hotel Paradise",
      status: "holiday",
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
