import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const DatePicker = ({
  className,
  title,
  value,
  onChange: onDateChange,
}: {
  className?: any;
  title?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}) => {
  const [internalDate, setInternalDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const date = value || internalDate;

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (!selectedDate) return;
    setInternalDate(selectedDate);
    onDateChange?.(selectedDate);
  };

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View className={className}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        activeOpacity={0.8}
        className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-white"
      >
        <Text className="text-gray-700 text-base">
          {formattedDate ? formattedDate : title}
        </Text>
        <FontAwesome6 name="calendar-days" size={20} color="#4FB2F3" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
