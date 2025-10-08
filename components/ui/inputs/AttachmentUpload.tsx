import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AttachmentUpload = ({ onPress }) => {
  return (
    <View className="mb-5">
      <Text className="text-base font-proximanova-semibold text-primary dark:text-dark-primary mb-4">
        Attachments
      </Text>

      <TouchableOpacity
        onPress={onPress}
        className="items-center justify-center py-8 bg-white dark:bg-dark-surface rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-border"
        activeOpacity={0.7}
      >
        <View className="w-16 h-16 items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
          <Ionicons name="add-circle-outline" size={32} color="#3B82F6" />
        </View>

        <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
          Upload Your File
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttachmentUpload;
