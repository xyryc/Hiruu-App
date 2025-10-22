import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const JobCard = () => {
  return (
    <View className="bg-[#E5F4FD] border">
      <View className="flex-row gap-2.5">
        <Image
          source="https://img.freepik.com/free-vector/elegant-luxury-hotel-logo_23-2147534418.jpg?semt=ais_hybrid&w=740&q=80"
          style={{ width: 40, height: 40, borderRadius: 999 }}
          contentFit="cover"
        />

        <View>
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-1">
            Maintanence Staff
          </Text>
          <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
            Picko labs
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
