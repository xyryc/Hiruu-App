import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import ShareVia from "@/components/ui/modals/ShareVia";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const QrGenerate = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const qrCodeRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const employeeInfo = {
    name: "Favour",
    code: "895641",
    businessName: "Houghton",
  };

  // QR code data - you can customize this
  const qrData = JSON.stringify({
    type: "employee_join",
    business: employeeInfo.businessName,
    code: employeeInfo.code,
    employee: employeeInfo.name,
    timestamp: new Date().toISOString(),
  });

  const downloadQRCode = () => {
    setIsGenerating(true);
    // Simulate download process
    setTimeout(() => {
      Alert.alert("Success", "QR code has been saved to your gallery");
      setIsGenerating(false);
    }, 1500);
  };

  const [isModal, setIsModal] = useState(false);

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      {/* Header */}
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title="Invite Employee"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
          components={
            <TouchableOpacity
              onPress={downloadQRCode}
              disabled={isGenerating}
              className="h-10 w-10 bg-white rounded-full flex-row items-center justify-center"
            >
              {isGenerating ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Feather name="download" size={20} color="black" />
              )}
            </TouchableOpacity>
          }
        />
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* QR Code Container */}
        <View className="bg-[#E5F4FD]  dark:bg-dark-card mt-20 rounded-2xl  pb-3 items-center shadow-sm border border-[#EEEEEE] dark:border-gray-800">
          {/* Employee Info Card */}
          <View className="items-center -top-8">
            <Image
              source={require("@/assets/images/reward/nameplate-profile.png")}
              contentFit="contain"
              style={{ height: 80, width: 80 }}
            />
            <Text className="mt-2.5 font-proximanova-semibold text-primary dark:text-dark-primary">
              Farout beach club
            </Text>
          </View>
          {/* Actual QR Code */}
          <View className="w-44 h-44  bg-white dark:bg-gray-800 rounded-xl items-center justify-center border-2 border-[#4FB2F3] dark:border-gray-700">
            <QRCode
              value={qrData}
              size={135}
              logo={{}}
              logoSize={40}
              color={isDark ? "#FFFFFF" : "#000000"}
              backgroundColor={isDark ? "#1F2937" : "#FFFFFF"}
              getRef={(ref) => (qrCodeRef.current = ref)}
            />
            {/* Custom Logo Overlay */}
            <View className="absolute inset-0 items-center justify-center">
              <Image
                source={require("@/assets/images/hiruu-logo.svg")}
                contentFit="contain"
                style={{ height: 40, width: 40 }}
              />
            </View>
          </View>

          <Text
            className="capitalize font-proximanova-regular text-sm text-primary dark:text-dark-primary mt-4"
            numberOfLines={1}
          >
            Scan to join with hiruplatform
          </Text>

          {/* Code Display */}
          <View className=" bg-[#FFFFFF] rounded-full mt-4 py-2 px-8 flex-row items-center gap-4">
            <Text className="font-proximanova-semibold text-base text-primary dark:text-dark-primary">
              Code: {employeeInfo.code}
            </Text>
            <Ionicons name="copy-outline" size={20} color="black" />
          </View>
        </View>

        {/* bottom text */}
        <View className="items-center">
          <Text className="mt-4 font-proximanova-semibold text-primary dark:text-dark-primary">
            Scan QR Code
          </Text>
          <Text className="mt-2.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            Scan the QR code to get started on Hirru
          </Text>
        </View>
        <ShareVia visible={isModal} onClose={() => setIsModal(false)} />
      </ScrollView>
      <PrimaryButton
        onPress={() => setIsModal(true)}
        title="Share QR Code"
        className="mx-5 my-10"
      />
    </SafeAreaView>
  );
};

export default QrGenerate;
