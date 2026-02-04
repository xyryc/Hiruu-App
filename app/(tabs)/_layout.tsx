import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { profileService } from "@/services/profileService";

export default function TabLayout() {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const result = await profileService.getProfile();
        if (isMounted) {
          setProfileData(result.data);
        }
      } catch {
        // Keep defaults if profile can't load.
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const isOwner = (profileData?.ownedBusinesses?.length || 0) > 0;

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

      {/* <Tabs.Screen
        name="business-home"
        options={{
          title: "Home",
          href: user.role === "business" ? undefined : null, // Hide if not business
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={24}
              color={color}
            />
          ),
        }}
      /> */}

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
          href: isOwner ? null : undefined,
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
          href: isOwner ? undefined : null,
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
          href: isOwner ? null : undefined,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="business-jobs"
        options={{
          title: "Jobs",
          href: isOwner ? undefined : null,
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
          href: isOwner ? null : undefined,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="business-profile"
        options={{
          title: "Profile",
          href: isOwner ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
