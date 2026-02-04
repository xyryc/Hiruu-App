import HomeHeader from "@/components/header/HomeHeader";
import WelcomeHeader from "@/components/header/WelcomeHeader";
import AttendanceSummary from "@/components/layout/AttendanceSummary";
import BusinessProfile from "@/components/layout/BusinessProfile";
import BusinessSummary from "@/components/layout/BusinessSummary";
import EngagementPerks from "@/components/layout/EngagementPerks";
import FindNewJob from "@/components/layout/FindNewJob";
import JoinCollegue from "@/components/layout/JoinCollegue";
import PerformanceTrend from "@/components/layout/PerformanceTrend";
import ProfileProgress from "@/components/layout/ProfileProgress";
import QuickAction from "@/components/layout/QuickAction";
import TodayShiftsSummary from "@/components/layout/TodayShiftsSummary";
import TodaysShift from "@/components/layout/TodaysShift";
import TopPerformer from "@/components/layout/TopPerformer";
import Widgets from "@/components/layout/Widgets";
import WorkInsights from "@/components/layout/WorkInsights";
import ActionCard from "@/components/ui/cards/ActionCard";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserHome = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#BDE4F9" />

      {/* these sections will render dynamically based on permissions set by business */}
      <HomeHeader className="mt-2.5 mb-5" />

      <WelcomeHeader className="pb-5" />

      {/* main content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* profile progress */}
        <ProfileProgress />

        {/* join your collegues */}
        <JoinCollegue className="mt-7" />

        {/* find new job */}
        <FindNewJob className="mt-7" />

        {/* create business */}
        <BusinessProfile className="mt-7" />

        {/* your todays shift */}
        <TodaysShift className="mt-7" />

        {/* quick actions */}
        <QuickAction className="mt-7" />

        {/* work insights */}
        <WorkInsights className="mt-7" />

        {/* engagement & perks */}
        <EngagementPerks className="mt-7" />

        {/* widgets */}
        <Widgets className="mt-7" />

        {/* ============== merged ============= */}
        {/* profile progress */}
        {/* <ProfileProgress /> */}

        {/* Business Summary */}
        <BusinessSummary className="mt-8" />

        {/* Today’s Shifts Summary */}
        <TodayShiftsSummary />

        {/* Today’s Attendance Summary */}
        <AttendanceSummary className="mx-5 mt-8" />

        {/* join your collegues */}
        <JoinCollegue className="mt-7" />

        {/* do you  manage a business */}
        <BusinessProfile className="mt-7" />

        {/* See Employee rank on board */}
        <View className="mx-4 mt-7">
          <ActionCard
            onPress={() => router.push("/screens/home/leaderboard")}
            title="See Employee rank on board"
            buttonTitle="View"
            rightImage={require("@/assets/images/rank.svg")}
            imageClass="absolute bottom-0 right-2.5"
            imageWidth={144}
            imageHeight={95}
            background={require("@/assets/images/chessboard-bg.svg")}
          />
        </View>

        {/* performance trend */}
        <PerformanceTrend className="mt-7" />

        {/* quick actions */}
        <QuickAction className="mt-7" />

        {/* Team Insights */}
        <WorkInsights title="Team Insights" className="mt-7" />

        {/* job Board */}
        <FindNewJob business={true} className="mt-7" />

        {/* Top performers */}
        <TopPerformer className="mt-7" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserHome;
