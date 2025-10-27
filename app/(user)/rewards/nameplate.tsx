import ScreenHeader from '@/components/header/ScreenHeader'
import NameplateCard from '@/components/test/NameplateCard'
import ReddemModal from '@/components/test/RedeemModal'
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Nameplate = () => {
    const img = require('@/assets/images/reward/nameplate-profile.png')

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({
        img: "",
        title: "",
        subtitle: "",
        coin: '',
    });

    const modalHandle = () => {
        setModalVisible(true)
        setData({
            img,
            title: 'lsdkfa',
            subtitle: 'kdfjkd',
            coin: '200'
        })
    }

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const tabs = ['limited time', 'featured', 'all']
    const [isActive, setIsActive] = useState('limited time')
    return (
        <SafeAreaView className="flex-1 bg-[#E5F4FD] dark:bg-dark-background">
            {/* Header */}
            <ScreenHeader
                onPressBack={() => router.back()}
                className="px-5 pb-6 rounded-b-3xl bg-[#E5F4FD] overflow-hidden"
                title="Buy Nameplate"
                titleClass="text-primary dark:text-dark-primary"
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
                        <View className="px-4 py-1 bg-[#ffffff] -ml-3 -z-10 rounded-r-[40px]">
                            <Text className="text-xs font-proximanova-semibold">540</Text>
                        </View>
                    </View>

                </View>}
            />


            <View className='mt-5 flex-row mx-5'>
                {
                    tabs.map((tab, index) => (
                        <TouchableOpacity key={index} className={`w-1/3 border-b  pb-2 ${isActive === tab && 'border-[#11293A] border-b-2'}`}
                            onPress={() => setIsActive(tab)}
                        >
                            <Text className={`text-center ${isActive === tab ? 'font-proximanova-semibold text-base text-primary dark:text-dark-primary' : 'font-proximanova-regular text-secondary dark:text-dark-secondary'} `} >
                                <Text className='capitalize'>{tab}</Text>
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='bg-white'>
                    <Text className='font-proximanova-semibold text-sm text-secondary dark:text-dark-secondary mx-5 mt-8'>Note: Premium Required: Only premium users can use nameplates.</Text>

                    <TouchableOpacity
                        onPress={modalHandle}
                        className={`mx-5 mt-8`}>
                        <Text className='font-proximanova-semibold  text-primary dark:text-dark-primary'>Caffeine Commander</Text>
                        <View className='w-full mt-2.5 bg-[#A4928E] rounded-xl z-20'>

                            <View>
                                <Image source={require('@/assets/images/timer-bg.svg')} contentFit='contain' style={{ width: 200, height: 34, marginHorizontal: 'auto', marginTop: -2 }} />
                                <View className='flex-row items-center justify-center absolute inset-0'>
                                    <Text className='font-proximanova-regular text-sm text-primary dark:text-dark-primary'>Available for</Text>
                                    <MaterialCommunityIcons
                                        name="timer-sand"
                                        size={16}
                                        color="#A4928E"
                                    />
                                    <Text className=' font-proximanova-semibold text-[#A4928E]'>1d, 10h  </Text>
                                </View>
                            </View>


                            <View className='flex-row items-center justify-between mx-2.5 my-5 gap-3'>
                                <Ionicons name="person" className='p-2 bg-[#c4b8b5] rounded-full' size={34} color="#A4928E" />
                                <View className='bg-[#c4b8b5]  h-3.5 w-[150px] rounded-[30px]' />
                                <Entypo name="lock" className='p-2 bg-white rounded-full' size={20} color="black" />
                                <View className="flex-row items-center ">
                                    <Image
                                        source={require("@/assets/images/hiruu-coin.svg")}
                                        style={{
                                            width: 22,
                                            height: 22,
                                        }}
                                        contentFit="contain"
                                    />
                                    <View className="px-4 py-1 bg-[#ffffff] -ml-3.5 -z-10 rounded-r-[40px]">
                                        <Text className="text-xs font-proximanova-semibold">540</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <NameplateCard
                        title='Checkout Champion'
                        color='#A4DBAF'
                        bgColor='#C0FFCE'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Style advisor'
                        color='#4FB2F3'
                        bgColor='#99D7FF'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Fryer Fiend'
                        color='#EEC285'
                        bgColor='#F7EDC0'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Returns Specialist'
                        color='#7B7B7B'
                        bgColor='#D2D2D2'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Literary Legend'
                        color='#867470'
                        bgColor='#E3CEB9'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Gadget guru'
                        color='#94C3C8'
                        bgColor='#C5EDF2'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Pill Pusher Pro'
                        color='#B0C4DE'
                        bgColor='#C3DDFF'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Flash Delivery'
                        color='#FEABB6'
                        bgColor='#FFCECD47'
                        className='mt-5'
                    />

                    <NameplateCard
                        title='Flash Delivery'
                        color='#FEABB6'
                        bgColor='#FFCECD47'
                        className='mt-5'
                    />
                    <NameplateCard
                        title='Forklift Fury'
                        color='#CEA694'
                        bgColor='#F6CEBC'
                        className='mt-5'
                    />


                </View>
            </ScrollView>

            <ReddemModal visible={modalVisible}
                onClose={() => setModalVisible(false)}
                data={data} />

        </SafeAreaView>
    )
}

export default Nameplate