import { SimpleStatusBadgeProps } from "@/types";
import React from "react";
import { Text, View } from "react-native";

const SimpleStatusBadge = ({
  className,
  title,
  textColor,
  bgColor,
}: SimpleStatusBadgeProps) => {
  return (
    <View
      className={`${className} py-1.5 px-4 rounded-full`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Text
        className="font-proximanova-regular text-sm"
        style={{
          color: textColor,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default SimpleStatusBadge;
