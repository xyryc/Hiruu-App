import { SplashScreenProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Animated, Image } from "react-native";

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 1500);
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Image
        style={{
          width: 1000,
          height: 720,
        }}
        source={require("@/assets/images/splash.svg")}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default SplashScreen;
