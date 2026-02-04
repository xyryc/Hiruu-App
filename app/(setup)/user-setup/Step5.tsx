import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import OTPInput from "@/components/ui/inputs/OTPInput";
import PhoneNumberInput from "@/components/ui/inputs/PhoneNumberInput";
import { useStore } from "@/stores/store";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { toast } from "sonner-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step5({
  progress,
  currentStep,
  getStepName,
  onComplete,
  handleBack,
}: any) {
  const router = useRouter();
  const { user, addContact, verifyAccount, updateProfile, isLoading } = useStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [onboardingSent, setOnboardingSent] = useState(false);


  useEffect(() => {
    if (user?.isNumberVerified && !onboardingSent) {
      setIsOtpVerified(true);
      updateProfile({ onboarding: 5 }).catch(() => undefined);
      setOnboardingSent(true);
    }
  }, [onboardingSent, updateProfile, user?.isNumberVerified]);

  const getPhonePayload = () => {
    const trimmed = phoneNumber.trim();
    if (!trimmed || !countryCode) {
      return { countryCode: "", phoneNumber: "" };
    }

    const ccDigits = countryCode.replace(/\D/g, "");
    const numberOnly = trimmed.replace(/\D/g, "");
    const phoneOnly = numberOnly.startsWith(ccDigits)
      ? numberOnly.slice(ccDigits.length)
      : numberOnly;

    return { countryCode, phoneNumber: phoneOnly };
  };

  const handleSendOtp = async () => {
    const parsed = getPhonePayload();
    if (!parsed.phoneNumber || !parsed.countryCode) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      console.log("send otp", parsed)
      await addContact(parsed);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      toast.error(error.message || t("common.error"));
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      const parsed = getPhonePayload();
      if (!parsed.phoneNumber || !parsed.countryCode) {
        toast.error("Please enter a valid phone number.");
        return;
      }
      console.log("verify code", parsed.phoneNumber, parsed.countryCode, otpCode)

      await verifyAccount({
        phoneNumber: parsed.phoneNumber,
        countryCode: parsed.countryCode,
        code: otpCode,
      });
      setIsOtpVerified(true);
      if (!onboardingSent) {
        await updateProfile({ onboarding: 5 });
        setOnboardingSent(true);
      }
      toast.success("Phone number verified!");
    } catch (error: any) {
      toast.error(error.message || t("common.error"));
    } finally {
      setIsVerifyingOtp(false);
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
        title="Mobile Verification"
        buttonTitle="Skip"
        className="mt-3"
        onPress={() => router.replace("/(tabs)/home")}
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
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
      >
        <View>
          <Text className="text-sm mb-2 text-[#7A7A7A]">Phone number</Text>
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
          />
        </View>

        <View className="mt-4">
          <PrimaryButton
            title={otpSent ? "Resend OTP" : "Send OTP"}
            onPress={handleSendOtp}
            loading={isVerifyingOtp}
            className="w-full"
          />
        </View>

        {otpSent && (
          <View className="mt-4">
            <Text className="text-sm mb-2 text-[#7D7D7D]">OTP input</Text>
            <OTPInput otp={otp} setOtp={setOtp} />

            <View className="mt-4">
              <PrimaryButton
                title={isOtpVerified ? "Verified" : "Verify OTP"}
                onPress={handleVerifyOtp}
                loading={isVerifyingOtp}
                className="w-full"
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Button fixed at bottom */}
      <View className="pb-10 pt-4 bg-transparent">
        <PrimaryButton
          title="Next"
          className="w-full"
          onPress={onComplete}
          loading={isLoading}
          disabled={!isOtpVerified || isVerifyingOtp}
        />
      </View>
    </AnimatedView>
  );
}
