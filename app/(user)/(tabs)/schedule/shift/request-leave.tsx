import ScreenHeader from '@/components/header/ScreenHeader'
import DatePicker from '@/components/layout/DatePicker'
import TimePicker from '@/components/layout/TimePicker'
import { ToggleButton } from '@/components/ui/buttons/ToggleButton'
import ActionCard from '@/components/ui/cards/ActionCard'
import LeaveRequestModal from '@/components/ui/modals/LeaveRequestModal'
import SelectBusiness from '@/components/ui/modals/SelectBusiness'
import SelectLeaveType from '@/components/ui/modals/SelectLeaveType'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RequestLeave = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isOn, setIsOn] = useState(false);
    const [leaveText, setLeaveText] = useState('')


    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-background"
            edges={["top", "left", "right"]}
        >
            {/* Header */}
            <ScreenHeader
                className='mx-4'
                onPressBack={() => router.back()}
                title="Request Leave"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? '#fff' : '#111'}
            />

            <ScrollView>
                {/* Section title */}
                <Text className='mx-5 mt-[30px] font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Select Dates</Text>

                {/* Duration + toggle */}
                <View className='mx-5 mt-[10px] flex-row justify-between items-center'>
                    <Text className='text-sm font-normal text-[#4FB2F3]'>
                        Duration: {isOn ? '1' : '3'} Days
                    </Text>
                    <ToggleButton isOn={isOn} setIsOn={setIsOn} />
                </View>
                {/* Half Day Start */}
                <View className='mx-5 mt-[10px]'>
                    {isOn ? <DatePicker /> : ''}
                </View>
                <View className={`flex-row justify-between gap-3 mx-5 ${isOn && 'mt-[15px]'}`}>
                    {isOn ? (
                        <>
                            <TimePicker title='Start Time' />
                            <TimePicker title='End Time' />
                        </>
                    ) : null}
                </View>
                {/* Half day end */}
                {/* 3 Day Leav Start */}
                <View className='flex-row justify-between gap-3 mx-5'>
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
                {/* Select Leave Type start */}
                <View className="mx-5  mt-7">
                    <SelectLeaveType />
                </View>
                {/* Select Leave Type end */}
                {/* Reason start */}
                <View className='mx-5 py-2 mt-2'>
                    <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Reason</Text>
                    <TextInput
                        value={leaveText}
                        onChangeText={setLeaveText}
                        placeholder="Mention any reason or notes for manager....."
                        multiline
                        textAlignVertical="top"
                        className="border border-[#EEEEEE] mt-2.5 h-[100px] rounded-xl px-4 py-3 bg-white text-gray-700"
                        keyboardType="default"
                        autoCapitalize="none"
                    />
                </View>
                {/* Reason End */}
                {/* Select business start */}
                <View className='mx-5 py-2 mt-2'>
                    <SelectBusiness />
                </View>
                {/* Select business end */}

                {/* Remaining shick leave start */}
                <View className='mx-5  mt-8'>
                    <ActionCard
                        title="You have only 1 Sick Leave remaining this month"
                        rightImage={require("@/assets/images/remaining-sick.png")}
                        imageWidth={82}
                        imageHeight={55}
                        background={require("@/assets/images/chessboard-bg.svg")}
                    />
                </View>
                {/* Remaining shick leave start */}
                <View className='mx-5 mt-5'>

                    <LeaveRequestModal />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RequestLeave
