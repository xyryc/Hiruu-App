import TitleHeader from "@/components/header/TitleHeader";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LogoutDeletModal = ({ visible, onClose, data }: any) => {
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
          <SafeAreaView className="px-5 pt-5 items-center">
            <View
              className="w-[100px] h-[100px] flex-row justify-center items-center rounded-full border-2 "
              style={{
                backgroundColor: data?.color,
                borderColor: data?.border,
              }}
            >
              <Image
                source={data?.img}
                style={{
                  width: 56,
                  height: 56,
                }}
                contentFit="contain"
              />
            </View>

            <Text className="text-center font-proximanova-semibold text-xl text-primary dark:text-dark-primary px-8 mt-5">
              {data?.title}
            </Text>
            <Text className="text-center text-sm font-proximanova-regular text-secondary dark:text-dark-secondary mt-2.5">
              {data?.subtitle}
            </Text>
            <View className="flex-row  justify-between mt-5 gap-5">
              <TouchableOpacity
                onPress={handleDone}
                className=" border border-[#11111133] rounded-full px-14 py-3.5 "
              >
                <Text className="font-proximanova-semibold text-primary dark:text-dark-primary">
                  Cansel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full px-14 py-3.5 "
                style={{
                  backgroundColor: data?.buttonColor,
                }}
              >
                <Text className="font-proximanova-semibold text-white">
                  Yes {data?.buttonName}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default LogoutDeletModal;
