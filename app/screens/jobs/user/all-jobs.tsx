import ScreenHeader from "@/components/header/ScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { useJobStore } from "@/stores/jobStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const loadJobs = useCallback(async (targetPage = 1, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const result = await getPublicRecruitments({
        page: targetPage,
        limit,
        isFeatured: true,
        search: search.trim() || undefined,
      });
      const fetched = (Array.isArray(result?.data) ? result.data : []).filter(
        (item: any) => item?.isActive === true
      );
      const nextPage = Number(result?.pagination?.page || targetPage);
      const nextTotalPages = Number(result?.pagination?.totalPages || 1);

      setJobs((prev) => {
        if (!append) return fetched;
        const merged = [...prev, ...fetched];
        return Array.from(new Map(merged.map((item: any) => [item?.id, item])).values());
      });
      setPage(nextPage);
      setTotalPages(nextTotalPages);
    } catch (error: any) {
      setJobs([]);
      toast.error(error?.message || "Failed to fetch exclusive jobs");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [getPublicRecruitments, search]);

  useFocusEffect(
    useCallback(() => {
      loadJobs(1, false);
    }, [loadJobs])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      loadJobs(1, false);
    }, 350);
    return () => clearTimeout(timer);
  }, [loadJobs, search]);

  const canLoadMore = page < totalPages;

  const handleLoadMore = async () => {
    if (!canLoadMore || isLoadingMore || isLoading) return;
    await loadJobs(page + 1, true);
  };

  const renderHeader = () => (
    <>
      <View className="flex-row items-center gap-1.5 mr-12 mt-3.5 px-5">
        <SearchBar onSearch={setSearch} />
        <TouchableOpacity onPress={() => router.push("/screens/jobs/user/filter")}>
          <Ionicons
            name="filter-circle"
            size={44}
            color={isDark ? "#fff" : "black"}
          />
        </TouchableOpacity>
      </View>

      <View className="mt-7 px-5">
        <Text className="text-xl font-proximanova-semibold text-primary dark:text-dark-primary mb-4">
          Exclusive Jobs
        </Text>
      </View>
    </>
  );

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

      {isLoading ? (
        <View className="py-10 items-center">
          <ActivityIndicator size="large" color={isDark ? "#fff" : "#111"} />
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => String(item?.id)}
          renderItem={({ item }) => (
            <View className="px-5">
              <JobCard
                job={item}
                className="bg-white border border-[#EEEEEE] mb-4"
              />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View className="px-5 pb-5">
              <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
                No exclusive jobs found.
              </Text>
            </View>
          }
          ListFooterComponent={
            isLoadingMore ? (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color={isDark ? "#fff" : "#111"} />
              </View>
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.35}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default AllJobs;
