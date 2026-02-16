import { useBusinessStore } from "@/stores/businessStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";


export default function TabLayout() {
  const selectedBusinesses = useBusinessStore((s) => s.selectedBusinesses);
  const isBusinessProfile = selectedBusinesses.length > 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <Image
            source={require("@/assets/images/tabbar-background.png")}
            contentFit="fill"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "125%",
            }}
            cachePolicy="memory"
          />
        ),

        tabBarActiveTintColor: "#4FB2F3",
        tabBarInactiveTintColor: "#A0A0A0",

        tabBarStyle: {
          backgroundColor: "transparent",
          height: 70,
          borderTopWidth: 0,
        },
      }}
    >
      {/* home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",

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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "gift" : "gift-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* schedule */}
      <Tabs.Screen
        name="user-schedule"
        options={{
          title: "",
          href: isBusinessProfile ? null : "/user-schedule",
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
          href: isBusinessProfile ? "/business-schedule" : null,
          tabBarIcon: () => (
            <View className="bg-[#4FB2F3] h-14 w-14 rounded-full items-center justify-center">
              <Ionicons name="calendar" size={24} color="white" />
            </View>
          ),
        }}
      />

      {/* user jobs */}
      <Tabs.Screen
        name="user-jobs"
        options={{
          title: "Jobs",
          href: isBusinessProfile ? null : "/user-jobs",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* business jobs */}
      <Tabs.Screen
        name="business-jobs"
        options={{
          title: "Jobs",
          href: isBusinessProfile ? "/business-jobs" : null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* profile */}
      <Tabs.Screen
        name="user-profile"
        options={{
          title: "Profile",
          href: isBusinessProfile ? null : "/user-profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* profile */}
      <Tabs.Screen
        name="business-profile"
        options={{
          title: "Profile",
          href: isBusinessProfile ? "/business-profile" : null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />


      {/*
      <Tabs.Screen
        name="business-profile"
        options={{
          title: "Profile",
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />
     */}
    </Tabs>
  );
}
