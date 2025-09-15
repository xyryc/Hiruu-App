import React from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../buttons/PrimaryButton";

const ProgressCard = () => {
  return (
    <View className="flex-row">
      {/* left */}
      <View>
        <Text>50%</Text>
      </View>

      {/* right */}
      <View>
        <Text className="font-proximanova-semibold mb-1">
          Your Profile is 50% Ready
        </Text>
        <Text className="font-proximanova-regular text-secondary text-sm">
          Your Profile is 50% Ready
        </Text>
        <Text className="font-proximanova-semibold text-[#4FB2F3] text-sm">
          5 Tokens
        </Text>

        <PrimaryButton title="Complete Profile" />
      </View>
    </View>
  );
};

export default ProgressCard;
