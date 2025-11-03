import ScreenHeader from "@/components/header/ScreenHeader";
import GradientButton from "@/components/ui/buttons/GradientButton";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserPlan = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual" | null>(
    null
  );

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
      <View className="flex-1 mx-5 mt-8">
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

          {/* text icon 2 */}
          <View className="flex-row gap-3 mt-3">
            <View className="bg-[#4FB2F3] h-6 w-6 flex-row justify-center items-center rounded-full">
              <Feather name="check" size={14} color="white" />
            </View>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
              Premium mark
            </Text>
          </View>

          {/* text icon 3 */}
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
          {/* Monthly Plan */}
          <TouchableOpacity
            onPress={() =>
              setSelectedPlan(selectedPlan === "monthly" ? null : "monthly")
            }
            className={`${selectedPlan === "monthly" && "bg-[#a59de9] border-[#4E57FF]"} flex-row justify-between border border-[#EEEEEE] px-4 py-7 mt-4 rounded-2xl`}
          >
            <View className="flex-row gap-3">
              <View
                className={`h-6 w-6 flex-row justify-center items-center ${selectedPlan === "monthly" ? "bg-[#4FB2F3] rounded-full" : "border rounded-full"}`}
              >
                {selectedPlan === "monthly" && (
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

          {/* Annual Plan */}
          <TouchableOpacity
            onPress={() =>
              setSelectedPlan(selectedPlan === "annual" ? null : "annual")
            }
            className={`${selectedPlan === "annual" && "bg-[#4fb1f333] border-[#4E57FF] "} flex-row justify-between border border-[#EEEEEE] px-4 py-7 mt-4 rounded-2xl`}
          >
            <View className="flex-row gap-3">
              <View className="absolute bottom-10 py-0.5 px-3 bg-[#4FB2F3] rounded-3xl">
                <Text className="font-proximanova-semibold text-sm text-[#FFFFFF]">
                  Featured
                </Text>
              </View>
              <View
                className={`h-6 w-6 flex-row justify-center items-center ${selectedPlan === "annual" ? "bg-[#4FB2F3] rounded-full" : "border rounded-full"}`}
              >
                {selectedPlan === "annual" && (
                  <Feather name="check" size={14} color="white" />
                )}
              </View>
              <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
                Annual Plan
              </Text>
            </View>
            <View className="flex-row gap-1.5">
              <View className="px-2 items-center justify-center bg-yellow-500 rounded-lg">
                <Text className="font-proximanova-semibold text-sm ">
                  17% OFF
                </Text>
              </View>
              <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
                <Text className="line-through font-proximanova-regular">
                  $144
                </Text>{" "}
                $120
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section - Subscription Text and Button */}
      <View className="mx-5 mb-6">
        {/* Subscription Text */}
        <Text className="text-center text-secondary dark:text-dark-secondary text-sm mb-4">
          subscription auto-renews until manually cancelled.
        </Text>

        {/* Subscribe Button */}
        <GradientButton
          title="Suscribe Now"
          icon={<FontAwesome6 name="crown" size={18} color="#FFFFFF" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserPlan;
