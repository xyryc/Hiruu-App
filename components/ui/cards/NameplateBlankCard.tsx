import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NameplateBlankCard = ({ title, color, bgColor, className, modalHandle }: any) => {
  return (
    <TouchableOpacity onPress={modalHandle} className={`mx-5 ${className}`}>
      <Text className="font-proximanova-semibold text-primary dark:text-dark-primary">
        {title}
      </Text>
      <View
        className="w-full mt-2.5 rounded-xl z-20"
        style={{ backgroundColor: bgColor }}
      >
        {/* Timer Section */}
        <View className="items-center justify-center">
          <Image
            source={require("@/assets/images/timer-bg.svg")}
            contentFit="contain"
            style={{ width: 200, height: 34, marginTop: -2 }}
          />
          <View className="absolute inset-0 flex-row items-center justify-center">
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary">
              Available for
            </Text>
            <MaterialCommunityIcons
              name="timer-sand"
              size={16}
              color={bgColor}
              style={{ marginHorizontal: 4 }}
            />
            <Text
              className="font-proximanova-semibold"
              style={{ color: color }}
            >
              1d, 10h
            </Text>
          </View>
        </View>

        {/* Bottom section */}
        <View className="flex-row items-center justify-between mx-2.5 my-5 gap-3">
          <View
            className="rounded-full"
            style={{
              backgroundColor: color,
              padding: 6,
            }}
          >
            <Ionicons name="person" size={34} color={bgColor} />
          </View>

          <View
            className="rounded-[30px]"
            style={{
              backgroundColor: color,
              height: 14,
              width: 150,
            }}
          />

          <View className="rounded-full bg-white p-2" style={{ elevation: 2 }}>
            <Entypo name="lock" size={20} color="black" />
          </View>

          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/hiruu-coin.svg")}
              style={{ width: 22, height: 22 }}
              contentFit="contain"
            />
            <View className="px-4 py-1 bg-white -ml-3.5 -z-10 rounded-r-[40px]">
              <Text className="text-xs font-proximanova-semibold">540</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NameplateBlankCard;
