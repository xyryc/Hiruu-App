import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import SecondaryButton from "../buttons/SecondaryButton";

const ConnectSocials = () => {
  return (
    <View>
      {/* facebook */}
      <View className="flex-row items-center gap-1.5">
        <Image
          style={{
            height: 36,
            width: 36,
          }}
          source={require("@/assets/images/facebook2.svg")}
          contentFit="scale-down"
        />

        <Text className="text-sm font-semibold">Facebook</Text>
      </View>

      <SecondaryButton title="Link" />
    </View>
  );
};

export default ConnectSocials;
