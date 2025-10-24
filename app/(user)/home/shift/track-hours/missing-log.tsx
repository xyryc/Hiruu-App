import ScreenHeader from '@/components/header/ScreenHeader'
import TaskCard from '@/components/ui/cards/TaskCard'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MissingLog = () => {
    const handleLogin = () => {
        router.push('./correction-request')
    };
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <SafeAreaView
            className="flex-1  dark:bg-dark-background"
            edges={["top", "left", "right", 'bottom']}
        >
            {/* Header */}
            <ScreenHeader
                className="mx-5 rounded-3xl"
                onPressBack={() => router.back()}
                title="Missing log Activities"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? "#fff" : "#111"}
                components={<View>
                    <Feather className='p-2 bg-[#B2B1B1]/40 rounded-full' name="filter" size={24} color="black" />

                </View>}
            />
            <ScrollView
                className="ml-5"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row justify-between mt-8">
                    <Text className="font-proximanova-semibold text-sm mx-5 text-secondary dark:text-dark-sectext-secondary">09 June 2025 Today</Text>
                </View>
                <View className='mb-4 mt-3'>


                    <TaskCard
                        shiftTitle="Hotel & Bar Management"
                        startTime="10:00 AM"
                        endTime="6:00 PM"
                        shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
                        teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
                        totalMembers={30}
                        address="230 Aaron Bushnell St"
                        city="Palestine, PL"
                        onLoginPress={handleLogin}
                        status="completed"
                        requestLog={true}
                    />
                </View>
                <View className='mb-4'>


                    <TaskCard
                        shiftTitle="Hotel & Bar Management"
                        startTime="10:00 AM"
                        endTime="6:00 PM"
                        shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
                        teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
                        totalMembers={30}
                        address="230 Aaron Bushnell St"
                        city="Palestine, PL"
                        onLoginPress={handleLogin}
                        status="completed"
                        requestLog={true}
                    />
                </View>
                <View className="flex-row justify-between mt-7">
                    <Text className="font-proximanova-semibold text-sm mx-5 text-secondary dark:text-dark-sectext-secondary">08 June 2025 Today</Text>
                </View>
                <View className='mb-4 mt-3'>


                    <TaskCard
                        shiftTitle="Hotel & Bar Management"
                        startTime="10:00 AM"
                        endTime="6:00 PM"
                        shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
                        teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
                        totalMembers={30}
                        address="230 Aaron Bushnell St"
                        city="Palestine, PL"
                        onLoginPress={handleLogin}
                        status="completed"
                        requestLog={true}
                    />
                </View>
                <View className='mb-4'>


                    <TaskCard
                        shiftTitle="Hotel & Bar Management"
                        startTime="10:00 AM"
                        endTime="6:00 PM"
                        shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
                        teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
                        totalMembers={30}
                        address="230 Aaron Bushnell St"
                        city="Palestine, PL"
                        onLoginPress={handleLogin}
                        status="completed"
                        requestLog={true}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default MissingLog