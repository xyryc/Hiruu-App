import ScreenHeader from '@/components/header/ScreenHeader'
import StatusBadge from '@/components/ui/badges/StatusBadge'
import PrimaryButton from '@/components/ui/buttons/PrimaryButton'
import ActionCard from '@/components/ui/cards/ActionCard'
import ShiftLogCard from '@/components/ui/cards/ShiftLogCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
            <View className=' mt-8 '>
                <View className='mx-5'>
                    <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>
                        This Month’s Overview
                    </Text>
                    <View className='mt-2 bg-[#E5F4FD] dark:bg-dark-background rounded-2xl  border-hairline border-[#4FB2F3]'  >
                        <View className='flex-row justify-between flex-wrap pr-4'>
                            <View className="flex-row items-center justify-between border-b-hairline border-[#4FB2F3]  ">
                                {/* {line && <Image source={line} contentFit="contain" style={{ height: 110, width: 1 }} />} */}

                                <View className="m-2.5 ml-4 border-r-hairline mb-0 pb-3 border-[#4FB2F3] pr-14  ">
                                    {/* Icon Circle */}
                                    <View className="h-8 w-8 rounded-full bg-[#FFFFFF] overflow-hidden items-center justify-center">
                                        <MaterialCommunityIcons name="clock" size={16} color="#4FB2F3" />
                                    </View>

                                    {/* Text Labels */}
                                    <Text className="mt-1.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary"> Total Hours</Text>
                                    <Text className="mt-2.5 font-proximanova-semibold text-lg text-primary dark:text-dark-primary"> 32h 45m</Text>
                                </View>
                                <View className="m-2.5  mb-0 pb-3 border-r-hairline border-[#4FB2F3] pr-14  ">
                                    {/* Icon Circle */}
                                    <View className="h-8 w-8 rounded-full bg-[#FFFFFF] overflow-hidden items-center justify-center">
                                        <MaterialCommunityIcons name="clock" size={16} color="#4FB2F3" />
                                    </View>

                                    {/* Text Labels */}
                                    <Text className="mt-1.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary"> Total Hours</Text>
                                    <Text className="mt-2.5 font-proximanova-semibold text-lg text-primary dark:text-dark-primary"> 32h 45m</Text>
                                </View>
                                <View className="m-2.5 mb-0 pb-0 border-[#4FB2F3] pr-10  ">
                                    {/* Icon Circle */}
                                    <View className="h-8 w-8 rounded-full bg-[#FFFFFF] overflow-hidden items-center justify-center  border-[#4FB2F3]">
                                        <MaterialCommunityIcons name="clock" size={16} color="#4FB2F3" />
                                    </View>

                                    {/* Text Labels */}
                                    <Text className="mt-1.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary"> Total Hours</Text>
                                    <Text className="mt-2.5 font-proximanova-semibold text-lg text-primary dark:text-dark-primary"> 32h 45m</Text>
                                </View>
                            </View>
                        </View>
                        <View>
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
                    <ShiftLogCard />
                    <PrimaryButton title='View Attendance log' className='mt-4' />
                    <View className='mt-8'>
                        <ActionCard
                            title="Shows  Earned  Tokens  This  Week !"
                            buttonTitle="View"
                            rightImage={require("@/assets/images/engagement.svg")}
                            imageClass="right-4.5 -bottom-5"
                            imageWidth={131}
                            imageHeight={117}
                            background={require("@/assets/images/engagement-bg.svg")}
                            backgroundClass="right-9"
                            backgroundWidth={103}
                            backgroundHeight={80}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default TrackHours