import ScreenHeader from "@/components/header/ScreenHeader";
import ShiftTemplateCard from "@/components/ui/cards/ShiftTemplateCard";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const leaveTypes = [
  {
    label: "Sick Leave",
    value: "sick",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Personal Leave",
    value: "personal",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Work From Home",
    value: "wfh",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Emergency Leave",
    value: "emergency",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
];
const SavedShiftTemplate = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [selectedLeave, setSelectedLeave] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <SafeAreaView
        className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
        edges={["left", "right", "bottom"]}
      >
        <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pb-4 pt-2.5 px-5">
          <ScreenHeader
            className=""
            style={{ paddingTop: insets.top + 10, paddingBottom: 10 }}
            onPressBack={() => router.back()}
            title="Saved Shift template"
            titleClass="text-primary dark:text-dark-primary"
            iconColor={isDark ? "#fff" : "#111"}
          />
        </View>
        <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
          <ShiftTemplateCard className="mt-8" />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SavedShiftTemplate;
