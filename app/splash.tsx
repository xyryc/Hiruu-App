import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Animated, Image, Text, View } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2000);
  }, []);

  return (
    <Animated.View
      className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-gray-100"
      style={{ opacity: fadeAnim }}
    >
      <LinearGradient
        colors={["#E3F2FD", "#F5F5F5"]}
        className="flex-1 justify-center items-center w-full"
      >
        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            style={{
              width: 124,
              height: 44,
            }}
            source={require("@/assets/images/hiruu-logo.svg")}
            resizeMode="contain"
          />
        </View>

        {/* Tagline at bottom */}
        <View className="absolute bottom-12 items-center px-4">
          <Text className="text-gray-600 text-sm font-light text-center">
            Your Daily Work Companion...
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SplashScreen;
