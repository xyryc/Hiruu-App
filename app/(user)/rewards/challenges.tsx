import ScreenHeader from '@/components/header/ScreenHeader'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const challenges = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const tabs = ['One-Time', 'Repeatable']
    const [isActive, setIsActive] = useState('One-Time')

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-background">
            {/* Header */}
            <ScreenHeader
                onPressBack={() => router.back()}
                className="px-5 pb-6 rounded-b-3xl overflow-hidden"
                title="Standard Challenges"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? "#fff" : "#111111"}
            />
            <ScrollView>
                <View className='bg-[#aed7f1] mx-4 rounded-xl flex-row'>
                    <View className='mt-3 mb-2'>

                        <Image source={require('@/assets/images/engagement.svg')} contentFit='contain' style={{ width: 80, height: 80, marginLeft: -7, transform: [{ rotate: '90deg' }] }} />
                    </View>
                    <View className="flex-1 flex-row mt-2 justify-between">
                        <View>
                            <Text className="font-proximanova-bold text-xl text-primary dark:text-dark-primary">Redeem Your Tokens</Text>
                            <Text className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary mt-1.5'>Redeem for perks & premium features</Text>
                            <TouchableOpacity className="mt-1.5 bg-[#11293A] rounded-full px-2 py-1.5 justify-center items-center w-[92px]" >
                                <Text className="font-proximanova-bold text-sm text-white text-center">
                                    50% Extra
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" className='right-5 top-2' size={15} color="black" />
                    </View>
                </View>
                <View className='mt-5 flex-row mx-5'>
                    {
                        tabs.map((tab, index) => (
                            <TouchableOpacity key={index} className={`w-1/2 border-b  pb-2 ${isActive === tab && 'border-[#11293A] border-b-2'}`}
                                onPress={() => setIsActive(tab)}
                            >
                                <Text className={`text-center ${isActive === tab ? 'font-proximanova-semibold text-base text-primary dark:text-dark-primary' : 'font-proximanova-regular text-secondary dark:text-dark-secondary'} `} >{tab}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {/* challenges list */}
                <View className='mx-5 flex-row gap-4 mt-4'>
                    <View>
                        <Image source={require('@/assets/images/reward/complate-profile.svg')} contentFit='contain' style={{ height: 87, width: 63 }} />
                    </View>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='font-proximanova-semibold text-primary dark:text-dark-primary mt-2'>Complete 100% profile</Text>
                            <View className=' bg-[#11293A] top-4 rounded-full'>
                                <Text className='px-4 py-2 font-proximanova-semibold text-sm text-[#ffffff] text-center'>Complete</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center ">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#DDF1FF] -ml-3 -z-10 rounded-r-[40px]">
                                <Text className="text-xs font-proximanova-semibold">10</Text>
                            </View>
                            <FontAwesome6 name="crown" className='ml-2' size={15} color="#4FB2F3" />
                        </View>
                        <View className="flex-row items-center gap-3 justify-between mt-2">
                            <View className="w-[220px] bg-[#DDF1FF] -z-10 rounded-[40px]">
                                <Image
                                    source={require("@/assets/images/hiruu-coin.svg")}
                                    style={{
                                        width: 22,
                                        height: 22,
                                    }}
                                    contentFit="contain"
                                />

                            </View>
                            <Text className='font-proximanova-regular text-sm text-primary dark:text-dark-primary'><Text className='text-[#4FB2F3]'>0</Text>/1</Text>

                        </View>
                    </View>
                </View>
                <Image source={require('@/assets/images/dotted-line.svg')} contentFit='contain' style={{ width: 320, height: 2, marginHorizontal: 'auto', marginTop: 20 }} />
                {/* 2 */}
                <View className='mx-5 flex-row gap-4 mt-5'>
                    <View>
                        <Image source={require('@/assets/images/reward/seven-day.svg')} contentFit='contain' style={{ height: 87, width: 63 }} />
                    </View>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='font-proximanova-semibold text-primary dark:text-dark-primary mt-2'>Log In Daily for 7 Days</Text>
                            <View className=' bg-[#11293A] top-4 rounded-full'>
                                <Text className='px-4 py-2 font-proximanova-semibold text-sm text-[#ffffff] text-center'>Upload</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center ">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#DDF1FF] -ml-3 -z-10 rounded-r-[40px]">
                                <Text className="text-xs font-proximanova-semibold">20</Text>
                            </View>
                            <FontAwesome6 name="crown" className='ml-2' size={15} color="#4FB2F3" />
                        </View>
                        <View className="flex-row items-center gap-3 justify-between mt-2">
                            <View className="w-[220px] bg-[#DFDFDF] -z-10 rounded-[40px]">
                                <Image
                                    source={require("@/assets/images/hiruu-coin.svg")}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        left: 200
                                    }}
                                    contentFit="contain"
                                />

                            </View>
                            <Text className='font-proximanova-regular text-sm text-primary dark:text-dark-primary'><Text className='text-[#4FB2F3]'>7</Text>/7</Text>

                        </View>
                    </View>
                </View>
                <Image source={require('@/assets/images/dotted-line.svg')} contentFit='contain' style={{ width: 320, height: 2, marginHorizontal: 'auto', marginTop: 20 }} />
                {/* 3 */}
                <View className='mx-5 flex-row gap-4 mt-5'>
                    <View>
                        <Image source={require('@/assets/images/reward/upload.svg')} contentFit='contain' style={{ height: 87, width: 63 }} />
                    </View>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='font-proximanova-semibold text-primary dark:text-dark-primary mt-2'>Upload Profile Picture</Text>
                            <View className=' bg-[#11293A] top-4 rounded-full'>
                                <Text className='px-4 py-2 font-proximanova-semibold text-sm text-[#ffffff] text-center'>Buy Now</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center ">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#DDF1FF] -ml-3 -z-10 rounded-r-[40px]">
                                <Text className="text-xs font-proximanova-semibold">20</Text>
                            </View>
                            <FontAwesome6 name="crown" className='ml-2' size={15} color="#4FB2F3" />
                        </View>

                        {/*  rank bord line --  */}

                        <View className='flex-row justify-center items-center gap-4 mt-2.5'>
                            <View className="relative">
                                <View className="w-[220px] bg-[#DDF1FF] rounded-[40px] relative ">
                                    <Image
                                        source={require('@/assets/images/hiruu-coin.svg')}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            left: 100,
                                            zIndex: 1
                                        }}
                                        contentFit="contain"
                                    />
                                </View>
                                <View className="bg-[#4FB2F3] py-3 w-[120px] bottom-8 rounded-full  mt-2" />
                            </View>


                            <Text className='font-proximanova-regular text-sm -mt-9 text-primary dark:text-dark-primary'>
                                <Text className='text-[#4FB2F3]'>3</Text>/6
                            </Text>


                        </View>


                        {/* rank bord line --  */}




                    </View>
                </View>
                <Image source={require('@/assets/images/dotted-line.svg')} contentFit='contain' style={{ width: 320, height: 2, marginHorizontal: 'auto' }} />
                {/* 4 */}
                <View className='mx-5 flex-row gap-4 mt-5'>
                    <View>
                        <Image source={require('@/assets/images/reward/accept.svg')} contentFit='contain' style={{ height: 87, width: 63 }} />
                    </View>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='font-proximanova-semibold text-primary dark:text-dark-primary mt-2'>Accept First Shift</Text>
                            <View className=' bg-[#11293A] top-4 rounded-full'>
                                <Text className='px-4 py-2 font-proximanova-semibold text-sm text-[#ffffff] text-center'>Accept</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center ">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#DDF1FF] -ml-3 -z-10 rounded-r-[40px]">
                                <Text className="text-xs font-proximanova-semibold">20</Text>
                            </View>
                            <FontAwesome6 name="crown" className='ml-2' size={15} color="#4FB2F3" />
                        </View>
                        {/*  rank bord line --  */}

                        <View className='flex-row justify-center items-center gap-4 mt-2.5'>
                            <View className="relative">
                                <View className="w-[220px] bg-[#DDF1FF] rounded-[40px] relative ">
                                    <Image
                                        source={require('@/assets/images/hiruu-coin.svg')}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            left: 140,
                                            zIndex: 1
                                        }}
                                        contentFit="contain"
                                    />
                                </View>
                                <View className="bg-[#4FB2F3] py-3 w-[160px] bottom-8 rounded-full  mt-2" />
                            </View>


                            <Text className='font-proximanova-regular text-sm -mt-9 text-primary dark:text-dark-primary'>
                                <Text className='text-[#4FB2F3]'>4</Text>/6
                            </Text>


                        </View>


                        {/* rank bord line --  */}
                    </View>
                </View>
                <Image source={require('@/assets/images/dotted-line.svg')} contentFit='contain' style={{ width: 320, height: 2, marginHorizontal: 'auto' }} />
                {/* 5 */}
                <View className='mx-5 flex-row gap-4 mt-5'>
                    <View>
                        <Image source={require('@/assets/images/reward/reted.svg')} contentFit='contain' style={{ height: 87, width: 63 }} />
                    </View>
                    <View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='font-proximanova-semibold text-primary dark:text-dark-primary mt-2'>Get Rated 3 Times</Text>
                            <View className=' bg-[#11293A] top-4 rounded-full'>
                                <Text className='px-4 py-2 font-proximanova-semibold text-sm text-[#ffffff] text-center'>Collected</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center ">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#DDF1FF] -ml-3 -z-10 rounded-r-[40px]">
                                <Text className="text-xs font-proximanova-semibold">20</Text>
                            </View>
                            <FontAwesome6 name="crown" className='ml-2' size={15} color="#4FB2F3" />
                        </View>
                        <View className="flex-row items-center gap-3 justify-between mt-2">
                            <View className="w-[220px] bg-[#DFDFDF] -z-10 rounded-[40px]">
                                <Image
                                    source={require("@/assets/images/hiruu-coin.svg")}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        left: 200
                                    }}
                                    contentFit="contain"
                                />

                            </View>
                            <Text className='font-proximanova-regular text-sm text-primary dark:text-dark-primary'><Text className='text-[#4FB2F3]'>1</Text>/1</Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default challenges