import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import React, { useEffect, useState } from "react"
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

interface Option {
    label: string
    value: string
    avatar?: string
}

interface BusinessDropdownProps {
    label?: string
    placeholder?: string
    options: Option[]
    value?: string
    onSelect: (value: string) => void
}

const BusinessDropdown: React.FC<BusinessDropdownProps> = ({
    label,
    placeholder,
    options,
    value,
    onSelect,
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)

    useEffect(() => {
        setFilteredOptions(
            options.filter((o) =>
                o.label.toLowerCase().includes(searchText.toLowerCase())
            )
        )
    }, [searchText, options])

    const handleSelect = (item: Option) => {
        onSelect(item.value)
        setIsVisible(false)
        setSearchText("")
    }

    const selectedOption = options.find((o) => o.value === value)

    return (
        <View>
            {label && (
                <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary mb-2">
                    {label}
                </Text>
            )}

            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                className="flex-row items-center justify-between px-3 py-3 bg-white dark:bg-dark-surface rounded-[10px] border border-[#EEEEEE] dark:border-dark-border"
            >
                <View className="flex-row items-center">
                    {selectedOption?.avatar && (
                        <Image
                            source={selectedOption.avatar}
                            contentFit="contain"
                            style={{ height: 35, width: 35 }}
                        />
                    )}
                    <Text
                        className={`text-sm ml-5 ${value
                            ? "text-primary dark:text-dark-primary"
                            : "text-placeholder dark:text-dark-placeholder"
                            }`}
                    >
                        {selectedOption?.label || placeholder}
                    </Text>
                </View>
                <Ionicons name="chevron-down" size={18} color="#7D7D7D" />
            </TouchableOpacity>

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
                        <View className="bg-white dark:bg-dark-surface rounded-t-3xl">
                            {/* Header */}
                            <View className="px-5 py-4 border-b border-gray-200 dark:border-dark-border">
                                <Text className="text-lg font-semibold text-primary dark:text-dark-primary text-center">
                                    {label || "Select Option"}
                                </Text>
                            </View>

                            {/* Search Bar */}
                            <View className="px-5 py-3 border-b border-gray-100 dark:border-dark-border/50">
                                <TextInput
                                    placeholder="Search..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    className="border border-gray-300 rounded-xl px-3 py-2 bg-white dark:bg-dark-surface text-gray-700 dark:text-white"
                                />
                            </View>

                            {/* Options */}
                            <FlatList
                                data={filteredOptions}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSelect(item)}
                                        className="p-4 flex-row items-center border-b border-gray-100 dark:border-dark-border/50"
                                    >
                                        {item.avatar && (
                                            <Image
                                                source={item.avatar}
                                                contentFit="contain"
                                                style={{ height: 40, width: 40 }}
                                            />
                                        )}
                                        <Text className="text-base ml-5 text-primary dark:text-dark-primary flex-1">
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default BusinessDropdown
