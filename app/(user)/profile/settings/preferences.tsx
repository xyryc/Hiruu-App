import ScreenHeader from "@/components/header/ScreenHeader";
import { AnimatedThemeToggle } from "@/components/ui/buttons/AnimatedThemeToggle";
import { ToggleButton } from "@/components/ui/buttons/ToggleButton";
import WeeklySchedule from "@/components/ui/buttons/WeeklySchedule";
import SettingsCard from "@/components/ui/cards/SettingsCard";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const preferences = () => {
  const [isOn, setIsOn] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
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
          title="App Preferences"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5">
          {/* settings card */}

          <SettingsCard
            subtitle="English"
            //   click={() => router.push("/(user)/profile/settings/preferences")}
            icon={
              <Ionicons name="language-outline" size={24} color="#11293A" />
            }
            className="mt-8"
            text="App Preferences"
            arrowIcon={
              <Entypo name="chevron-thin-down" size={20} color="black" />
            }
          />

          <SettingsCard
            subtitle="Notify me 3 hours before shift"
            //   click={() => router.push("/(user)/profile/settings/preferences")}
            icon={<Ionicons name="alarm-outline" size={24} color="black" />}
            className="mt-8"
            text="Smart Alarm"
            arrowIcon={
              <ToggleButton isOn={isOn} setIsOn={() => setIsOn(!isOn)} />
            }
          />

          <SettingsCard
            subtitle="Asia/kolkata"
            //   click={() => router.push("/(user)/profile/settings/preferences")}
            icon={<AntDesign name="global" size={24} color="black" />}
            className="mt-8"
            text="Time Zone"
            arrowIcon={
              <Entypo name="chevron-thin-down" size={20} color="black" />
            }
          />

          <SettingsCard
            //   click={() => router.push("/(user)/profile/settings/preferences")}
            icon={
              <Ionicons name="volume-high-outline" size={24} color="black" />
            }
            className="mt-8"
            text="App Sound"
            arrowIcon={
              <ToggleButton
                isOn={isSoundOn}
                setIsOn={() => setIsSoundOn(!isSoundOn)}
              />
            }
          />

          <SettingsCard
            //   click={() => router.push("/(user)/profile/settings/preferences")}
            icon={
              <MaterialCommunityIcons
                name="water-opacity"
                size={24}
                color="black"
              />
            }
            className="mt-8"
            text="Theme Mode"
            subtitle="Light Mode"
            arrowIcon={<AnimatedThemeToggle />}
          />

          <SettingsCard
            icon={
              <MaterialCommunityIcons
                name="calendar-multiselect-outline"
                size={24}
                color="black"
              />
            }
            className="mt-8"
            text="Available Working Days"
            arrowIcon={
              <Entypo name="chevron-thin-down" size={20} color="black" />
            }
          />

          <View className=" mt-4"></View>
        </View>
        <WeeklySchedule />
      </ScrollView>
    </SafeAreaView>
  );
};

export default preferences;
