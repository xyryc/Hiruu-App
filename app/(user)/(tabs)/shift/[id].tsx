import ScreenHeader from "@/components/header/ScreenHeader";
import StatusBadge from "@/components/ui/badges/StatusBadge";
import ActionIconCard from "@/components/ui/cards/ActionIconCard";
import CountdownTimer from "@/components/ui/timer/CountdownTimer";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShiftDetails = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-4"
        title="Detail"
        components={
          <View className="flex-row items-center gap-2.5">
            <StatusBadge status="upcoming" />

            <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
              <Image
                source={require("@/assets/images/scan.svg")}
                style={{
                  width: 24,
                  height: 24,
                }}
                contentFit="scale-down"
              />
            </TouchableOpacity>
          </View>
        }
      />

      <View className="mt-2.5 mx-5">
        {/* timer */}
        <Text className="text-center text-secondary dark:text-dark-secondary font-proximanova-regular mb-2.5">
          Shift starts in
        </Text>
        <CountdownTimer targetTime="2025-12-31T23:01:60" className="mb-8" />

        {/* time location */}
        <View className="">
          <Text className="text-lg font-proximanova-bold text-primary dark:text-dark-primary mb-4">
            Kitchen Helper / Dishwasher
          </Text>

          <View className="flex-row items-center gap-2.5">
            {/* left */}
            <View>
              {/* time */}
              <View className="flex-row items-center gap-2 border border-[#EEEEEE] rounded-[14px] p-3 mb-2.5">
                <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
                  <AntDesign name="clock-circle" size={18} color="#7A7A7A" />
                </TouchableOpacity>

                <View>
                  <Text className="text-secondary dark:text-dark-secondary text-sm pb-3">
                    Time:
                  </Text>
                  <Text className="text-primary dark:text-dark-primary text-sm">
                    8:00 AM - 2:00 PM
                  </Text>
                </View>
              </View>

              {/* break */}
              <View className="flex-row items-center gap-2 border border-[#EEEEEE] rounded-[14px] p-3">
                <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
                  <Image
                    source={require("@/assets/images/coffee-time.svg")}
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    contentFit="contain"
                  />
                </TouchableOpacity>

                <View>
                  <Text className="text-secondary dark:text-dark-secondary text-sm pb-3">
                    Break:
                  </Text>
                  <Text className="text-primary dark:text-dark-primary text-sm">
                    11:30 AM - 12:00 AM
                  </Text>
                </View>
              </View>
            </View>

            {/* right - location */}
            <View className="border border-[#EEEEEE] rounded-[14px] p-3 w-1/2">
              <View className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2 mb-1 w-[34px]">
                <Image
                  source={require("@/assets/images/location-icon.svg")}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  contentFit="contain"
                />
              </View>

              <View className="w-2/3">
                <Text className="text-secondary dark:text-dark-secondary text-sm pb-3">
                  Location:
                </Text>
                <Text className="text-primary dark:text-dark-primary text-sm">
                  136 Avenue Maciezine, New York, USA, 65004
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* quick actions */}
        <View className="mt-6">
          <Text className="text-xl font-proximanova-semibold mb-4">
            Quick Actions
          </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ActionIconCard
              icon={
                <FontAwesome6 name="calendar-times" size={24} color="#4FB2F3" />
              }
              title="Sick Leave"
              count={0}
            />

            <ActionIconCard
              icon={
                <MaterialCommunityIcons
                  name="clock-plus"
                  size={24}
                  color="#4FB2F3"
                />
              }
              title="Overwork"
              count={3}
            />

            <ActionIconCard
              icon={<Feather name="repeat" size={24} color="#4FB2F3" />}
              title="Swap Shift"
              count={40}
            />

            <ActionIconCard
              icon={<Ionicons name="document-text" size={24} color="#4FB2F3" />}
              title="Report Issue"
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShiftDetails;
