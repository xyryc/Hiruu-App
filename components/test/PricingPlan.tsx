import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FreeIcon from "@/assets/images/subscription/free.svg";
import StarterIcon from "@/assets/images/subscription/starter.svg";
import GrowthIcon from "@/assets/images/subscription/growth.svg";
import ProIcon from "@/assets/images/subscription/pro.svg";

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleSelect = (planId: string) => {
    if (mounted.current) {
      setSelectedPlan(planId);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: FreeIcon,
      memberLimit: 10,
      features: [
        { feature1: true },
        { feature2: true },
        { feature3: true },
        { feature4: true },
        { feature5: true },
        { feature6: true },
        { feature7: false },
      ],
    },
    {
      id: "starter",
      name: "Starter",
      icon: StarterIcon,
      memberLimit: 10,
      features: [
        { feature1: true },
        { feature2: true },
        { feature3: true },
        { feature4: true },
        { feature5: true },
        { feature6: true },
        { feature7: false },
      ],
    },
    {
      id: "growth",
      name: "Growth",
      icon: GrowthIcon,
      memberLimit: 25,
      features: [
        { feature1: true },
        { feature2: true },
        { feature3: true },
        { feature4: true },
        { feature5: true },
        { feature6: true },
        { feature7: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      icon: ProIcon,
      memberLimit: 50,
      features: [
        { feature1: true },
        { feature2: true },
        { feature3: true },
        { feature4: true },
        { feature5: true },
        { feature6: true },
        { feature7: false },
      ],
    },
  ];

  return (
    <View className="flex-row p-4">
      {/* feature list */}
      <View className="w-36 flex-1 border">
        <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary mb-2">
          Member Limit
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Schedule reports
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Premium mark
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Easy scheduling by AI
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Increase in job posting
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Statistics export in excel
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          More user capacity depending on plan
        </Text>
        <Text className="text-sm font-proximanova-regular text-primary dark:text-dark-primary mb-2">
          Leaderboard{" "}
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </Text>
      </View>

      {/* plans */}
      <View className="flex-row border">
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            className={`w-12 rounded-lg items-center ${
              selectedPlan === plan.id
                ? "border border-[#CFA873] bg-[#F7EDC0]"
                : "border border-[#EEEEEE] bg-white"
            }`}
            onPress={() => handleSelect(plan.id)}
          >
            <Image
              source={plan.icon}
              style={{
                width: 26,
                height: 26,
                marginBottom: 8,
              }}
              contentFit="contain"
            />

            <Text className="text-center font-bold text-xs mb-3.5">
              {plan.name}
            </Text>

            {/* line */}
            <View className="border-[#11111130] border-b h-[1px] w-8 rounded-full mb-2.5" />

            <Text className="text-center mb-3 text-gray-700">
              {plan.memberLimit}
            </Text>

            {/* Features */}
            <View className="mt-2 items-center">
              {plan.features.map((feature, index) => (
                <View key={index} className="flex-row items-center">
                  <Text className="text-primary">
                    {feature.feature1 ? "✓" : "-"}
                  </Text>
                </View>
              ))}
            </View>

            {/* Selection indicator */}
            <View className="mt-4 flex-row justify-center absolute -bottom-3 left-1/2 -translate-x-[50%]">
              {selectedPlan === plan.id ? (
                <Ionicons
                  className="bg-white rounded-full"
                  name="checkmark-circle"
                  size={24}
                  color="#11293A"
                />
              ) : (
                <Ionicons
                  className="bg-white"
                  name="radio-button-off-sharp"
                  size={24}
                  color="#7A7A7A"
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PricingPlans;
