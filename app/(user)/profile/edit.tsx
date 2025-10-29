import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@/components/header/ScreenHeader'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import NamePlateCard from '@/components/ui/cards/NamePlateCard'
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons'
import BandageCard from '@/components/ui/cards/BandageCard'
import Dropdown from '@/components/ui/dropdown/DropDown'

const Edit = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const [selectedIssue, setSelectedIssue] = useState("");
    const issues = [
        { label: "Missed Punch", value: "Missed Punch" },
        { label: "Late arrival", value: "Late arrival" },
        { label: "Early Departure", value: "Early Departure" },
        { label: "Forget to Tap", value: "Forget to Tap" },
        { label: "Network Issues", value: "Network Issues" },
    ];
    return (
        <SafeAreaView
            className="flex-1 bg-[#E5F4FD] dark:bg-dark-background"
            edges={["top", "left", "right", 'bottom']}
        >
            {/* Header */}
            <ScreenHeader
                className="mx-4 mb-6"
                onPressBack={() => router.back()}
                title="Edit Profile"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? "#fff" : "#111"}
            />
            <View className='bg-white'>
                <View className='mx-5'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Your Nameplate</Text>
                        <TouchableOpacity>
                            <Text className='font-proximanova-semibold text-sm text-[#4FB2F3] underline'>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <NamePlateCard variant='variant5' className='mt-2.5' />
                </View>


                {/* Bandage item */}
                <View>
                    <View className='mx-5 flex-row justify-between mt-8 items-center'>
                        <View className='flex-row gap-2.5 items-center'>
                            <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center '>

                                <MaterialCommunityIcons
                                    className='rotate-180'
                                    name="medal-outline"
                                    size={16}
                                    color="black"
                                />
                            </View>
                            <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Bandage</Text>
                        </View>
                        <Text className='font-proximanova-semibold text-sm text-[#4FB2F3] underline '>Edit</Text>
                    </View>
                    <BandageCard className='mx-5 mt-3.5' />
                </View>
                {/* short intro */}
                <View>
                    <View className='flex-row justify-between items-center mx-5 mt-8 '>
                        <View className='flex-row gap-2.5'>
                            <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center'>
                                <Foundation name="clipboard" size={16} color="black" />
                            </View>
                            <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Short Intro</Text>
                        </View>
                        <Text className='font-proximanova-semibold text-sm text-[#4FB2F3] underline '>Edit</Text>
                    </View>
                    <View className='mx-5 mt-4'>

                        <Text
                            className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary border-hairline rounded-xl p-3'
                        >
                            Join the core team at Space Hotel, a unique dining experience known for its space-themed interiors and premium service.
                            Join the core team at Space Hotel, a unique dining experien
                        </Text>
                    </View>
                </View>
                {/* Experience */}
                <View>
                    <View className='flex-row justify-between items-center mx-5 mt-8 '>
                        <View className='flex-row gap-2.5'>
                            <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center'>
                                <Foundation name="clipboard" size={16} color="black" />
                            </View>
                            <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Experience</Text>
                        </View>
                        <Text className='font-proximanova-semibold text-sm text-[#4FB2F3] underline '>Edit</Text>
                    </View>
                </View>
                <View className='mx-5 mt-4'>
                    <Dropdown
                        // label="Select Style"
                        placeholder="2 Company selected"
                    // options={issues}
                    // value={selectedIssue}
                    // onSelect={setSelectedIssue}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Edit