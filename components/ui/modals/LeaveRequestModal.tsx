import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../buttons/PrimaryButton";

const LeaveRequestModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      {/* Button to open modal */}
      <TouchableOpacity className="flex-row items-center justify-between rounded-full  bg-white dark:bg-dark-surface">
        <View className="flex-row items-center">
          <PrimaryButton
            onPress={() => setIsVisible(true)}
            title="Submit Request"
            className="my-10"
          />
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
          className="flex-1 bg-black/80 justify-end "
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className="bg-white dark:bg-dark-surface rounded-t-3xl py-8 items-center">
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                className="absolute top-3 -mt-20 p-3 rounded-full bg-[#00000080] dark:bg-dark-border"
              >
                <Ionicons name="close" size={28} color="#ffffff" />
              </TouchableOpacity>
              {/* Image */}
              <Image
                source={require("@/assets/images/success.svg")}
                style={{ width: 160, height: 120 }}
                contentFit="contain"
              />
              {/* Text */}
              <View className="px-4">
                <Text className="text-xl text-center font-proximanova-semibold text-primary dark:text-dark-primary mt-2.5">
                  Your leave request has been submitted
                </Text>
                <Text className="font-proximanova-regular text-sm text-center  text-secondary dark:text-dark-secondary mt-2.5">
                  You’ll be notified once your manager reviews and updates the
                  request status.
                </Text>
                <View className="flex-row items-center mt-5">
                  <PrimaryButton
                    onPress={() => setIsVisible(false)}
                    title="Done"
                    className=" dark:bg-dark-border"
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default LeaveRequestModal;
