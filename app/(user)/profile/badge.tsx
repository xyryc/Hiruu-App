import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '@/components/header/ScreenHeader';
import { router } from 'expo-router';
import BadgeCardWidthSlider from '@/components/ui/cards/BadgeCardWidthSlider';

const Badge = () => {
    const redBadge = require('@/assets/images/reward/red-bands.svg')
    const blackBadge = require('@/assets/images/reward/black-bands.svg')
    const blueBadge = require('@/assets/images/reward/blue-bands.svg')
    const goldBadge = require('@/assets/images/reward/gold-bands.svg')
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <SafeAreaView
            className="flex-1 bg-white"
            edges={["left", "right", 'bottom']}
        >

            {/* Wrapper for rounded effect */}
            <View className="bg-[#E5F4FD] rounded-b-2xl pt-10 px-5">
                <ScreenHeader
                    className="my-4 "  // rounded-b-3xl remove korsi
                    onPressBack={() => router.back()}
                    title="Badge"
                    titleClass="text-primary dark:text-dark-primary"
                    iconColor={isDark ? "#fff" : "#111"}
                />
            </View>


            <BadgeCardWidthSlider className='mt-5 mx-5' badgeBackground='#FFF4ED' tagColor='#F3934F' img={redBadge} title='Hard worker' time='300hrs/ 500hrs' text='Silver badge at 500 Hours' max={500} achieved={300} tag='Bronze' />
            <BadgeCardWidthSlider className='mt-4 mx-5' badgeBackground='#FFFBE8' tagColor='#F1C400' img={goldBadge} title='Early Bird' time='50Days/ 100Days' text='Diamond badge at 100 Days' max={100} achieved={50} tag='Gold' />
            <BadgeCardWidthSlider className='mt-5 mx-5' badgeBackground='#80808008' tagColor='#808080' img={blackBadge} title='Night Owl' time='20Nights/ 50Nights' text='Gold Badge at 50 Nights' max={50} achieved={20} tag='Silver' />
            <BadgeCardWidthSlider className='mt-4 mx-5' badgeBackground='#EFF9FF' tagColor='#4FB2F3' img={blueBadge} title='Streak Starter' time='100Days/ 100Days' text='Gold Badge at 50 Nights' max={100} achieved={100} tag='Diamond' />




        </SafeAreaView>
    )
}

export default Badge