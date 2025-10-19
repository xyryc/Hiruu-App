import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import React, { useState } from "react"
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import PrimaryButton from "../ui/buttons/PrimaryButton"

const LeaveRequestModal = () => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <View>
            {/* Button to open modal */}
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-dark-surface rounded-[10px] border border-[#EEEEEE] dark:border-dark-border"
            >
                <View className="flex-row items-center">
                    <PrimaryButton title='Submit Request' className='mt-8' />
                </View>
                <Ionicons name="chevron-down" size={18} color="#7D7D7D" />
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
                    className="flex-1 bg-black/40 justify-end"
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View className="bg-white dark:bg-dark-surface rounded-t-3xl py-8 items-center">
                            {/* Image */}
                            <Image
                                source={require('@/assets/images/success.svg')}
                                contentFit="contain"
                                style={{ width: 120, height: 120 }}
                            />

                            {/* Text */}
                            <Text className="text-lg font-p text-primary dark:text-dark-primary mt-4">
                                Leave Request Submitted!
                            </Text>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default LeaveRequestModal
