import ScreenHeader from '@/components/header/ScreenHeader'
import { MaterialIcons } from '@expo/vector-icons'
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default challenges