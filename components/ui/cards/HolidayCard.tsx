import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const HolidayCard = ({ shift }) => {
  return (
    <View>
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Feather name="check-circle" size={16} color="#10B981" />
          <Text className="ml-2 font-semibold text-green-700">
            {shift.title}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <View className="w-16 h-12 bg-green-100 rounded-lg mr-3 items-center justify-center">
          <MaterialIcons name="beach-access" size={20} color="#10B981" />
        </View>
        <Text className="text-gray-700 font-medium">{shift.subtitle}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image
            source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
            }}
          />

          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            {shift.company}
          </Text>
        </View>
        <Text className="text-sm text-gray-500">{shift.workTime}</Text>
      </View>
    </View>
  );
};

export default HolidayCard;
