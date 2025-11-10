import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CoinProgressSlider from "../inputs/CoinProgressSlider";

const SuccessRejectModal = ({ visible, onClose }: any) => {
  const handleDone = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView intensity={80} tint="dark" className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl">
          {/* Close Button */}
          <View className="absolute -top-24 inset-x-0 items-center pt-4 pb-2">
            <TouchableOpacity onPress={handleDone}>
              <View className="bg-[#000] rounded-full p-2.5">
                <Entypo name="cross" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <SafeAreaView edges={["bottom"]} className="px-5 py-7">
            <View className="flex-row justify-between">
              <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary text-center">
                Unlock this badge to earn Hirru coins.
              </Text>

              {/* coin */}
              <View className="flex-row items-center">
                <Image
                  source={require("@/assets/images/hiruu-coin.svg")}
                  style={{
                    width: 22,
                    height: 22,
                  }}
                  contentFit="contain"
                />
              </View>
            </View>
            <View className="items-center"></View>

            <CoinProgressSlider max={500} achieved={300} className="mt-4" />

            <Text className="text-center font-proximanova-regular text-sm text-secondary dark:text-dark-secondary px-3">
              Earn this badge by working consisent hours over time. keep going
              to level up and earn rewardz
            </Text>
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default SuccessRejectModal;
