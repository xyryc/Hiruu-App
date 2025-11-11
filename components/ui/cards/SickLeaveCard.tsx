import { LeaveItem } from "@/app/screens/home/shift/leave/leave-history";
import RejectionReasonModal from "@/components/ui/modals/RejectionReasonModal";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import StatusBadge from "../badges/StatusBadge";

// Render badge group dynamically

const SickLeaveCard = ({
  item,
  selectedCategory,
}: {
  item: LeaveItem;
  selectedCategory: any;
}) => {
  return (
    <View className="p-4 mx-5 mb-3 border border-gray-200 rounded-xl bg-gray-50">
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          <Image
            source={item.img}
            contentFit="contain"
            style={{ width: 30, height: 30 }}
          />
          <Text className="text-[#7A7A7A]">{item.name}</Text>
        </View>
        {selectedCategory === "all" && (
          <View className="flex-row gap-3 items-center">
            {["pending", "rejected"].includes(item.status) && (
              <View className="h-[30px] w-[30px] rounded-full bg-[#add5f0] justify-center items-center">
                <Feather name="message-circle" size={20} color="#4FB2F3" />
              </View>
            )}
            <StatusBadge status={item.status} />
          </View>
        )}
      </View>

      <View className="border-b-2 border-dashed border-gray-300/30 mt-4" />

      <View className="flex-row justify-between items-center mt-3">
        <View>
          <Text className="font-bold">{item.date}</Text>
          {item.duration && (
            <Text className="font-bold text-sm">{item.duration}</Text>
          )}
        </View>
        <Text className="px-3 py-1 bg-[#E5F4FD] rounded-3xl text-black">
          {item.coses}
        </Text>
      </View>

      <Text className="mt-3 text-[#7A7A7A] leading-5">{item.details}</Text>
      {item.status === "rejected" && (
        <View className="flex-row gap-1 mt-2.5">
          <RejectionReasonModal />
        </View>
      )}
    </View>
  );
};

export default SickLeaveCard;
