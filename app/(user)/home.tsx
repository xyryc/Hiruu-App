import HomeHeader from "@/components/layout/HomeHeader";
import WelcomeHeader from "@/components/layout/WelcomeHeader";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserHome = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#BDE4F9" />

      <HomeHeader className="mt-2.5 mb-5" />

      <WelcomeHeader />

      {/* main content */}
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default UserHome;
