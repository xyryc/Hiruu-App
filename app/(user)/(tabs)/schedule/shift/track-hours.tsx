import ScreenHeader from '@/components/header/ScreenHeader'
import StatusBadge from '@/components/ui/badges/StatusBadge'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const TrackHours = () => {
    const linevartical = require('@/assets/images/trackhours/tracklinevarticl.png')
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <SafeAreaView className="flex-1  dark:bg-dark-background" edges={["top", "left", "right"]}>
            {/* Header */}
            <ScreenHeader
                className="mx-5 rounded-3xl"
                onPressBack={() => router.back()}
                title="Track Hours"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? '#fff' : '#111'}
                components={<></>}
            />
            <View className=' mt-8 '>
                <View className='mx-5'>
                    <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>
                        This Month’s Overview
                    </Text>
                    <View className='mt-2 bg-[#E5F4FD] dark:bg-dark-background rounded-3xl'  >
                        <View className='flex-row justify-between flex-wrap pr-4'>
                            <View className="flex-row items-center">
                                {/* {line && <Image source={line} contentFit="contain" style={{ height: 110, width: 1 }} />} */}

                                <View className="m-2.5 border ">
                                    {/* Icon Circle */}
                                    <View className="h-8 w-8 rounded-full bg-[#FFFFFF] overflow-hidden items-center justify-center">
                                        <MaterialCommunityIcons name="clock" size={16} color="#4FB2F3" />
                                    </View>

                                    {/* Text Labels */}
                                    <Text className="mt-1.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary"></Text>
                                    <Text className="mt-2.5 font-proximanova-semibold text-lg text-primary dark:text-dark-primary"></Text>
                                </View>
                            </View>
                        </View>
                        <View>

                            <Image source={linevartical} contentFit='contain' style={{ height: 3, width: 325 }} />
                            <View className='flex-row gap-2 items-center mx-4 my-6 '>
                                <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>Status:</Text>
                                <StatusBadge status='accepted' label='On Track' />
                                <StatusBadge status='upcoming' label='Below Target' />
                            </View>
                        </View>
                    </View>
                </View>
                <View className='mt-8 mx-5'>
                    <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Daily shift Log</Text>
                    <View>
                        <View className='flex-row'>
                            <Ionicons name="calendar" size={22} color="#4FB2F3" />
                            <Text className='font-proximanova-semibold text-base text-primary dark:text-dark-primary'>Mon, 10 june 2025(today)</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default TrackHours