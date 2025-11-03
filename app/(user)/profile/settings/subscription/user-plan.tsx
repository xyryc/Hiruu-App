import ScreenHeader from "@/components/header/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserPlan = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectMontly, setSelectMontly] = useState(false);
  const [selectAnnualy, setSelectAnnuly] = useState(false);
  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="User Plan"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>
      <View className="mx-5 mt-8">
        <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
          Premium Benefits
        </Text>
        <View className="bg-[#F5F6FF] rounded-2xl px-4 py-3 mt-4">
          {/* text icon 1 */}
          <View className="flex-row gap-3">
            <View className="bg-[#4FB2F3] h-6 w-6 flex-row justify-center items-center rounded-full">
              <Feather name="check" size={14} color="white" />
            </View>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
              Profile pro customization (nameplates , gradient background)
            </Text>
          </View>

          {/* text icon 1 */}
          <View className="flex-row gap-3 mt-3">
            <View className="bg-[#4FB2F3] h-6 w-6 flex-row justify-center items-center rounded-full">
              <Feather name="check" size={14} color="white" />
            </View>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
              Premium mark
            </Text>
          </View>

          {/* text icon 1 */}
          <View className="flex-row gap-3 mt-3">
            <View className="bg-[#4FB2F3] h-6 w-6 flex-row justify-center items-center rounded-full">
              <Feather name="check" size={14} color="white" />
            </View>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
              Export CV as PDF with AI with verified experience from our
              platform
            </Text>
          </View>
        </View>
        <Text className="font-proximanova-semibold text-xl text-primary mt-8 dark:text-dark-primary">
          Choose your Plan
        </Text>
        <View>
          {/*  */}
          <TouchableOpacity
            onPress={() => setSelectMontly(!selectMontly)}
            className={` ${selectMontly && "bg-[#5b60bb]"} flex-row justify-between border border-[#EEEEEE] px-4 py-7 mt-4 rounded-2xl`}
          >
            <View className="flex-row gap-3">
              <View
                className={`h-6 w-6 flex-row justify-center items-center ${selectMontly ? "bg-[#4FB2F3] rounded-full" : "border rounded-full"} `}
              >
                {selectMontly && (
                  <Feather name="check" size={14} color="white" />
                )}
              </View>
              <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
                Monthly Plan
              </Text>
            </View>
            <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
              $14
            </Text>
          </TouchableOpacity>

          {/*  */}
          <TouchableOpacity
            onPress={() => setSelectAnnuly(!selectAnnualy)}
            className={` ${selectAnnualy && "bg-[#5b60bb]"} flex-row justify-between border border-[#EEEEEE] px-4 py-7 mt-4 rounded-2xl`}
          >
            <View className="flex-row gap-3">
              <View
                className={`h-6 w-6 flex-row justify-center items-center ${selectAnnualy ? "bg-[#4FB2F3] rounded-full" : "border rounded-full"} `}
              >
                {selectAnnualy && (
                  <Feather name="check" size={14} color="white" />
                )}
              </View>
              <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
                Annual Plan
              </Text>
            </View>
            <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
              $120
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserPlan;
