import ScreenHeader from '@/components/header/ScreenHeader'
import StatusBadge from '@/components/ui/badges/StatusBadge'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const AttendanceLog = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <SafeAreaView className="flex-1  dark:bg-dark-background" edges={["top", "left", "right"]}>
            {/* Header */}
            <ScreenHeader
                className="mx-5 rounded-3xl"
                onPressBack={() => router.back()}
                title="Attendance Log"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? '#fff' : '#111'}
                components={<></>}
            />
            <View className='mx-5 mt-8 '>

                <View>
                    <Text className='font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary'>09 june 2025</Text>
                    <View className='mt-3 p-4 border-hairline border-[#928888] rounded-xl'>
                        <View className='flex-row justify-between'>
                            <View className='flex-row justify-between gap-5'>
                                <View>
                                    <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>Start Time</Text>
                                    <Text className='font-proximanova-semibold text-base text-primary dark:text-dark-primary'>01:00</Text>
                                </View>
                                <View className='border-r-hairline border-[#9e9999]' />
                                <View>
                                    <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>Start Time</Text>
                                    <Text className='font-proximanova-semibold text-base text-primary dark:text-dark-primary'>12:00</Text>
                                </View>
                            </View>

                            <View>
                                <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>Working Time</Text>
                                <Text className='font-proximanova-semibold text-base text-[#3EBF5A] '>03:00:00</Text>
                            </View>
                        </View>
                        <View className='border-b-hairline mt-2' />
                        <View className='mt-2 flex-row justify-between items-center'>
                            <View className='flex-row gap-2 items-center'>
                                <Image source={require('@/assets/images/hapinessBar.png')} contentFit='contain' style={{ height: 30, width: 30 }} />
                                <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>Space Hotel</Text>
                            </View>
                            <View>
                                <StatusBadge status='accepted' label='Overtime' />
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>

    )
}

export default AttendanceLog