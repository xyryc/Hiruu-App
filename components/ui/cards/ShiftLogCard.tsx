import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const ShiftLogCard = () => {
  return (
    <View className=" mt-4 border-hairline border-[#7a6b6b] p-4 rounded-xl">
      <View className="flex-row gap-4">
        <Ionicons name="calendar" size={22} color="#4FB2F3" />
        <Text className="font-proximanova-semibold text-base text-primary dark:text-dark-primary">
          Mon, 10 june 2025(today)
        </Text>
      </View>
      <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary mt-1.5">
        Working Hours (10:00 - 18:00)
      </Text>

      <View>
        <Image
          source={require("@/assets/images/dotted-line.svg")}
          contentFit="contain"
          style={{ width: 360, height: 2, marginTop: 10 }}
        />
      </View>

      <View className="flex-row justify-around items-center mt-2.5">
        <View>
          <Text className="text-center text-sm font-proximanova-semibold text-secondary dark:text-dark-secondary mb-1">
            Start Time
          </Text>
          <Text className="text-center text-lg font-proximanova-semibold text-primary dark:text-dark-primary">
            10:00
          </Text>
        </View>

        <View className="border-b border-secondary w-32 relative">
          <View className="absolute -top-0.5 left-0 h-1 w-1 bg-secondary rounded-full" />
          <View className="absolute -top-0.5 right-0 h-1 w-1 bg-secondary rounded-full" />
        </View>

        <View>
          <Text className="text-center text-sm font-proximanova-semibold text-secondary dark:text-dark-secondary mb-1">
            End Time
          </Text>
          <Text className="text-center text-lg font-proximanova-semibold text-primary dark:text-dark-primary">
            10:00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShiftLogCard;
