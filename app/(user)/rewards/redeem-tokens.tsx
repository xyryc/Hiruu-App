import ScreenHeader from '@/components/header/ScreenHeader'
import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RedeemTokens = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-background"
            edges={['bottom', 'left', 'right', 'top']}
        >
            {/* Header */}
            <ScreenHeader
                onPressBack={() => router.back()}
                className="px-5 pb-6 rounded-b-3xl overflow-hidden"
                title="Redeem Tokens"
                titleClass="text-primary "
                iconColor={isDark ? "#fff" : "#111111"}
                components={<View className='mx-5'>
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
                            <Text className="text-xs font-proximanova-semibold">540</Text>
                        </View>
                    </View>

                </View>}
            />

            <View className='flex-row gap-5 justify-between mx-5 mt-5'>
                <View className=' items-center bg-[#EFF9FF] -z-30 p-4 rounded-xl'>
                    <Image source={require('@/assets/images/reward/premium.svg')} contentFit='contain' style={{ width: 60, height: 60 }} />
                    <Text className="font-proximanova-semibold text-primary  mt-2.5">Buy 1 Month</Text>
                    <Text className="font-proximanova-semibold text-primary ">Premium</Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm mt-2">   Unlock premium   </Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm ">   features for yourself   </Text>
                    <View className='flex-row items-center gap-1.5 mt-2.5'>
                        <View className="flex-row -z-20 items-center justify-between">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#ffffff] -z-10 -ml-3 rounded-r-[40px] ">
                                <Text className="text-xs font-proximanova-semibold text-primary ">200</Text>
                            </View>
                        </View>
                        <Feather name="arrow-right" className='bg-white p-1 rounded-full border-hairline border-[#EEEEEE]' size={20} color="black" />
                    </View>
                </View>
                <View className=' items-center bg-[#FEEFE5] -z-30 p-4 rounded-xl'>
                    <Image source={require('@/assets/images/reward/premium.svg')} contentFit='contain' style={{ width: 60, height: 60 }} />
                    <Text className="font-proximanova-semibold text-primary  mt-2.5">Gift 1 Month</Text>
                    <Text className="font-proximanova-semibold text-primary ">Premium</Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm mt-2">    Send premium    </Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm ">    access to a friend    </Text>
                    <View className='flex-row items-center gap-1.5 mt-2.5'>
                        <View className="flex-row -z-20 items-center">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#ffffff] -z-10  -ml-3 rounded-r-[40px] ">
                                <Text className="text-xs font-proximanova-semibold text-primary ">200</Text>
                            </View>
                        </View>
                        <Feather name="arrow-right" className='bg-white p-1 rounded-full border-hairline border-[#EEEEEE]' size={20} color="black" />
                    </View>
                </View>
            </View>
            <View className='flex-row gap-5 justify-between mx-5 mt-5'>
                <View className=' items-center bg-[#E3F6E7] -z-30 p-4 rounded-xl'>
                    <Image source={require('@/assets/images/reward/premium.svg')} contentFit='contain' style={{ width: 60, height: 60 }} />
                    <Text className="font-proximanova-semibold text-primary  mt-2.5">Feature</Text>
                    <Text className="font-proximanova-semibold text-primary ">Me</Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm mt-2">    Get noticed by top    </Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm ">    companies faster.   </Text>
                    <View className='flex-row items-center gap-1.5 mt-2.5'>
                        <View className="flex-row -z-20 items-center justify-between">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#ffffff] -z-10 -ml-3 rounded-r-[40px] ">
                                <Text className="text-xs font-proximanova-semibold text-primary ">200</Text>
                            </View>
                        </View>
                        <Feather name="arrow-right" className='bg-white p-1 rounded-full border-hairline border-[#EEEEEE]' size={20} color="black" />
                    </View>
                </View>
                <View className=' items-center bg-[#F7EEFF] -z-30 p-4 rounded-xl'>
                    <Image source={require('@/assets/images/reward/premium.svg')} contentFit='contain' style={{ width: 60, height: 60 }} />
                    <Text className="font-proximanova-semibold text-primary  mt-2.5">Feature</Text>
                    <Text className="font-proximanova-semibold text-primary ">Job</Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm mt-2">    Get noticed by top    </Text>
                    <Text className="font-proximanova-regular text-secondary  text-center text-sm ">    Employees faster.    </Text>
                    <View className='flex-row items-center gap-1.5 mt-2.5'>
                        <View className="flex-row -z-20 items-center">
                            <Image
                                source={require("@/assets/images/hiruu-coin.svg")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                contentFit="contain"
                            />
                            <View className="px-4 py-1 bg-[#ffffff] -z-10  -ml-3 rounded-r-[40px] ">
                                <Text className="text-xs font-proximanova-semibold text-primary ">200</Text>
                            </View>
                        </View>
                        <Feather name="arrow-right" className='bg-white p-1 rounded-full border-hairline border-[#EEEEEE]' size={20} color="black" />
                    </View>
                </View>
            </View>

            <View className='bg-[#FFFCEE] mx-5 items-center -z-30 mt-3 rounded-xl'>
                <Image source={require('@/assets/images/reward/premium.svg')} contentFit='contain' style={{ width: 60, height: 60 }} />
                <Text className="font-proximanova-semibold text-primary  mt-2.5">Unlock Nameplate Designs</Text>
                <Text className="font-proximanova-regular text-secondary  text-center text-sm mt-2">Choose profile nameplate styles</Text>
                <View className='flex-row items-center gap-1.5 mt-2.5 mb-4'>
                    <View className="flex-row -z-20 items-center">

                        <Image
                            source={require("@/assets/images/hiruu-coin.svg")}
                            style={{
                                width: 22,
                                height: 22,
                            }}
                            contentFit="contain"
                        />
                        <View className="px-4 py-1 bg-[#ffffff] -z-10  -ml-3 rounded-r-[40px] ">
                            <Text className="text-xs font-proximanova-semibold text-primary ">200</Text>
                        </View>

                    </View>
                    <Feather name="arrow-right" className='bg-white p-1 rounded-full border-hairline border-[#EEEEEE] ' size={20} color="black" />
                </View>
            </View>


        </SafeAreaView>
    )
}

export default RedeemTokens