import { getStepName } from "@/constants/Steps";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Step1 from "./Step1";
import Step2 from "./Step2";

const AnimatedView = Animated.createAnimatedComponent(View);

const ProgressFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const totalSteps = 5;
  const progress = currentStep / totalSteps;
  const router = useRouter();

  const getAnimationStyle = (step: number) => {
    if (step === currentStep) {
      return direction === "forward"
        ? SlideInRight.duration(300)
        : SlideInRight.duration(300); // For back animation, use SlideInLeft
    }
    return undefined;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push(`/(auth)/login`);
    }
  };

  const handleBack = () => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#BDE4F9]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      <LinearGradient
        colors={["#BDE4F9", "#F7F7F7"]}
        locations={[0, 0.38]}
        className="flex-1 justify-center items-center"
      >
        <ScrollView className="px-5 h-screen" contentContainerClassName="pb-10">
          {/* Animated Step Content */}
          <View className="flex-1">
            {currentStep === 1 && (
              <Step1
                progress={progress}
                currentStep={currentStep}
                getStepName={getStepName}
                onComplete={handleNext}
                entering={getAnimationStyle(1)}
                handleBack={handleBack}
              />
            )}
            {currentStep === 2 && (
              <Step2
                progress={progress}
                currentStep={currentStep}
                getStepName={getStepName}
                onComplete={handleNext}
                entering={getAnimationStyle(2)}
                handleBack={handleBack}
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProgressFlow;
