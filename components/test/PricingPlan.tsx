import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

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
      icon: "📦",
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
      icon: "⭐",
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
      icon: "💎",
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
      icon: "⚡",
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
      <View className="w-36">
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
      <View className="flex-row">
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            className={`w-12 rounded-lg ${
              selectedPlan === plan.id
                ? "border border-[#CFA873] bg-[#F7EDC0]"
                : "border border-[#EEEEEE] bg-white"
            }`}
            onPress={() => handleSelect(plan.id)}
          >
            <Text className="text-center text-2xl mb-2">{plan.icon}</Text>
            <Text className="text-center font-bold text-xs mb-3.5">
              {plan.name}
            </Text>
            <Text className="text-center mb-3 text-gray-700">
              {plan.memberLimit}
            </Text>

            {/* Features */}
            <View className="mt-2">
              {plan.features.map((feature, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <Text className="mr-2 text-green-600">✓</Text>
                  <Text className="text-xs text-gray-700">{feature}</Text>
                </View>
              ))}
            </View>

            {/* Selection indicator */}
            <View className="mt-4 flex-row justify-center absolute -bottom-3 left-1/2 -translate-x-[70%]">
              {selectedPlan === plan.id ? (
                <View className="w-6 h-6 rounded-full bg-blue-600 justify-center items-center">
                  <Text className="text-white text-xs">✓</Text>
                </View>
              ) : (
                <View className="w-6 h-6 bg-white rounded-full border border-gray-400" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PricingPlans;
