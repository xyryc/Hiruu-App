import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import MultiSelectCompanyDropdown from "@/components/ui/inputs/MultiSelectCompanyDropdown";
import { useAuthStore } from "@/stores/authStore";
import { Company, WorkExperience } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step3({
  progress,
  currentStep,
  getStepName,
  onComplete,
  handleBack,
}: any) {
  const router = useRouter();
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [uploading, setUploading] = useState(false);
  const { updateProfile, isLoading } = useAuthStore();

  const handleSkip = () => {
    onComplete();
  };

  const handleNext = async () => {
    // Skip if no work experience added
    if (workExperiences.length === 0) {
      onComplete();
      return;
    }

    try {
      // Transform work experiences for API
      const profileData = {
        companies: workExperiences.map((exp) => ({
          id: exp.companyId,
          name: exp.companyName,
          // logo: exp.logo,
          startDate: exp.startDate || null,
          endDate: exp.endDate || null,
          jobTitle: exp.jobTitle || null,
          isCurrentlyWorking: exp.currentlyWorking || false,
        })),
      };

      await updateProfile(profileData);
      onComplete();
      // console.log("from step 3", profileData);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save work experience");
      console.error("Work experience save error:", error);
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
        title="Work Experience"
        buttonTitle="Skip"
        className="mt-3"
        onPress={handleSkip}
      />

      {/* progress details */}
      <View className="mt-7">
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
        contentContainerStyle={{ paddingBottom: 300 }}
        className="flex-1"
      >
        {/* company  */}
        <View className="mt-7">
          <Text className="text-sm font-proximanova-semibold mb-2.5">
            Company/Employer
          </Text>

          <MultiSelectCompanyDropdown
            selectedCompanies={selectedCompanies}
            workExperiences={workExperiences}
            onCompaniesChange={setSelectedCompanies}
            onWorkExperiencesChange={setWorkExperiences}
          />
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
