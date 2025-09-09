import PrimaryButton from "@/components/ui/PrimaryButton";
import ScreenHeader from "@/components/ui/ProfileHeader";
import { Text, View } from "react-native";
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
  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
    >
      <ScreenHeader
        onPressBack={handleBack}
        title="Personal Details"
        buttonTitle="Skip"
        className="mt-3 mb-8"
      />

      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-sm font-semibold">
          Your Progress: {currentStep}%
        </Text>

        <Text className="text-sm font-semibold">
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

      <PrimaryButton title="Next" className="w-full" onPress={onComplete} />
    </AnimatedView>
  );
}
