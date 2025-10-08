import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function UserLayout() {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        // Default options for ALL buyer screens
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? "#111827" : "#ffffff",
        },
        headerTintColor: isDark ? "#ffffff" : "#111111",
        headerTitleStyle: {
          fontFamily: "ProximaNova-Semibold",
          fontSize: 18,
        },
        headerShadowVisible: true,

        headerBackTitle: "Back",
        animation: "slide_from_right",
      }}
    >
      {/* TABS - This is the nested (tabs)/_layout.tsx */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Individual Screens (outside tabs) */}
      <Stack.Screen
        name="leaderboard/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="leaderboard/info"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="shift/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="shift/swap"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="shift/overtime"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="shift/report"
        options={{
          headerShown: false,
        }}
      />

      {/*
      <Stack.Screen
        name="service/[id]/reviews"
        options={{
          title: "Reviews & Ratings",
          presentation: "modal", // Shows as modal
        }}
      />

      <Stack.Screen
        name="service/checkout"
        options={{
          title: "Checkout",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "#fff" : "#111"}
              />
            </TouchableOpacity>
          ),
        }}
      /> */}

      {/* Creator Profile Screens */}
      {/* <Stack.Screen
        name="creator/[id]"
        options={{
          title: "Creator Profile",
        }}
      />

      <Stack.Screen
        name="creator/[id]/portfolio"
        options={{
          title: "Portfolio",
          presentation: "card",
        }}
      /> */}

      {/* Order Management Screens */}
      {/* <Stack.Screen
        name="order/[id]"
        options={{
          title: "Order Details",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={isDark ? "#fff" : "#111"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="order/[id]/chat"
        options={{
          title: "Chat",
        }}
      />

      <Stack.Screen
        name="order/[id]/review"
        options={{
          title: "Leave a Review",
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="close"
                size={24}
                color={isDark ? "#fff" : "#111"}
              />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Stack>
  );
}
