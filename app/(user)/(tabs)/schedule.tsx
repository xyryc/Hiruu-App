import businesses from "@/assets/data/businesses.json";
import ShiftHeader from "@/components/header/ShiftHeader";
import HolidayCard from "@/components/ui/cards/HolidayCard";
import LeaveCard from "@/components/ui/cards/LeaveCard";
import RegularShiftCard from "@/components/ui/cards/RegularShiftCard";
import BusinessSelectionModal from "@/components/ui/modals/BusinessSelectionModal";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Countdown Component
const Countdown = ({ shift }) =>
  shift.countdown && (
    <View className="px-4">
      <Text className="text-sm font-proximanova-regular text-primary">
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
            <Text
              className={`font-bold capitalize ${
                shift.status === "pending" ? "text-[#F1C400]" : "text-[#3EBF5A]"
              }`}
            >
              {shift.title}
            </Text>
          </View>
        )}

        {shift.type === "holiday" && (
          <View className="py-2">
            <Text className="font-bold text-primary">{shift.title}</Text>
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

      <View
        className={`px-4 pb-4 pt-12 rounded-2xl dark:bg-dark-surface border 
                ${
                  (shift.type === "leave" &&
                    shift.status === "pending" &&
                    "border-[#F1C400]") ||
                  (shift.type === "leave" &&
                    shift.status === "approved" &&
                    "border-[#3EBF5A]") ||
                  "border-[#EEEEEE]"
                }

        `}
      >
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
      location: "136 Avenue-Maclezine, New Zeland",
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
      location: "136 Avenue-Maclezine, New Zeland",
      company: "Hotel Paradise",
      status: "missed",
      message: "Missed your 9:00 PM shift.",
    },
    {
      id: 3,
      type: "leave",
      time: "9:00 PM",
      title: "Leave Pending",
      subtitle: "Leave request pending for this shift",
      workTime: "9:00 PM - 2:00 AM",
      company: "Hotel Paradise",
      status: "pending",
    },
    {
      id: 4,
      type: "leave",
      time: "9:00 PM",
      title: "Leave Approved",
      subtitle: "You’re on leave for this shift",
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
      location: "136 Avenue-Maclezine, New Zeland",
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
      location: "136 Avenue-Maclezine, New Zeland",
      company: "Palm Beach",
      status: "upcoming",
      countdown: "03:30:60",
    },
    {
      id: 7,
      type: "holiday",
      time: "10:00 AM",
      title: "Today is a Holiday",
      subtitle: "No Shifts - Rio Carnival Holiday",
      workTime: "Mon, 17 June -  10:00 AM",
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
