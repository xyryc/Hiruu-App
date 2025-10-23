import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobApplyModal = ({ visible, onClose }: any) => {
  const handleDone = () => {
    onClose(); // Close the modal
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView intensity={80} tint="dark" className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[45%]">
          {/* Close Button */}
          <View className="absolute -top-24 inset-x-0 items-center pt-4 pb-2">
            <TouchableOpacity onPress={handleDone}>
              <View className="bg-[#000] rounded-full p-2.5">
                <Entypo name="cross" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <SafeAreaView edges={["bottom"]} className="px-5 py-7 items-center">
            <Image
              source="https://images-platform.99static.com//gkoGE5-VZ1k4SXxg0mrUj7O0V38=/250x0:1750x1500/fit-in/500x500/99designs-contests-attachments/102/102585/attachment_102585463"
              style={{
                width: 156,
                height: 120,
              }}
              contentFit="contain"
            />

            <Text className="text-xl font-proximanova-semibold text-primary dark:text-dark-primary">
              Farout Beach Club
            </Text>
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default JobApplyModal;
