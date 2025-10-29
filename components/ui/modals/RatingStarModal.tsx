import { BlurView } from "expo-blur";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../buttons/PrimaryButton";
import { AntDesign, Entypo } from "@expo/vector-icons";


const RatingStarModal = ({ visible, onClose }: any) => {
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
            <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary text-center">
              {" "}
              Add your Rating{" "}
            </Text>
            <Text className="text-center text-sm mt-2.5 font-proximanova-regular text-secondary dark:text-dark-secondary">Your rating helps improve workplace transparency</Text>
            <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary mt-8">Pay On Time</Text>
            <AntDesign
              name="star"
              size={50}
              color="#EEEEEE"
            />








            <PrimaryButton title="Confirm & Apply" className="mt-5" onPress={handleDone} />
          </SafeAreaView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default RatingStarModal;
