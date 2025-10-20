import ScreenHeader from '@/components/header/ScreenHeader'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TrackHours = () => {
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
            <View className='bg-white mt-8 '>
                <View className='mx-5'>
                    <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>
                        This Month’s Overview
                    </Text>
                    <View>

                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default TrackHours