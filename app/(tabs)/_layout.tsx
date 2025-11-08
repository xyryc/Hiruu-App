import userData from "@/assets/data/user.json";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = userData.user;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* home */}
      <Tabs.Screen
        name="user-home"
        options={{
          title: "Home",
          href: user.role === "user" ? undefined : null, // Hide if not user
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-home"
        options={{
          title: "Business Home",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Feather name="briefcase" size={28} color={color} />
          ),
        }}
      />

      {/* rewards */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <Feather name="gift" size={28} color={color} />
          ),
        }}
      />

      {/* schedule */}
      <Tabs.Screen
        name="user-schedule"
        options={{
          title: "Schedule",
          href: user.role === "user" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-schedule"
        options={{
          title: "Schedule",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={28} color={color} />
          ),
        }}
      />

      {/* jobs */}
      <Tabs.Screen
        name="user-jobs"
        options={{
          title: "Jobs",
          href: user.role === "user" ? undefined : null, // Hide if not user
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-jobs"
        options={{
          title: "Jobs",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Feather name="briefcase" size={28} color={color} />
          ),
        }}
      />

      {/* profile */}
      <Tabs.Screen
        name="user-profile"
        options={{
          title: "Profile",
          href: user.role === "user" ? undefined : null, // Hide if not user
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-profile"
        options={{
          title: "Profile",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
