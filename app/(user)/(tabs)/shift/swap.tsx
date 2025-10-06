import ScreenHeader from "@/components/header/ScreenHeader";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SwapShifts = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-4"
        title="Detail"
        components={
          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
              <Image
                source={require("@/assets/images/scan.svg")}
                style={{
                  width: 24,
                  height: 24,
                }}
                contentFit="scale-down"
              />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SwapShifts;
