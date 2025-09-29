import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        style={{
          width: width,
          height: height,
        }}
        source={require("@/assets/images/splash.png")}
        contentFit="contain"
      />
    </View>
  );
};

export default SplashScreen;
