import ScreenHeader from '@/components/header/ScreenHeader'
import RatingCard from '@/components/ui/cards/RatingCard'
import RatingStar from '@/components/ui/cards/RatingStar'
import RatingBar from '@/components/ui/inputs/RatingBar'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const Rating = () => {
    const [ratings] = useState([
        { label: 'Pay On Time', value: 3.9, max: 5 },
        { label: 'Work Environment', value: 3.5, max: 5 },
        { label: 'Communication', value: 4.5, max: 5 }
    ]);


    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <SafeAreaView
            className="flex-1 bg-white dark:bg-dark-background"
            edges={["bottom", "left", "right", "top"]}
        >
            <ScrollView>
                {/* Header */}
                <ScreenHeader
                    onPressBack={() => router.back()}
                    className="px-5 pb-6 rounded-b-3xl mt-4 overflow-hidden"
                    title="Rating"
                    titleClass="text-primary "
                    iconColor={isDark ? "#fff" : "#111111"}

                />
                <View className='flex-row justify-center items-center'>
                    <Image source={require('@/assets/images/profile/rating-leaves.svg')} contentFit='contain' style={{ height: 84, width: 61, transform: [{ scaleX: -1 }] }} />
                    <View>
                        <Text className='text-center font-proximanova-semibold text-primary dark:text-dark-primary'>Overall Rating</Text>
                        <Text className='text-center font-proximanova-bold text-5xl text-primary dark:text-dark-primary'>4.9</Text>
                    </View>
                    <Image source={require('@/assets/images/profile/rating-leaves.svg')} contentFit='contain' style={{ height: 84, width: 61 }} />
                </View>

                <RatingStar rating={5} />
                <Text className='text-center font-proximanova-regular text-sm text-secondary dark:text-dark-secondary mt-2'>Based on overall rating</Text>

                {/* Ratings and star */}
                <View className=" mx-5 bg-[#E5F4FD] mt-8 rounded-2xl p-5 shadow-lg">
                    {ratings.map((rating, index) => (
                        <RatingBar
                            key={index}
                            label={rating.label}
                            value={rating.value}
                            max={rating.max}
                        />
                    ))}
                </View>

                {/* rating prifile */}
                {/* <View className='mx-5 mt-8'>
                    <View className='flex-row justify-between'>
                        <View className='flex-row items-center gap-4'>
                            <Image source={require('@/assets/images/reward/nameplate-profile.png')} contentFit='contain' style={{ height: 50, width: 50 }} />
                            <View>
                                <Text className='font-proximanova-semibold text-primary dark:text-dark-primary' > Jessica R</Text>
                                <View className='flex-row gap-3 items-center'>
                                    <RatingStar rating={4} />
                                    <Text>( 4.0 )</Text>
                                </View>

                            </View>
                        </View>
                        <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'>2 Days ago</Text>
                    </View>
                </View> */}
                <View className='mx-5'>
                    <RatingCard className='mt-8' name='Jessica R' time='2 Days ago' rating={5} />
                    <RatingCard className='mt-8' name='Maria Gosh' time='4 Week ago' rating={4} />
                    <RatingCard className='mt-8' name='Jessica R' time='1 Month ago' rating={3} />
                    <RatingCard className='mt-8' name='Ethan Lert' time='4 Week ago' rating={5} />
                    <RatingCard className='mt-8' name='Maria Gosh' time='1 Month ago' rating={4} />
                </View>



            </ScrollView>

        </SafeAreaView>
    )
}

export default Rating;