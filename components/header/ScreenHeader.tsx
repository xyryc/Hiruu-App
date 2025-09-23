import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenHeader = ({
  onPressBack,
  title,
  buttonTitle,
  onPress,
  className,
  components,
}: any) => {
  return (
    <View className={`${className} flex-row justify-between items-center`}>
      <View className="flex-row items-center gap-2.5">
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text className="font-proximanova-bold text-2xl">{title}</Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Text className="font-proximanova-semibold">{buttonTitle}</Text>
      </TouchableOpacity>

      {components}
    </View>
  );
};

export default ScreenHeader;
