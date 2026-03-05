import TitleHeader from "@/components/header/TitleHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useAuthStore } from "@/stores/authStore";
import { translateApiMessage } from "@/utils/apiMessages";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { t } from "i18next";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading, clearError } = useAuthStore();

  const handleForgotPassword = async () => {
    clearError();

    if (!email) {
      toast.error(t("validation.fillAllFields"));
      return;
    }

    if (!email.includes("@")) {
      toast.error(t("validation.invalidEmail"));
      return;
    }

    try {
      const result = await forgotPassword({ email: email.trim().toLowerCase() });
      if (result?.success) {
        toast.success(translateApiMessage(result?.message || "otp_password_reset_sent"));
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email: email.trim().toLowerCase() },
        });
      }
    } catch (error: any) {
      const messageKey = error?.message || "UNKNOWN_ERROR";
      toast.error(translateApiMessage(messageKey));
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#BDE4F9]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      <LinearGradient colors={["#BDE4F9", "#F7F7F7"]} locations={[0, 0.38]}>
        <ScrollView className="px-5 h-screen" contentContainerClassName="pb-10">
          <TitleHeader
            className="mt-[71px] mb-7"
            title="Forgot Password"
            subtitle="Enter your email and we'll send an OTP to reset your password."
          />

          <View className="relative mb-4">
            <View className="absolute left-4 top-3 z-10">
              <Ionicons name="mail-outline" size={24} color="#4FB2F3" />
            </View>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              className="w-full pl-12 pr-4 py-4 bg-white border border-[#EEEEEE] rounded-xl text-[#7A7A7A]"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <PrimaryButton
            className="w-full mt-2"
            title={isLoading ? "Sending OTP..." : "Send OTP"}
            onPress={handleForgotPassword}
            loading={isLoading}
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-[#666666]">Back to</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-sm font-proximanova-semibold underline px-2">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-3 left-5 z-10"
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPassword;
