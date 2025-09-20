import { StatCardSecondaryProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import SimpleStatusBadge from "../badges/SimpleStatusBadge";

const StatCardSecondary = ({ background }: StatCardSecondaryProps) => {
  return (
    <View className="flex-row justify-between border border-[#EEEEEE] rounded-xl overflow-hidden">
      <View className="px-4 py-5">
        <Text className="text-sm font-proximanova-regular text-secondary">
          Completed
        </Text>

        <View className="flex-row gap-2">
          <Text className="font-proximanova-bold text-2xl text-[#E74C69]">
            12%
          </Text>

          <Ionicons
            className="mt-1.5"
            name="arrow-down-circle-sharp"
            size={18}
            color="#E74C69"
          />
        </View>
      </View>

      <View className="justify-end">
        <SimpleStatusBadge
          className="absolute top-4 right-24 -rotate-12"
          title="On Time"
          textColor="#6998EF"
          bgColor="#E9F0FD"
        />

        <SimpleStatusBadge
          className="absolute top-2 right-2 rotate-6"
          title="Reliable"
          textColor="#3EBF5A"
          bgColor="#3EBF5A1F"
        />

        <SimpleStatusBadge
          className="absolute bottom-2 right-2.5"
          title="5-Star Feedback"
          textColor="#EAC324"
          bgColor="#EAC3241F"
        />
      </View>

      {/* background */}
      <View className="absolute -top-0 inset-x-0 items-center">
        <Image
          source={background}
          style={{
            width: 100,
            height: 120,
          }}
          contentFit="scale-down"
        />
      </View>
    </View>
  );
};

export default StatCardSecondary;
