import ScreenHeader from "@/components/header/ScreenHeader";
import SimpleStatusBadge from "@/components/ui/badges/SimpleStatusBadge";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import JobApplyModal from "@/components/ui/modals/JobApplyModal";
import { useJobStore } from "@/stores/jobStore";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const JobProfile = () => {
  const { businessId, recruitmentId } = useLocalSearchParams<{
    businessId?: string;
    recruitmentId?: string;
  }>();
  const getRecruitmentById = useJobStore((s) => s.getRecruitmentById);

  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadJobDetails = useCallback(async () => {
    if (!businessId || !recruitmentId) {
      setJob(null);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getRecruitmentById(String(businessId), String(recruitmentId));
      setJob(data || null);
    } catch (error: any) {
      setJob(null);
      toast.error(error?.message || "Failed to load job details");
    } finally {
      setIsLoading(false);
    }
  }, [businessId, getRecruitmentById, recruitmentId]);

  useFocusEffect(
    useCallback(() => {
      loadJobDetails();
    }, [loadJobDetails])
  );

  const salaryLabel = useMemo(() => {
    if (
      typeof job?.salaryMin === "number" &&
      typeof job?.salaryMax === "number" &&
      job?.salaryType
    ) {
      const suffix = job.salaryType === "monthly" ? "/mo" : "/hr";
      return `${job.salaryMin}-${job.salaryMax}$${suffix}`;
    }
    return "-";
  }, [job?.salaryMax, job?.salaryMin, job?.salaryType]);
  const socialLinks = useMemo(() => {
    const social = job?.business?.social || {};
    return Object.entries(social)
      .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
      .map(([key, value]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: String(value),
      }));
  }, [job?.business?.social]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check this job on Hiruu: ${job?.role?.role?.name || "Job"}\nID: ${
          job?.id || "-"
        }`,
        title: "Job Posting",
      });
    } catch {
      toast.error("Could not share job");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScreenHeader
          className="px-5 pt-2.5"
          title="Job Details"
          onPressBack={() => router.back()}
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!job) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScreenHeader
          className="px-5 pt-2.5"
          title="Job Details"
          onPressBack={() => router.back()}
        />
        <View className="flex-1 px-5 pt-8">
          <Text className="text-sm text-secondary">Job details not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScreenHeader
        className="px-5 pt-2.5"
        title="Job Details"
        onPressBack={() => router.back()}
        components={
          <TouchableOpacity onPress={handleShare} className="p-2 bg-[#F5F5F5] rounded-full">
            <MaterialCommunityIcons name="share-variant" size={20} color="#111" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        <View className="flex-row items-center gap-3 mt-4">
          <Image
            source={job?.business?.logo || require("@/assets/images/placeholder.png")}
            style={{ width: 52, height: 52, borderRadius: 999 }}
            contentFit="cover"
          />
          <View className="flex-1">
            <Text className="font-proximanova-semibold text-primary text-base">
              {job?.role?.role?.name || "-"}{" "}
              {job?.isFeatured ? (
                <MaterialCommunityIcons name="crown" size={14} color="#4FB2F3" />
              ) : null}
            </Text>
            <Text className="text-sm text-secondary">{job?.business?.name || "-"}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-3">
          <SimpleLineIcons name="location-pin" size={12} color="#7A7A7A" />
          <Text className="text-sm text-secondary ml-1">
            {job?.business?.address || "-"}
          </Text>
          {typeof job?.distanceKm === "number" ? (
            <Text className="text-xs font-proximanova-semibold text-[#4FB2F3] ml-2">
              {job.distanceKm.toFixed(2)} km
            </Text>
          ) : null}
        </View>

        <Text className="font-proximanova-semibold text-xl text-primary mt-6">
          Job Description
        </Text>
        <Text className="text-sm text-secondary mt-2">
          {job?.description || "-"}
        </Text>

        <Text className="font-proximanova-semibold text-xl text-primary mt-6">
          Required Skills
        </Text>
        <View className="flex-row flex-wrap gap-2.5 mt-3">
          {(Array.isArray(job?.requiredSkills) ? job.requiredSkills : []).length === 0 ? (
            <SimpleStatusBadge title="No specific skills listed" bgColor="#F5F5F5" />
          ) : (
            (job.requiredSkills as string[]).map((skill, index) => (
              <SimpleStatusBadge key={`${skill}-${index}`} title={skill} bgColor="#F5F5F5" />
            ))
          )}
        </View>

        <Text className="font-proximanova-semibold text-xl text-primary mt-6">Key Info</Text>
        <View className="flex-row flex-wrap gap-2.5 mt-3">
          <SimpleStatusBadge title={`Role: ${job?.role?.role?.name || "-"}`} bgColor="#F5F5F5" />
          <SimpleStatusBadge title={`Gender: ${job?.gender || "-"}`} bgColor="#F5F5F5" />
          <SimpleStatusBadge
            title={`Experience: ${job?.experience || "-"} Year(s)`}
            bgColor="#F5F5F5"
          />
          <SimpleStatusBadge
            title={`Age: ${job?.ageMin ?? "-"}-${job?.ageMax ?? "-"}`}
            bgColor="#F5F5F5"
          />
          <SimpleStatusBadge
            title={`Shift: ${job?.shiftStartTime || "-"} - ${job?.shiftEndTime || "-"}`}
            bgColor="#F5F5F5"
          />
          <SimpleStatusBadge title={`Salary: ${salaryLabel}`} bgColor="#F5F5F5" />
          <SimpleStatusBadge
            title={`Distance: ${
              typeof job?.distanceKm === "number" ? `${job.distanceKm.toFixed(2)} km` : "-"
            }`}
            bgColor="#F5F5F5"
          />
          <SimpleStatusBadge
            title={`Applications: ${job?._count?.recruitmentApplications ?? 0}`}
            bgColor="#F5F5F5"
          />
        </View>

        <Text className="font-proximanova-semibold text-xl text-primary mt-6">
          Hiring Manager
        </Text>
        <View className="mt-3 border border-[#EEEEEE] rounded-xl p-3 flex-row items-center gap-3">
          <Image
            source={job?.postedBy?.avatar || require("@/assets/images/placeholder.png")}
            style={{ width: 44, height: 44, borderRadius: 999 }}
            contentFit="cover"
          />
          <View className="flex-1">
            <Text className="font-proximanova-semibold text-primary">
              {job?.postedBy?.name || "-"}
            </Text>
            <Text className="text-sm text-secondary mt-1">{job?.postedBy?.email || "-"}</Text>
          </View>
        </View>

        <Text className="font-proximanova-semibold text-xl text-primary mt-6">
          Contact Us On
        </Text>
        <View className="mt-3 border border-[#EEEEEE] rounded-xl p-3">
          {socialLinks.length === 0 ? (
            <Text className="text-sm text-secondary">No social links available.</Text>
          ) : (
            socialLinks.map((item) => (
              <View
                key={item.key}
                className="flex-row items-center justify-between py-2 border-b border-[#F2F2F2]"
              >
                <Text className="font-proximanova-semibold text-primary">{item.label}</Text>
                <Text className="text-sm text-secondary flex-1 text-right">{item.value}</Text>
              </View>
            ))
          )}
        </View>

        <PrimaryButton
          className="mt-8"
          title="Apply This Job"
          onPress={() => setShowModal(true)}
        />
      </ScrollView>

      <JobApplyModal visible={showModal} onClose={() => setShowModal(false)} />
    </SafeAreaView>
  );
};

export default JobProfile;
