import ScreenHeader from "@/components/header/ScreenHeader";
import LimitedNamePlateCard from "@/components/ui/cards/LimitedNamePlateCard";
import NameplateBlankCard from "@/components/ui/cards/NameplateBlankCard";
import NamePlateCard from "@/components/ui/cards/NamePlateCard";
import RedeemModal from "@/components/ui/modals/RedeemModal";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Nameplate = () => {
  const img = require("@/assets/images/reward/nameplate-profile.png");

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    listitle: "",
    list1: "",
    list2: "",
    list3: "",
  });

  const modalHandle = () => {
    setModalVisible(true);
    setData({
      listitle: "Gift Premium for a month:",
      list1:
        "Send 1 month of premium access to another user. They’ll receive all premium benefits instantly",
      list2: "Token Cost: 300 Tokens",
      list3: "Current Token Balance: 540 Tokens",
    });
  };

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabs = ["limited time", "featured", "all"];
  const [isActive, setIsActive] = useState("limited time");
  return (
    <SafeAreaView className="flex-1 bg-[#E5F4FD] dark:bg-dark-background">
      {/* Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-5 pb-4 pt-2.5 rounded-b-3xl bg-[#E5F4FD] overflow-hidden"
        title="Buy Nameplate"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111111"}
        components={
          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/hiruu-coin.svg")}
              style={{
                width: 32,
                height: 32,
              }}
              contentFit="contain"
            />
            <View className="px-4 py-2 bg-white -ml-3 -z-10 rounded-r-[40px]">
              <Text className="text-sm font-proximanova-semibold">540</Text>
            </View>
          </View>
        }
      />

      <View className=" flex-row mx-5">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            className={`w-1/3 border-b  pb-2 ${isActive === tab && "border-[#11293A] border-b-2"}`}
            onPress={() => setIsActive(tab)}
          >
            <Text
              className={`text-center ${isActive === tab ? "font-proximanova-semibold text-base text-primary dark:text-dark-primary" : "font-proximanova-regular text-secondary dark:text-dark-secondary"} `}
            >
              <Text className="capitalize">{tab}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white px-5"
      >
        <Text className="font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mt-8">
          Note: Premium Required: Only premium users can use nameplates.
        </Text>

        {/* card */}
        <TouchableOpacity onPress={modalHandle} className="mt-8">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Caffeine Commander
          </Text>

          <LimitedNamePlateCard variant="variant1" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Checkout Champion
          </Text>

          <LimitedNamePlateCard variant="variant2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Checkout Champion
          </Text>

          <LimitedNamePlateCard variant="variant3" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Style advisor
          </Text>

          <LimitedNamePlateCard variant="variant4" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Fryer Fiend
          </Text>

          <LimitedNamePlateCard variant="variant5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Returns Specialist
          </Text>

          <LimitedNamePlateCard variant="variant6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Literary Legend
          </Text>

          <LimitedNamePlateCard variant="variant7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Gadget guru
          </Text>

          <LimitedNamePlateCard variant="variant8" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Pill Pusher Pro
          </Text>

          <LimitedNamePlateCard variant="variant9" />
        </TouchableOpacity>

        <TouchableOpacity onPress={modalHandle} className="mt-5">
          <Text className="font-proximanova-semibold text-primary dark:text-dark-primary mb-2.5">
            Flash Delivery
          </Text>

          <LimitedNamePlateCard variant="variant10" />
        </TouchableOpacity>
      </ScrollView>

      <RedeemModal
        namePlate={<NamePlateCard variant="variant4" />}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={data}
      />
    </SafeAreaView>
  );
};

export default Nameplate;
