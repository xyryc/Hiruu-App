import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
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
    </Stack>
  );
}
