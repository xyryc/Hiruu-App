import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Assign = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

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
            className="capitalize"
            style={{ paddingTop: insets.top + 10, paddingBottom: 10 }}
            onPressBack={() => router.back()}
            title="Assign"
            titleClass="text-primary dark:text-dark-primary"
            iconColor={isDark ? "#fff" : "#111"}
          />
        </View>
        <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Search"
            className="border mt-9 border-[#eeeeee] rounded-[10px] py-5 px-4 gap-5 flex-row items-center"
            placeholderTextColor={isDark ? "#fff" : "#7A7A7A"}
            style={{
              color: isDark ? "#fff" : "#111",
              backgroundColor: isDark ? "#111" : "#fff",
            }}
          />

          {/* button  */}
          <PrimaryButton title="Next" />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Assign;
