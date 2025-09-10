import ScreenHeader from "@/components/layout/ProfileHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { ScrollView, Text, View } from "react-native";
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
      />

      {/* progress details */}
      <View className="my-7">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-sm font-semibold">
            Your Progress: {currentStep * 20}%
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
      </View>

      {/* main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding here
        className="flex-1" // Add flex-1 to ScrollView
      ></ScrollView>

      {/* Button fixed at bottom */}
      <View className="pb-10 pt-4 bg-transparent">
        <PrimaryButton title="Next" className="w-full" onPress={onComplete} />
      </View>
    </AnimatedView>
  );
}
