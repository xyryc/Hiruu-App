import ScreenHeader from "@/components/header/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BusinessSetup = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-[#BDE4F9]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      <LinearGradient colors={["#BDE4F9", "#F7F7F7"]} locations={[0, 0.38]}>
        <ScrollView className="px-5 h-screen" contentContainerClassName="pb-10">
          <ScreenHeader
            title="Create a business"
            onPressBack={() => router.back()}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BusinessSetup;
