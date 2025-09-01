import PrimaryButton from "@/components/ui/PrimaryButton";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7]">
      <LinearGradient
        colors={["#BDE4F9", "#F7F7F7"]}
        locations={[0, 0.38]}
        className="flex-1 justify-center items-center"
      >
        <Image
          source={require("@/assets/images/welcome-image.svg")}
          style={{
            width: "100%",
            height: 488,
          }}
          contentFit="cover"
        />

        {/* text content */}
        <View className="mt-[76px] items-center">
          <View className="w-4/5">
            <Text className="text-2xl font-bold capitalize mb-4 text-center text-[#111111]">
              Welcome to Hiruu
            </Text>

            <Text className="text-sm font-semibold text-center capitalize text-[#7A7A7A]">
              Manage your team, track shifts, and grow your business — all in
              one place. Let’s get started!
            </Text>
          </View>

          {/* button */}
          <PrimaryButton
            className="my-[30px]"
            title="Get Started"
            onPress={() => router.push("/(auth)/signup")}
          />

          <View className="flex-row">
            <Text className="text-sm">Already have an account?</Text>

            <TouchableOpacity>
              <Text className="text-sm font-semibold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Welcome;
