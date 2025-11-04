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
        "Schedule reports",
        "Premium mark",
        "Easy scheduling by AI",
        "Increase in job posting",
        "Statistics export in excel",
        "More user capacity depending on plan",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      icon: "⭐",
      memberLimit: 10,
      features: [
        "Premium mark",
        "Easy scheduling by AI",
        "Increase in job posting",
        "Statistics export in excel",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      icon: "💎",
      memberLimit: 25,
      features: [
        "Schedule reports",
        "Premium mark",
        "Easy scheduling by AI",
        "Increase in job posting",
        "Statistics export in excel",
        "Leaderboard",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      icon: "⚡",
      memberLimit: 50,
      features: [
        "Schedule reports",
        "Premium mark",
        "Easy scheduling by AI",
        "Increase in job posting",
        "Statistics export in excel",
        "Leaderboard",
      ],
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row p-4"
    >
      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          className={`w-60 mr-4 rounded-2xl ${
            selectedPlan === plan.id
              ? "border-2 border-yellow-500 bg-yellow-100"
              : "border border-gray-300 bg-white"
          }`}
          onPress={() => handleSelect(plan.id)}
        >
          <Text className="text-center text-2xl mb-2">{plan.icon}</Text>
          <Text className="text-center font-bold text-lg mb-2">
            {plan.name}
          </Text>
          <Text className="text-center mb-3 text-gray-700">
            Member Limit: {plan.memberLimit}
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
          <View className="mt-4 flex-row justify-center absolute -bottom-2 left-1/2 -translate-x-[70%]">
            {selectedPlan === plan.id ? (
              <View className="w-6 h-6 rounded-full bg-blue-600 justify-center items-center">
                <Text className="text-white text-xs">✓</Text>
              </View>
            ) : (
              <View className="w-6 h-6 rounded-full border border-gray-400" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PricingPlans;
