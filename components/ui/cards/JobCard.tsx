import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import SmallButton from "../buttons/SmallButton";

const JobCard = ({ className }) => {
  return (
    <View className={`${className} bg-[#E5F4FD] p-4 rounded-xl`}>
      {/* name */}
      <View className="flex-row gap-2.5">
        <Image
          source="https://img.freepik.com/free-vector/elegant-luxury-hotel-logo_23-2147534418.jpg?semt=ais_hybrid&w=740&q=80"
          style={{ width: 40, height: 40, borderRadius: 999 }}
          contentFit="cover"
        />

        {/* top */}
        <View>
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-1">
            Maintanence Staff{" "}
            <MaterialCommunityIcons name="crown" size={14} color="#4FB2F3" />
          </Text>
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            Picko labs
          </Text>
        </View>
      </View>

      {/* location */}
      <View className="flex-row items-center justify-between gap-20">
        <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
          <SimpleLineIcons name="location-pin" size={12} color="black" />
          New York, North Bergen
        </Text>

        <View className="flex-row">
          <Text className="text-xl font-proximanova-semibold text-primary">
            5-10$
          </Text>
          <Text className="text-lg font-proximanova-regular text-secondary">
            /hr
          </Text>
        </View>
      </View>

      {/* badges */}
      <View className="flex-row gap-1.5 mt-2.5">
        <View className="flex-row gap-1.5 items-center px-2.5 py-1 bg-[#3F98FF4D] rounded-full">
          <MaterialIcons name="verified" size={16} color="#3090FF" />
          <Text className="text-xs font-proximanova-regular text-primary">
            Verified
          </Text>
        </View>

        <View className="flex-row gap-1.5 items-center px-2.5 py-1 bg-white rounded-full">
          <FontAwesome name="star" size={16} color="#F1C400" />
          <Text className="text-xs font-proximanova-regular">4</Text>
        </View>

        <View className="flex-row gap-1.5 items-center px-2.5 py-1 bg-white rounded-full">
          <Text className="text-xs font-proximanova-regular">Full Time</Text>
        </View>

        <View className="flex-row gap-1.5 items-center px-2.5 py-1 bg-white rounded-full">
          <Text className="text-xs font-proximanova-regular">2km away</Text>
        </View>
      </View>

      {/* line */}
      <Image
        source={require("@/assets/images/dotted-line.svg")}
        style={{
          height: 1,
          width: "100%",
          marginVertical: 10,
        }}
        contentFit="contain"
      />

      {/* stats button footer */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-1 items-center">
          <MaterialCommunityIcons
            name="note-text-outline"
            size={18}
            color="#7A7A7A"
          />
          <Text className="text-sm font-proximanova-regular text-secondary">
            305
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
          <Text className="text-sm font-proximanova-regular text-secondary">
            209
          </Text>
        </View>

        <Image
          source={require("@/assets/images/line-small.svg")}
          style={{
            width: 1,
            height: 18,
          }}
        />

        <SmallButton title="Apply Now" />
      </View>
    </View>
  );
};

export default JobCard;
