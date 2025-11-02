import ScreenHeader from "@/components/header/ScreenHeader";
import SettingsCard from "@/components/ui/cards/SettingsCard";
import { Entypo, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Subscription = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Subscription"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>

      <View className="m-5">
        <View className="border px-3 rounded-2xl border-[#EEEEEE]">
          <SettingsCard
            icon={
              <Feather
                name="user"
                className="border rounded-md"
                size={24}
                color="black"
              />
            }
            text="Subscription"
            subtitle="Mobile"
            className="mt-5"
            arrowIcon={
              <Entypo name="chevron-thin-right" size={20} color="#111111" />
            }
          />
        </View>
        <View className="border px-3 rounded-2xl border-[#EEEEEE] mt-2.5">
          <SettingsCard
            icon={<SimpleLineIcons name="briefcase" size={24} color="black" />}
            text="Subscription"
            className="mt-5"
            arrowIcon={
              <Entypo name="chevron-thin-right" size={20} color="#111111" />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Subscription;
