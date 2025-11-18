import userData from "@/assets/data/user.json";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = userData.user;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <Image
            source={require("@/assets/images/tabbar-background.png")}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "125%",
            }}
            cachePolicy="disk"
          />
        ),

        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "transparent",
          height: 70,
          borderTopWidth: 0,
        },
      }}
    >
      {/* home */}
      <Tabs.Screen
        name="user-home"
        options={{
          title: "Home",
          href: user.role === "user" ? undefined : null, // Hide if not user
          tabBarIcon: ({ color }) => (
            <Octicons name="home-fill" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-home"
        options={{
          title: "Home",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Octicons name="home-fill" size={24} color={color} />
          ),
        }}
      />

      {/* rewards */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={24} color={color} />
          ),
        }}
      />

      {/* schedule */}
      <Tabs.Screen
        name="user-schedule"
        options={{
          title: "",
          href: user.role === "user" ? undefined : null, // Hide if not business
          tabBarIcon: () => (
            <View className="bg-[#4FB2F3] h-14 w-14 rounded-full items-center justify-center border-2 border-[#4FB2F34D]">
              <Ionicons name="calendar" size={24} color="white" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="business-schedule"
        options={{
          title: "",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: () => (
            <View className="bg-[#4FB2F3] h-14 w-14 rounded-full items-center justify-center">
              <Ionicons name="calendar" size={24} color="white" />
            </View>
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
            <Ionicons name="briefcase-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-jobs"
        options={{
          title: "Jobs",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={24} color={color} />
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
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="business-profile"
        options={{
          title: "Profile",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
