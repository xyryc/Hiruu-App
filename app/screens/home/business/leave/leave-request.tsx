import ScreenHeader from "@/components/header/ScreenHeader";
import BusinessShiftPending from "@/components/ui/cards/BusinessShiftPending";
import SuccessRejectModal from "@/components/ui/modals/SuccessRejectModal";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaveRequest = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedTab, setSelectedTab] = useState("New Request");
  const [isSuccess, setIssuccess] = useState(false);
  const [reject, setReject] = useState(false);
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Leave Requests"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
          components={
            <TouchableOpacity
              onPress={() =>
                router.push("/screens/home/business/leave/request-leave")
              }
              className="h-10 w-10 bg-white rounded-full flex-row justify-center items-center"
            >
              <Ionicons name="share-outline" size={22} color="black" />
            </TouchableOpacity>
          }
        />
        {/* Tabs */}
        <View className="flex-row mx-5 mt-4 dark:bg-dark-background">
          {["New Request", "Approved"].map((tab) => (
            <TouchableOpacity
              className={`w-1/2 ${selectedTab === tab ? "border-b-2 border-[#11293A] pb-2" : ""}`}
              key={tab}
              onPress={() => setSelectedTab(tab)}
            >
              <View className="flex-row justify-center gap-2">
                <Text
                  className={`text-center dark:text-dark-primary ${selectedTab === tab ? "font-proximanova-semibold" : "font-proximanova-regular"}`}
                >
                  {tab}
                </Text>
                {tab === "New Request" && selectedTab === "New Request" && (
                  <View className="bg-[#4FB2F3] px-2 py-1 rounded-full">
                    <Text className="text-white">3</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
        {/* pending screen */}
        {selectedTab === "Approved" && (
          <View>
            <BusinessShiftPending approved={true} status="Earned Leave" />
            <BusinessShiftPending approved={true} status="Sick Leave" />
            <BusinessShiftPending approved={true} status="Hourly Leave" />
            <BusinessShiftPending approved={true} status="Earned Leave" />
            <BusinessShiftPending approved={true} status="Hourly Leave" />
          </View>
        )}

        {/* Request History */}
        {selectedTab === "New Request" && (
          <View>
            <BusinessShiftPending
              modal={() => setIssuccess(true)}
              setReject={setReject}
              reject={reject}
              selectedTab
              title="Today 21"
              status="Hourly Leave"
            />
            <BusinessShiftPending selectedTab status="Late Clock-in" />
            <BusinessShiftPending
              title="20 Apr, 2025"
              selectedTab
              status="Hourly Leave"
            />
            <BusinessShiftPending selectedTab status="Network Issues" />
            <BusinessShiftPending selectedTab status="Hourly Leave" />
          </View>
        )}
        <SuccessRejectModal
          visible={isSuccess}
          onClose={() => setIssuccess(false)}
          reject={reject}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveRequest;
