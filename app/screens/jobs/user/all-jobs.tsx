import ScreenHeader from "@/components/header/ScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllJobs = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right"]}
    >
      <ScreenHeader
        className="px-5 pt-2.5"
        onPressBack={() => router.back()}
        title="All Jobs"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111"}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-1.5 mr-12 mt-3.5 px-5">
          <SearchBar />
          <TouchableOpacity
            onPress={() => router.push("/screens/jobs/user/filter")}
          >
            <Ionicons
              name="filter-circle"
              size={44}
              color={isDark ? "#fff" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View className="mt-7 px-5 pb-5">
          <Text className="text-xl font-proximanova-semibold text-primary dark:text-dark-primary mb-4">
            Jobs
          </Text>

          <JobCard className="bg-white border border-[#EEEEEE] mb-4" />
          <JobCard className="bg-white border border-[#EEEEEE] mb-4" />
          <JobCard className="bg-white border border-[#EEEEEE] mb-4" />
          <JobCard className="bg-white border border-[#EEEEEE] mb-4" />
          <JobCard className="bg-white border border-[#EEEEEE] mb-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllJobs;

