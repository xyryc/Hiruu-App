import React from "react";
import { ScrollView, Text, View } from "react-native";

const Complete = () => {
  return (
    <SafeAreaView
      className="flex-1 bg-[#BDE4F9]"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      <LinearGradient
        colors={["#BDE4F9", "#F7F7F7"]}
        locations={[0, 0.38]}
        className="flex-1 justify-center items-center"
      >
        <ScrollView className="px-5 h-screen" contentContainerClassName="pb-10"></ScrollView>
    </View>
  );
};

export default Complete;
