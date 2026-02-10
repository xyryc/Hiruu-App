import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CheckButtonProps = {
  className?: string;
  title: string;
  viewChecked?: boolean;
  editChecked?: boolean;
  onToggleView?: () => void;
  onToggleEdit?: () => void;
};

const CheckButton = ({
  className,
  title,
  viewChecked,
  editChecked,
  onToggleView,
  onToggleEdit,
}: CheckButtonProps) => {
  const [isCheck2, setIsCheck2] = useState(false);
  const [isCheck1, setIsCheck1] = useState(false);
  const currentView = typeof viewChecked === "boolean" ? viewChecked : isCheck1;
  const currentEdit = typeof editChecked === "boolean" ? editChecked : isCheck2;

  return (
    <View
      className={` ${className} flex-row items-center justify-between mt-4`}
    >
      <Text
        className="font-proximanova-regular text-sm text-primary dark:text-dark-primary"
        numberOfLines={1}
      >
        {title}
      </Text>
      <View className="flex-row items-center gap-10">
        <TouchableOpacity
          onPress={() =>
            onToggleView ? onToggleView() : setIsCheck1((prev) => !prev)
          }
          className={`h-5 w-5 rounded-full border border-[#7A7A7A]  ${currentView ? "bg-[#11293A]" : ""} `}
        >
          {currentView && <Feather name="check" size={15} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            onToggleEdit ? onToggleEdit() : setIsCheck2((prev) => !prev)
          }
          className={`h-5 w-5 rounded-full border border-[#7A7A7A]  ${currentEdit ? "bg-[#11293A]" : ""} `}
        >
          {currentEdit && <Feather name="check" size={15} color="white" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckButton;
