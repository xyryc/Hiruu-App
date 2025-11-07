import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const EditBusinessProfile = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <LinearGradient
        colors={["#BDE4F9", "#F7F7F7"]}
        locations={[0, 0.38]}
        className="flex-1 px-5"
        style={{ paddingTop: insets.top + 10 }}
      >
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Edit Profile"
          titleClass="text-primary dark:text-dark-primary "
          iconColor={isDark ? "#fff" : "#111"}
        />

        <ScrollView>
          {/* change prifile photo */}
          <View className="bg-[#ffffff] h-[119px] w-[119px] flex-row justify-center items-center mx-auto rounded-full mt-7 relative">
            <Image
              source={require("@/assets/images/business-profil-pic.png")}
              contentFit="cover"
              style={{ height: 116, width: 116, borderRadius: 100 }}
            />
            <View className="h-8 w-8 border border-white bg-[#4FB2F3] rounded-full absolute bottom-2 right-2 flex-row justify-center items-center">
              <Feather name="edit-2" size={16} color="white" />
            </View>
          </View>
          <Text className="pt-2.5 font-proximanova-regular text-sm text-primary dark:text-dark-primary text-center">
            Upload profile photo
          </Text>

          {/* change cover photo */}
          <View className="relative mt-8">
            <Text className=" text-sm font-proximanova-semibold text-primary dark:text-dark-primary">
              Upload Cover photo
            </Text>
            <Image
              source={require("@/assets/images/business-cover.png")}
              contentFit="cover"
              style={{
                width: 377,
                height: 110,
                marginTop: 10,
                borderRadius: 12,
              }}
            />
            <View className="h-8 w-8 border border-white bg-[#4FB2F3] rounded-full absolute bottom-2 right-2 flex-row justify-center items-center">
              <Feather name="edit-2" size={16} color="white" />
            </View>
          </View>

          {/* inpute field  */}

          <View className="flex-row justify-between items-center mt-8 ">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              Business Name
            </Text>
            <Text className="font-proximanova-semibold text-sm text-[#4FB2F3] underline ">
              Edit
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Enter your business name"
              className="w-full pl-3 pr-4 py-4 bg-white border mt-2.5 border-[#EEEEEE] rounded-xl text-[#7A7A7A]"
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          {/* select location  */}
          <View className="mt-8">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              Location
            </Text>

            <View className="flex-row mt-2.5 gap-2.5">
              {/* City Dropdown */}
              <TouchableOpacity className="flex-1 flex-row justify-between items-center w-32 border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm">
                <Text className="text-gray-500">City</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>

              {/* Area Dropdown */}
              <TouchableOpacity className="flex-1 flex-row justify-between items-center w-32 border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm">
                <Text className="text-gray-500">Area</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add a About Business */}

          <View className="flex-row justify-between items-center mt-8 ">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              Add a About Business
            </Text>
            <Text className="font-proximanova-semibold text-sm text-[#4FB2F3] underline ">
              Edit
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor="#7A7A7A"
              className="w-full pl-3 pr-4 pt-4 pb-4 bg-white border mt-2.5 border-[#EEEEEE] rounded-xl text-primary text-base"
              keyboardType="default"
              autoCapitalize="sentences"
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              style={{ minHeight: 120 }}
            />
          </View>
        </ScrollView>
      </LinearGradient>
      <PrimaryButton title="Save Change" className="mx-5" />
    </SafeAreaView>
  );
};

export default EditBusinessProfile;
