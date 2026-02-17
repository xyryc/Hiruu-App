import ScreenHeader from "@/components/header/ScreenHeader";
import SettingsCard from "@/components/ui/cards/SettingsCard";
import LogoutDeleteModal from "@/components/ui/modals/LogoutDeleteModal";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import CancelImg from "@/assets/images/cancel.svg";

const Subscription = () => {
  const CancelImg = require("@/assets/images/cancel.svg");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const modalData = {
    title: t("user.profile.cancelPlanTitle"),
    subtitle: t("user.profile.cancelPlanSubtitle"),
    img: CancelImg,
    buttonName: t("user.profile.cancelPlan"),
    buttonColor: "#F34F4F",
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl pt-10 px-5">
        <ScreenHeader
          className="my-4"
          onPressBack={() => router.back()}
          title={t("user.profile.subscription")}
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
        showsVerticalScrollIndicator={false}>
        <View className="m-5">
          <View className="border border-[#EEEEEE] rounded-2xl">
            <View className="px-2.5 py-5 flex-row gap-3">
              <View className="h-[50px] w-[50px] bg-[#11293A1A] rounded-xl flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="receipt-text-outline"
                  size={22}
                  color="black"
                />
              </View>
              <View>
                <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary">
                  {t("user.profile.userPlanBilling")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3">
                  SarahCatlynne@gmail.com
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.passwordMasked")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.phoneMasked")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.activeDateRange")}
                </Text>
              </View>
            </View>

            <View className="border-b border-[#EEEEEE]" />

            <View className="px-2.5 py-5">
              <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary text-center">
                {t("user.profile.billedThroughGooglePay")}
              </Text>
              <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3 px-14">
                {t("user.profile.googlePayBillingNote")}
              </Text>
            </View>

            <View className="border-b border-[#EEEEEE]" />

            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="my-5"
            >
              <Text className="font-proximanova-bold text-[#F34F4F] text-center">
                {t("user.profile.cancelPlan")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* business plan */}
          <View className="border border-[#EEEEEE] rounded-2xl mt-4">
            <View className="px-2.5 py-5 flex-row gap-3">
              <View className="h-[50px] w-[50px] bg-[#11293A1A] rounded-xl flex-row justify-center items-center">
                <MaterialCommunityIcons
                  name="receipt-text-outline"
                  size={22}
                  color="black"
                />
              </View>
              <View>
                <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary">
                  {t("user.profile.businessPlanBilling")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3">
                  SarahCatlynne@gmail.com
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.passwordMasked")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.phoneMasked")}
                </Text>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                  {t("user.profile.activeDateRange")}
                </Text>
              </View>
            </View>

            <View className="border-b border-[#EEEEEE]" />

            <View className="px-2.5 py-5">
              <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary text-center">
                {t("user.profile.billedThroughGooglePay")}
              </Text>
              <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3 px-14">
                {t("user.profile.googlePayBillingNote")}
              </Text>
            </View>

            <View className="border-b border-[#EEEEEE]" />

            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="my-5"
            >
              <Text className="font-proximanova-bold text-[#F34F4F] text-center">
                {t("user.profile.cancelPlan")}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border px-3 rounded-2xl border-[#EEEEEE] mt-5">
            <SettingsCard
              click={() =>
                router.push("/screens/profile/settings/subscription/user-plan")
              }
              border={true}
              icon={
                <Feather
                  name="user"
                  className="border rounded-md"
                  size={24}
                  color="black"
                />
              }
              text={t("user.profile.userPlan")}
              subtitle={t("user.profile.mobile")}
              className="my-5"
              arrowIcon={
                <Entypo name="chevron-thin-right" size={20} color="#111111" />
              }
            />
          </View>

          <View className="border px-3 rounded-2xl border-[#EEEEEE] mt-2.5">
            <SettingsCard
              click={() =>
                router.push(
                  "/screens/profile/settings/subscription/business-plan"
                )
              }
              border={true}
              icon={
                <SimpleLineIcons name="briefcase" size={24} color="black" />
              }
              text={t("user.profile.businessPlan")}
              subtitle={t("user.profile.mobile")}
              className="my-5"
              arrowIcon={
                <Entypo name="chevron-thin-right" size={20} color="#111111" />
              }
            />
          </View>
        </View>

        <Text className="text-center text-secondary dark:text-dark-secondary text-sm">
          {t("user.profile.subscriptionAutoRenew")}
        </Text>
      </ScrollView>

      <LogoutDeleteModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
      />
    </SafeAreaView>
  );
};

export default Subscription;

