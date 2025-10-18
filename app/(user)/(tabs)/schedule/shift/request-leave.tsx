import ScreenHeader from '@/components/header/ScreenHeader'
import DatePicker from '@/components/layout/DatePicker'
import TimePicker from '@/components/layout/TimePicker'
import { ToggleButton } from '@/components/ui/buttons/ToggleButton'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RequestLeave = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isOn, setIsOn] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-background">
            {/* Header */}
            <ScreenHeader
                className='mx-4'
                onPressBack={() => router.back()}
                title="Request Leave"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? '#fff' : '#111'}
            />

            {/* Section title */}
            <Text className='mx-5 mt-8 font-semibold text-[#111111]'>Select Dates</Text>

            {/* Duration + toggle */}
            <View className='mx-5 mt-3 flex-row justify-between items-center'>
                <Text className='text-sm font-normal text-[#4FB2F3]'>
                    Duration: {isOn ? '1' : '3'} Days
                </Text>
                <ToggleButton isOn={isOn} setIsOn={setIsOn} />
            </View>
            {/* Half Day Start */}
            <View className='px-4 py-2 mt-2'>
                {isOn ? <DatePicker /> : ''}
            </View>
            <View className='flex-row justify-between gap-3 px-4 py-2 mt-2'>
                {isOn ? (
                    <>
                        <TimePicker title='Start Time' />
                        <TimePicker title='End Time' />
                    </>
                ) : null}
            </View>
            {/* Half day end */}
            {/* 3 Day Leav Start */}
            <View className='flex-row justify-between gap-3  px-4 py-2 -mt-10'>
                {
                    isOn ? '' : (
                        <>
                            <DatePicker className='flex-1' title='Start Day' />
                            <DatePicker className='flex-1' title='End Day' />
                        </>
                    )
                }
            </View>
            {/* 3 Day Leav End */}

        </SafeAreaView>
    )
}

export default RequestLeave
