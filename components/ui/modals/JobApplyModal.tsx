import { Entypo, Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleStatusBadge from "../badges/SimpleStatusBadge";
import PrimaryButton from "../buttons/PrimaryButton";

const JobApplyModal = ({ visible, onClose }: any) => {
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
            {/* image */}
            <Image
              source="https://images-platform.99static.com//gkoGE5-VZ1k4SXxg0mrUj7O0V38=/250x0:1750x1500/fit-in/500x500/99designs-contests-attachments/102/102585/attachment_102585463"
              style={{
                width: 100,
                height: 100,
                borderRadius: 999,
              }}
              contentFit="cover"
            />

            {/* name */}
            <Text className="text-xl font-proximanova-semibold text-primary dark:text-dark-primary mt-2.5">
              Farout Beach Club
            </Text>

            {/* location */}
            <View className="flex-row items-center justify-center mt-2.5 gap-7">
              <View className="flex-row items-center gap-2.5 border-r-hairline border-[#7A7A7A] pr-7">
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color="#7A7A7A"
                />
                <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                  New York, North Bergen
                </Text>
              </View>

              <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                4.8/5 <Fontisto name="star" size={14} color="#F1C400" />
              </Text>
            </View>

            {/* badges */}
            <View className="flex-row flex-wrap justify-center gap-2.5 mt-2.5">
              <SimpleStatusBadge title="Hiring: Bartender" bgColor="#F5F5F5" />
              <SimpleStatusBadge title="Salary: 5-10$/hr" bgColor="#F5F5F5" />
              <SimpleStatusBadge
                title="Shift: 10:00 AM – 11:00 PM"
                bgColor="#F5F5F5"
              />
              <SimpleStatusBadge title="4km away" bgColor="#F5F5F5" />
            </View>

            {/* note */}
            <Text className="text-sm font-proximanova-regular text-secondary dark:text-dark-secondary text-center">
              To apply for this job, please share Details so the business can
              contact you.
            </Text>

            {/* button */}
            <PrimaryButton title="Apply Now" className="mt-7" />
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default JobApplyModal;
