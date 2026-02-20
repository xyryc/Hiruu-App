import ScreenHeader from "@/components/header/ScreenHeader";
import JobRequestCard from "@/components/ui/cards/JobRequestCard";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { useBusinessStore } from "@/stores/businessStore";
import { useJobStore } from "@/stores/jobStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const JobRequest = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabs = ["send request", "received"];
  const [isActive, setIsActive] = useState("send request");

  const [sentApps, setSentApps] = useState<any[]>([]);
  const [receivedApps, setReceivedApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedBusinesses = useBusinessStore((s) => s.selectedBusinesses);
  const getMyApplications = useJobStore((s) => s.getMyApplications);
  const getReceivedApplications = useJobStore((s) => s.getReceivedApplications);

  const businessId = selectedBusinesses[0];

  const loadApplications = useCallback(async () => {
    try {
      setIsLoading(true);
      const [sent, received] = await Promise.all([
        getMyApplications(),
        businessId ? getReceivedApplications(businessId) : Promise.resolve([]),
      ]);
      setSentApps(sent);
      setReceivedApps(received);
    } catch (error: any) {
      toast.error(error?.message || "Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  }, [getMyApplications, getReceivedApplications, businessId]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filteredData = useMemo(() => {
    const list = isActive === "send request" ? sentApps : receivedApps;
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return list.filter((item: any) => {
      const jobName = item?.recruitment?.role?.role?.name || item?.recruitment?.name || "";
      const businessName = item?.recruitment?.business?.name || "";
      const applicantName = item?.user?.name || "";

      return (
        jobName.toLowerCase().includes(query) ||
        businessName.toLowerCase().includes(query) ||
        applicantName.toLowerCase().includes(query)
      );
    });
  }, [isActive, sentApps, receivedApps, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-[#E5F4FD] dark:bg-dark-background">
      {/* Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-5 pb-4 pt-2.5 rounded-b-3xl bg-[#E5F4FD] overflow-hidden"
        title="Job Request"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111111"}
        components={
          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/hiruu-coin.svg")}
              style={{
                width: 32,
                height: 32,
              }}
              contentFit="contain"
            />
            <View className="px-4 py-2 bg-white -ml-3 -z-10 rounded-r-[40px]">
              <Text className="text-sm font-proximanova-semibold">540</Text>
            </View>
          </View>
        }
      />

      <View className="flex-row justify-center mx-5">
        {tabs.map((tab, index) => {
          const count = tab === "send request" ? sentApps.length : receivedApps.length;
          return (
            <TouchableOpacity
              key={index}
              className={`w-1/2 flex-row items-center justify-center gap-2 border-b pb-2 ${isActive === tab && "border-[#11293A] border-b-2"
                }`}
              onPress={() => setIsActive(tab)}
            >
              <Text
                className={`text-center capitalize ${isActive === tab
                  ? "font-proximanova-semibold text-primary dark:text-dark-primary"
                  : "font-proximanova-regular text-secondary dark:text-dark-secondary"
                  } `}
              >
                {tab}
              </Text>

              <View className="w-6 h-6 bg-[#4FB2F3] rounded-full items-center justify-center">
                <Text className="font-proximanova-semibold text-sm text-white">
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white px-5 pt-5"
      >
        <SearchBar onSearch={setSearchQuery} className="mb-4" />

        {isLoading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#4FB2F3" />
            <Text className="mt-4 font-proximanova-regular text-secondary">
              Loading requests...
            </Text>
          </View>
        ) : filteredData.length > 0 ? (
          filteredData.map((item: any) => (
            <JobRequestCard
              key={item.id}
              job={item.recruitment}
              className="bg-white border border-[#EEEEEE] mb-4"
              status={isActive as "send request" | "received"}
            />
          ))
        ) : (
          <View className="py-20 items-center justify-center">
            <Text className="font-proximanova-regular text-secondary">
              No {isActive} found.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobRequest;
