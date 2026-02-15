import { JobCardProps } from "@/types";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import StatusBadge from "../badges/StatusBadge";
import SecondaryButton from "../buttons/SecondaryButton";
import SmallButton from "../buttons/SmallButton";
import JobApplyModal from "../modals/JobApplyModal";

type JobCardVariant = "default" | "send_request" | "received" | "chatscreen";

const resolveVariant = (status?: string): JobCardVariant => {
  if (status === "send_request") return "send_request";
  if (status === "received") return "received";
  if (status === "chatscreen") return "chatscreen";
  return "default";
};

const ReceivedFooter = () => (
  <View className="flex-row items-center justify-between">
    <SecondaryButton
      title="View Details"
      textClass="text-[#4FB2F3]"
      iconBackground="bg-white"
      iconColor="#4FB2F3"
    />

    <View className="flex-row items-center gap-1.5">
      <View className="bg-[#E5F4FD] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
        <Ionicons name="chatbubbles" size={22} color="#4FB2F3" />
      </View>
      <Entypo name="circle-with-cross" size={40} color="#F34F4F" />
      <Ionicons name="checkmark-circle" size={40} color="#292D32" />
    </View>
  </View>
);

const DefaultFooter = ({
  applicationsCount,
  isSendRequest,
  onPressApply,
}: {
  applicationsCount: number;
  isSendRequest: boolean;
  onPressApply: () => void;
}) => (
  <View className="flex-row items-center justify-between">
    <View className="flex-row gap-1 items-center">
      <MaterialCommunityIcons name="note-text-outline" size={18} color="#7A7A7A" />
      <Text className="text-sm font-proximanova-regular text-secondary">
        {applicationsCount}
      </Text>
    </View>

    <Image
      source={require("@/assets/images/line-small.svg")}
      style={{
        width: 1,
        height: 18,
      }}
    />

    <View className="flex-row gap-1 items-center">
      <SimpleLineIcons name="share-alt" size={14} color="#7A7A7A" />
      <Text className="text-sm font-proximanova-regular text-secondary">209</Text>
    </View>

    <Image
      source={require("@/assets/images/line-small.svg")}
      style={{
        width: 1,
        height: 18,
      }}
    />

    {isSendRequest ? (
      <StatusBadge status="submitted" />
    ) : (
      <SmallButton className="w-28" title="Apply Now" onPress={onPressApply} />
    )}
  </View>
);

const JobCard = ({ className, status, job }: JobCardProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const variant = resolveVariant(status);
  const isChatVariant = variant === "chatscreen";

  const salarySuffix = useMemo(
    () => (job?.salaryType === "monthly" ? "/mo" : "/hr"),
    [job?.salaryType]
  );

  return (
    <View className={`${className} bg-[#E5F4FD] p-4 rounded-xl`}>
      <TouchableOpacity
        onPress={() => router.push("/screens/jobs/user/profile")}
        className="flex-row gap-2.5"
      >
        <Image
          source={
            job?.business?.logo ||
            "https://img.freepik.com/free-vector/elegant-luxury-hotel-logo_23-2147534418.jpg?semt=ais_hybrid&w=740&q=80"
          }
          style={{ width: 40, height: 40, borderRadius: 999 }}
          contentFit="cover"
        />

        <View>
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-1">
            {job?.name || "Maintanence Staff"}{" "}
            <MaterialCommunityIcons name="crown" size={14} color="#4FB2F3" />
          </Text>
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            {job?.business?.name || "Picko labs"}
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row items-center justify-between gap-20">
        <View className="flex-row items-center gap-1.5">
          <SimpleLineIcons name="location-pin" size={12} color="black" />
          <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
            {job?.business?.address || "New York, North Bergen"}
          </Text>
        </View>

        <View className="flex-row">
          <Text className="text-xl font-proximanova-semibold text-primary">
            {typeof job?.salaryMin === "number" && typeof job?.salaryMax === "number"
              ? `${job.salaryMin}-${job.salaryMax}`
              : "5-10"}
            $
          </Text>
          <Text className="text-lg font-proximanova-regular text-secondary">
            {salarySuffix}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-1.5 mt-2.5">
        <View
          className={`flex-row gap-1.5 items-center px-2.5 py-1 rounded-full ${isChatVariant ? "bg-[#F5F5F5]" : "bg-white"
            }`}
        >
          <MaterialIcons name="verified" size={16} color="#3090FF" />
          <Text className="text-xs font-proximanova-regular text-primary">Verified</Text>
        </View>

        <View
          className={`flex-row gap-1.5 items-center px-2.5 py-1 rounded-full ${isChatVariant ? "bg-[#F5F5F5]" : "bg-white"
            }`}
        >
          <FontAwesome name="star" size={16} color="#F1C400" />
          <Text className="text-xs font-proximanova-regular">4</Text>
        </View>

        <View
          className={`flex-row gap-1.5 items-center px-2.5 py-1 rounded-full ${isChatVariant ? "bg-[#F5F5F5]" : "bg-white"
            }`}
        >
          <Text className="text-xs font-proximanova-regular">Full Time</Text>
        </View>

        <View
          className={`flex-row gap-1.5 items-center px-2.5 py-1 rounded-full ${isChatVariant ? "bg-[#F5F5F5]" : "bg-white"
            }`}
        >
          <Text className="text-xs font-proximanova-regular">2km away</Text>
        </View>
      </View>

      {!isChatVariant && (
        <>
          <Image
            source={require("@/assets/images/dotted-line.svg")}
            style={{
              height: 1,
              width: "100%",
              marginVertical: 10,
            }}
            contentFit="contain"
          />

          {variant === "received" ? (
            <ReceivedFooter />
          ) : (
            <DefaultFooter
              applicationsCount={job?._count?.recruitmentApplications ?? 305}
              isSendRequest={variant === "send_request"}
              onPressApply={() => setShowModal(true)}
            />
          )}
        </>
      )}

      <JobApplyModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
};

export default JobCard;
