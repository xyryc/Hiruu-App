import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards/index"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <Feather name="gift" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule/index"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <Feather name="gift" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <Feather name="gift" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="gift" size={28} color={color} />
          ),
        }}
      />

      {/* home screen hidden tabs */}
      <Tabs.Screen
        name="home/leaderboard/index"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="home/leaderboard/info"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      {/* schedule screen hidden tabs */}
      <Tabs.Screen
        name="schedule/shift/[id]"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule/shift/overtime"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule/shift/report"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule/shift/summary"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule/shift/swap"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule/shift/leave"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
