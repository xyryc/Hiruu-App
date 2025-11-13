import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../buttons/PrimaryButton";

const WorkingHourSettingsModal: React.FC<any> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView intensity={80} tint="dark" className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[60%]">
          {/* Close Button */}
          <View className="absolute -top-24 inset-x-0 items-center pt-4 pb-2">
            <TouchableOpacity onPress={onClose}>
              <View className="bg-[#000] rounded-full p-2.5">
                <Entypo name="cross" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <SafeAreaView edges={["bottom"]}>
            <PrimaryButton title="Apply" className="mx-5 mb-5" />
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default WorkingHourSettingsModal;
