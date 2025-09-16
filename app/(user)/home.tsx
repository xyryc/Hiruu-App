import BusinessProfile from "@/components/layout/BusinessProfile";
import FindNewJob from "@/components/layout/FindNewJob";
import HomeHeader from "@/components/layout/HomeHeader";
import JoinCollegue from "@/components/layout/JoinCollegue";
import ProfileProgress from "@/components/layout/ProfileProgress";
import WelcomeHeader from "@/components/layout/WelcomeHeader";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserHome = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#BDE4F9" />

      <HomeHeader className="mt-2.5 mb-5" />

      <WelcomeHeader />

      {/* main content */}
      <ScrollView>
        {/* profile progress */}
        <ProfileProgress className="mt-7" />

        {/* join your collegues */}
        <JoinCollegue className="mt-7" />

        {/* find new job */}
        <FindNewJob className="mt-7" />

        {/* do you  manage a business */}
        <BusinessProfile className="mt-7" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserHome;
