import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import ConnectSocials from "@/components/ui/inputs/ConnectSocials";
import DateOfBirthInput from "@/components/ui/inputs/DateOfBirthInput";
import GenderSelection from "@/components/ui/inputs/GenderSelection";
import { useAuthStore } from "@/stores/authStore";
import { GenderOption } from "@/types";
import { t } from "i18next";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as Progress from "react-native-progress";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step1({
  progress,
  currentStep,
  getStepName,
  onComplete,
  handleBack,
}: any) {
  const { user, updateProfile, isLoading } = useAuthStore();

  // Form state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [location, setLocation] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    "male"
  );

  const locations = [
    {
      label: "Central Park, New York, NY",
      value: "Central Park, New York, NY",
    },
    { label: "Central Park, New York, NY", value: "AK" },
    {
      label: "central park South, New York, NY",
      value: "central park South, New York, NY",
    },
  ];

  // Validation with i18n
  const validateStep1 = () => {
    if (!fullName.trim()) {
      Alert.alert(t("validation.validationError"), t("validation.enterName"));
      return false;
    }

    // if (!location) {
    //   Alert.alert(
    //     t("validation.validationError"),
    //     t("validation.selectLocation")
    //   );
    //   return false;
    // }

    if (!dateOfBirth) {
      Alert.alert(
        t("validation.validationError"),
        t("validation.selectDateOfBirth")
      );
      return false;
    }

    if (!selectedGender) {
      Alert.alert(
        t("validation.validationError"),
        t("validation.selectGender")
      );
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleNext = async () => {
    if (!validateStep1()) {
      return;
    }

    try {
      // Prepare data for API - Just the data fields, no step wrapper
      const profileData = {
        fullName: fullName.trim(),
        location: {
          name: "Central Park",
          address: "Central Park, New York, NY",
          latitude: 40.785091,
          longitude: -73.968285,
        },
        dateOfBirth: dateOfBirth?.toISOString(),
        gender: selectedGender,
      };

      // console.log(
      //   "Sending profile data:",
      //   JSON.stringify(profileData, null, 2)
      // );

      // Call API - Pass data directly
      const result = await updateProfile(profileData);

      // Success - move to next step
      // console.log("Profile updated:", result);
      onComplete();
    } catch (error: any) {
      Alert.alert(
        t("common.error"),
        error.message || t("user.setup.profileUpdateError")
      );
      console.error("Profile update error:", error);
    }
  };

  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="flex-1"
    >
      <ScreenHeader
        onPressBack={handleBack}
        title="Personal Details"
        className="mt-3"
      />

      {/* progress details */}
      <View className="my-7">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-sm font-proximanova-semibold">
            Your Progress: {currentStep * 20}%
          </Text>

          <Text className="text-sm font-proximanova-semibold">
            {getStepName(currentStep)}
          </Text>
        </View>

        <AnimatedView layout={Layout.springify()}>
          <Progress.Bar
            progress={progress}
            width={null}
            height={11}
            color="#11293A"
            unfilledColor="#FFFFFF"
            borderWidth={0}
            borderRadius={100}
            animated={true}
            animationConfig={{ duration: 300 }}
          />
        </AnimatedView>
      </View>

      {/* main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding here
        className="flex-1" // Add flex-1 to ScrollView
      >
        {/* name */}
        <View>
          <Text className="text-sm font-proximanova-semibold mb-2.5">Name</Text>

          <TextInput
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-white border border-[#EEEEEE] rounded-[10px] text-placeholder text-sm"
            keyboardType="email-address"
            autoCapitalize="none"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* location*/}
        <View className="mt-7">
          <Text className="text-sm font-proximanova-semibold mb-2.5">
            Location
          </Text>

          <Dropdown
            data={locations}
            labelField="label"
            valueField="value"
            placeholder={t("user.setup.selectLocation")}
            value={location}
            onChange={(item) => setLocation(item.value)}
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: "#EEEEEE",
              borderRadius: 10,
              padding: 12,
            }}
            placeholderStyle={{
              fontSize: 14,
              color: "#9CA3AF",
            }}
            selectedTextStyle={{
              fontSize: 14,
              color: "#111111",
            }}
            containerStyle={{
              borderRadius: 10,
              backgroundColor: "white",
            }}
            itemTextStyle={{
              fontSize: 14,
              color: "#3D3D3D",
            }}
            disable={isLoading}
          />
        </View>

        {/* date of birth */}
        <View className="mt-7">
          <Text className="text-sm font-proximanova-semibold mb-2.5">
            Date of Birth
          </Text>

          <DateOfBirthInput value={dateOfBirth} onDateChange={setDateOfBirth} />
        </View>

        {/* gender */}
        <View className="mt-7">
          <Text className="text-sm font-proximanova-semibold mb-2.5">
            Date of Birth
          </Text>

          <GenderSelection
            value={selectedGender}
            onGenderChange={setSelectedGender}
          />
        </View>

        {/* socials */}
        <View className="mt-7">
          <Text className="text-sm font-proximanova-semibold mb-2.5">
            Connect Your Socials
          </Text>

          <ConnectSocials />
        </View>
      </ScrollView>

      {/* Button fixed at bottom */}
      <View className="pb-10 pt-4 bg-transparent">
        <PrimaryButton
          title="Next"
          className="w-full"
          onPress={handleNext}
          loading={isLoading}
        />
      </View>
    </AnimatedView>
  );
}
