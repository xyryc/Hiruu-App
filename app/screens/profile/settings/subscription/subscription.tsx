import ScreenHeader from "@/components/header/ScreenHeader";
import SettingsCard from "@/components/ui/cards/SettingsCard";
import ConfirmActionModal from "@/components/ui/modals/ConfirmActionModal";
import { billingService } from "@/services/billingService";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "@/utils/date";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ActiveSubscription = {
  id: string;
  userId: string;
  businessId: string | null;
  status: string;
  billingCycle: "monthly" | "yearly";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  provider: string;
  plan?: {
    tier?: string;
    currency?: string;
    monthlyPrice?: string;
    description?: string;
    type?: "user" | "business";
  };
};

const Subscription = () => {
  const CancelImg = require("@/assets/images/cancel.svg");
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
  const [isLoadingActiveSubscription, setIsLoadingActiveSubscription] = useState(false);
  const [activeSubError, setActiveSubError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchActiveSubscription = useCallback(async () => {
    try {
      setIsLoadingActiveSubscription(true);
      setActiveSubError(null);

      const data = await billingService.getMyActiveSubscription();
      setActiveSubscription(data ?? null);
    } catch (error: any) {
      setActiveSubscription(null);
      setActiveSubError(error?.message || "Failed to load active subscription");
    } finally {
      setIsLoadingActiveSubscription(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchActiveSubscription();
    }, [fetchActiveSubscription])
  );

  const providerLabel = activeSubscription?.provider
    ? `${activeSubscription.provider.charAt(0).toUpperCase()}${activeSubscription.provider.slice(1)}`
    : "Unavailable";

  const handleCancelSubscription = async () => {
    if (!activeSubscription?.id || isCancelling) return;

    try {
      setIsCancelling(true);
      setActiveSubError(null);

      const cancelled = await billingService.cancelSubscription(activeSubscription.id);

      setActiveSubscription((prev) =>
        prev
          ? {
            ...prev,
            status: cancelled.status || prev.status,
            cancelAtPeriodEnd: cancelled.cancelAtPeriodEnd,
            currentPeriodEnd: cancelled.currentPeriodEnd || cancelled.endDate || prev.currentPeriodEnd,
            billingCycle: (cancelled.billingCycle as "monthly" | "yearly") || prev.billingCycle,
            provider: cancelled.provider || prev.provider,
          }
          : prev
      );

      setShowModal(false);
      await fetchActiveSubscription();
    } catch (error: any) {
      setActiveSubError(error?.message || "Failed to cancel subscription");
    } finally {
      setIsCancelling(false);
    }
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
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="m-5">
          {isLoadingActiveSubscription && !activeSubscription && (
            <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mb-3">
              Loading subscription...
            </Text>
          )}

          {activeSubscription && (
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
                    {user?.email || "-"}
                  </Text>
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                    {user?.phoneNumber || t("user.profile.phoneMasked")}
                  </Text>
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary mt-3">
                    {t("user.profile.activeDateRange")}: {formatDate(activeSubscription.currentPeriodEnd)}
                  </Text>
                </View>
              </View>

              <View className="border-b border-[#EEEEEE]" />

              <View className="px-2.5 py-5">
                <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary text-center capitalize">
                  {`Billed through ${providerLabel}`}
                </Text>

                <Text className="capitalize font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3 px-14 text-center">
                  {`Status: ${activeSubscription.status} • ${activeSubscription.billingCycle}${activeSubscription.cancelAtPeriodEnd ? ` • ${t("user.profile.cancelAtPeriodEnd")}` : ""
                    }`}
                </Text>
                {!!activeSubError && (
                  <Text className="font-proximanova-semibold text-sm text-[#F34F4F] mt-3 text-center">
                    {activeSubError}
                  </Text>
                )}
              </View>

              <View className="border-b border-[#EEEEEE]" />

              <TouchableOpacity
                disabled={isCancelling}
                onPress={() => setShowModal(true)}
                className="my-5"
              >
                <Text className="font-proximanova-bold text-[#F34F4F] text-center">
                  {isCancelling ? t("user.profile.cancelling") : t("user.profile.cancelPlan")}
                </Text>
              </TouchableOpacity>
            </View>
          )}

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
                Billed through Stripe
              </Text>
              <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-3 px-14">
                Manage your billing and renewal from your Stripe-backed subscription.
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

      <ConfirmActionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleCancelSubscription}
        title={t("user.profile.cancelPlanTitle")}
        subtitle={t("user.profile.cancelPlanSubtitle")}
        expiryDate={formatDate(activeSubscription?.currentPeriodEnd)}
        icon={CancelImg}
        confirmLabel={isCancelling ? t("user.profile.cancelling") : t("user.profile.cancelPlan")}
        confirmColor="#F34F4F"
        loading={isCancelling}
      />
    </SafeAreaView>
  );
};

export default Subscription;
