import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import StatusBadge from "../badges/StatusBadge";

const AttendanceLogCard = ({
  startTime,
  endTime,
  totalWorkTime,
  workTimeColor,
  status,
  statusLabel,
}: any) => {
  return (
    <View className="mt-3 p-4 border-hairline border-secondary dark:border-dark-secondary rounded-xl">
      <View className="flex-row justify-between">
        <View className="flex-row justify-between gap-5">
          <View>
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              Start Time
            </Text>
            <Text className="font-proximanova-semibold text-base text-primary dark:text-dark-primary">
              {startTime}
            </Text>
          </View>
          <View className="border-r-hairline border-secondary dark:border-dark-secondary" />
          <View>
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              Start Time
            </Text>
            <Text className="font-proximanova-semibold text-base text-primary dark:text-dark-primary">
              {endTime}
            </Text>
          </View>
        </View>

        <View>
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            Working Time
          </Text>
          <Text
            className={`font-proximanova-semibold text-base text-[${workTimeColor}] `}
          >
            {totalWorkTime}
          </Text>
        </View>
      </View>
      <View className="border-b-hairline border-secondary dark:border-dark-secondary mt-2" />
      <View className="mt-2 flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          <Image
            source="https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg"
            contentFit="contain"
            style={{ height: 30, width: 30 }}
          />
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            Space Hotel
          </Text>
        </View>

        {status && <StatusBadge status={status} label={statusLabel} />}
      </View>
    </View>
  );
};

export default AttendanceLogCard;
