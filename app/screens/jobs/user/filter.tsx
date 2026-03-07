import ScreenHeader from "@/components/header/ScreenHeader";
import SimpleStatusBadge from "@/components/ui/badges/SimpleStatusBadge";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import RoleSlotsInput from "@/components/ui/inputs/RoleSlotsInput";
import { useJobStore } from "@/stores/jobStore";
import type { RecruitmentSortBy } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FindJobFilters = () => {
  const params = useLocalSearchParams<{
    from?: string;
    page?: string;
    limit?: string;
    shiftType?: string;
    jobTypes?: string;
    maxSalary?: string;
    location?: string;
    maxDistanceKm?: string;
    sortBy?: RecruitmentSortBy;
    search?: string;
  }>();
  const router = useRouter();
  const setAllJobsFilters = useJobStore((s) => s.setAllJobsFilters);
  const currentLimit = Number(params.limit ?? 10);
  const initialMaxSalary = Number(params.maxSalary ?? 10000);
  const initialDistance = Number(params.maxDistanceKm ?? 25);

  const [postCode, setPostCode] = useState(params.location ?? "");
  const [distance, setDistance] = useState(Number.isFinite(initialDistance) ? initialDistance : 25);
  const [salaryRange, setSalaryRange] = useState(
    Number.isFinite(initialMaxSalary) ? initialMaxSalary : 10000
  );
  const [jobCategory, setJobCategory] = useState(params.search ?? "");

  const toLabelCase = (value: string) => {
    return value
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const sortLabelToValue: Record<string, RecruitmentSortBy> = {
    Newest: "newest",
    "Highest Rated": "highest_rating",
    "Most Experience": "most_experience",
    "Best Fit": "best_fit",
  };
  const sortValueToLabel: Record<RecruitmentSortBy, string> = {
    newest: "Newest",
    highest_rating: "Highest Rated",
    most_experience: "Most Experience",
    best_fit: "Best Fit",
  };
  const sortOptions = Object.keys(sortLabelToValue);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    params.sortBy ? sortValueToLabel[params.sortBy] : null
  );

  const handleOptionPress = (option: string) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };
  const isSelected = (option: string) => {
    return selectedOption === option;
  };

  const shiftOptions = ["Onsite", "Remote", "Hybrid"];
  const [selectedShiftOption, setSelectedShiftOption] = useState<string | null>(
    params.shiftType ? toLabelCase(params.shiftType) : null
  );

  const handleShiftOptionPress = (option: string) => {
    setSelectedShiftOption((prev) => (prev === option ? null : option));
  };

  const isSelectedShift = (option: string) => {
    return selectedShiftOption === option;
  };

  const badgeToValue: Record<string, string> = {
    "Full Time": "full_time",
    "Part Time": "part_time",
    Hourly: "hourly",
    Contract: "contract",
    Freelance: "freelance",
    Internship: "internship",
  };

  const initialSelectedBadges = (params.jobTypes || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((value) =>
      Object.entries(badgeToValue).find(([, mapped]) => mapped === value)?.[0]
    )
    .filter((item): item is string => Boolean(item));

  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const badgeOptions = [
    "Full Time",
    "Part Time",
    "Hourly",
    "Contract",
    "Freelance",
    "Internship",
  ];

  React.useEffect(() => {
    if (initialSelectedBadges.length > 0) {
      setSelectedBadges(initialSelectedBadges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBadgePress = (badgeTitle: string) => {
    setSelectedBadges((prev) => {
      if (prev.includes(badgeTitle)) {
        // Deselect if already selected
        return prev.filter((title) => title !== badgeTitle);
      } else {
        // Select new badge
        return [...prev, badgeTitle];
      }
    });
  };
  const isBadgeSelected = (badgeTitle: string) => {
    return selectedBadges.includes(badgeTitle);
  };

  const handleApplyFilters = () => {
    const sortBy = selectedOption ? sortLabelToValue[selectedOption] : undefined;
    const shiftType = selectedShiftOption?.toLowerCase();
    const jobTypes = selectedBadges
      .map((badge) => badgeToValue[badge])
      .filter(Boolean)
      .join(",");
    const nextSearch = jobCategory.trim();
    const nextFilters = {
      page: 1,
      limit: Number.isFinite(currentLimit) ? currentLimit : 10,
      shiftType: shiftType || undefined,
      jobTypes: jobTypes || undefined,
      maxSalary: Math.round(salaryRange) < 10000 ? Math.round(salaryRange) : undefined,
      location: postCode.trim() || undefined,
      maxDistanceKm: postCode.trim() ? Math.round(distance) : undefined,
      sortBy: sortBy || undefined,
      search: nextSearch || undefined,
    };

    setAllJobsFilters(nextFilters);

    if (params.from === "all-jobs") {
      router.back();
      return;
    }

    router.navigate("/screens/jobs/user/all-jobs");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "bottom", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <ScreenHeader
        title="Find Job Filters"
        className="mx-5"
        onPressBack={() => router.back()}
      />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View className="pt-7">
          <Text className="text-base font-proximanova-semibold text-primary mb-4">
            Search
          </Text>

          <TextInput
            value={jobCategory}
            onChangeText={setJobCategory}
            placeholder="Search jobs..."
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-proximanova-regular"
          />
        </View>

        {/* Sort by */}
        <View className="mt-7">
          <Text className="text-base font-proximanova-semibold text-primary mb-4">
            Sort by
          </Text>

          <View className="flex-row flex-wrap gap-2.5">
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className="flex-row items-center justify-between gap-1.5"
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
              >
                {isSelected(option) ? (
                  <Ionicons name="checkmark-circle" size={24} color="#11293A" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#7A7A7A" />
                )}

                <Text className="text-sm font-proximanova-regular">
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View className="mt-7">
          <Text className="text-base font-proximanova-semibold text-primary mb-4">
            Location
          </Text>

          <View className="flex-row items-center bg-white border border-[#EEEEEE] rounded-lg px-4 py-3">
            <TextInput
              value={postCode}
              onChangeText={setPostCode}
              placeholder="Post Code"
              className="flex-1 font-proximanova-semibold text-sm"
            />
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color="#666"
            />
          </View>
          <Slider
            value={distance}
            onValueChange={setDistance}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#4FB2F3"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#EEEEEE"
            className="mt-1"
          />
          <Text className="text-sm font-proximanova-regular text-secondary mt-1">
            5km From Post Code
          </Text>
        </View>

        {/* Shift Type */}
        <View className="py-5 border-b border-gray-100">
          <Text className="text-base font-proximanova-semibold text-primary mb-3">
            Shift Type
          </Text>

          <View className="flex-row gap-2.5">
            {shiftOptions.map((option) => (
              <TouchableOpacity
                key={option}
                className="flex-row items-center justify-between gap-1.5"
                onPress={() => handleShiftOptionPress(option)}
                activeOpacity={0.7}
              >
                {isSelectedShift(option) ? (
                  <Ionicons name="checkmark-circle" size={24} color="#11293A" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#7A7A7A" />
                )}

                <Text className="text-sm font-proximanova-regular">
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Job Type */}
        <View className="mt-7">
          <Text className="text-base font-proximanova-semibold text-primary mb-3">
            Job Type
          </Text>
          <View className="flex-row flex-wrap gap-2.5">
            {badgeOptions.map((badgeTitle) => (
              <SimpleStatusBadge
                key={badgeTitle}
                title={badgeTitle}
                className={`border ${
                  isBadgeSelected(badgeTitle) ? "" : "border-[#EEEEEE]"
                }`}
                bgColor={isBadgeSelected(badgeTitle) ? "#11293A" : "#FFFFFF"}
                textColor={isBadgeSelected(badgeTitle) ? "#FFFFFF" : "#111111"}
                onPress={() => handleBadgePress(badgeTitle)}
              />
            ))}
          </View>
        </View>

        {/* Salary Range */}
        <View className="py-5 border-b border-gray-100">
          <Text className="text-base font-proximanova-semibold text-primary mb-3">
            Salary Range
          </Text>
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            minimumValue={0}
            maximumValue={10000}
            minimumTrackTintColor="#4FB2F3"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#EEEEEE"
          />
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs font-proximanova-regular text-gray-500">
              $0
            </Text>
            <Text className="text-xs font-proximanova-regular text-gray-500">
              ${salaryRange.toFixed(0)}
            </Text>
            <Text className="text-xs font-proximanova-regular text-gray-500">
              $10000
            </Text>
          </View>
        </View>

        {/* Experience Level */}
        <View className="py-5 mb-5">
          <Text className="text-base font-proximanova-semibold text-primary mb-3">
            Experience Level
          </Text>

          <RoleSlotsInput />
        </View>
      </ScrollView>

      {/* button */}
      <View className="mx-5 pt-5">
        <PrimaryButton title="Apply Filters" onPress={handleApplyFilters} />
      </View>
    </SafeAreaView>
  );
};

export default FindJobFilters;
