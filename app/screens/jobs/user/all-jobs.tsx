import ScreenHeader from "@/components/header/ScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { useJobStore } from "@/stores/jobStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const AllJobs = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const getPublicRecruitments = useJobStore((s) => s.getPublicRecruitments);
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPublicRecruitments();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error: any) {
      setJobs([]);
      toast.error(error?.message || "Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  }, [getPublicRecruitments]);

  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, [loadJobs])
  );

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;
    const query = search.trim().toLowerCase();
    return jobs.filter(
      (item) =>
        item?.name?.toLowerCase()?.includes(query) ||
        item?.business?.name?.toLowerCase()?.includes(query) ||
        item?.business?.address?.toLowerCase()?.includes(query)
    );
  }, [jobs, search]);

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
          <SearchBar onSearch={setSearch} />
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

          {isLoading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" color={isDark ? "#fff" : "#111"} />
            </View>
          ) : filteredJobs.length === 0 ? (
            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              No jobs found.
            </Text>
          ) : (
            filteredJobs.map((item) => (
              <JobCard
                key={item?.id}
                job={item}
                className="bg-white border border-[#EEEEEE] mb-4"
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllJobs;
