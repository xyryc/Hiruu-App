import ScreenHeader from "@/components/header/ScreenHeader";
import NotificationPreferencesInpute from "@/components/test/NotificationPreferencesInpute";
import { ToggleButton } from "@/components/ui/buttons/ToggleButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationPreferences = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isAll, setIsAll] = React.useState(false);
  const [isGeneral, setIsGeneral] = React.useState(false);

  const [settings, setSettings] = useState({
    shiftReminders: true,
    scheduleUpdates: false,
    newAssigned: false,
    shiftCancellation: false,
    managerMessages: false,
  });

  type SettingsKeys = keyof typeof settings;

  const toggleSetting = (key: SettingsKeys) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsConfig: { key: SettingsKeys; label: string }[] = [
    { key: "shiftReminders", label: "Shift Reminders" },
    { key: "scheduleUpdates", label: "Schedule Updates" },
    { key: "newAssigned", label: "New Assigned" },
    { key: "shiftCancellation", label: "Shift Cancellation" },
    { key: "managerMessages", label: "Manager Messages" },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-14 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Notification Preferences"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <View className="flex-row justify-between items-center mt-7">
          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
            Enable All Notification
          </Text>
          <ToggleButton setIsOn={setIsAll} isOn={isAll} />
        </View>

        <NotificationPreferencesInpute
          settingsConfig={settingsConfig}
          settings={settings}
          toggleSetting={toggleSetting}
          isToggle={isGeneral}
          setIsToggle={setIsGeneral}
        />

        <NotificationPreferencesInpute
          settingsConfig={settingsConfig}
          settings={settings}
          toggleSetting={toggleSetting}
          isToggle={isGeneral}
          setIsToggle={setIsGeneral}
        />

        <NotificationPreferencesInpute
          settingsConfig={settingsConfig}
          settings={settings}
          toggleSetting={toggleSetting}
          isToggle={isGeneral}
          setIsToggle={setIsGeneral}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPreferences;
