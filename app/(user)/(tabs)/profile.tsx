import BandageCard from '@/components/test/BandageCard';
import ExperienceCard from '@/components/ui/cards/ExperienceCard';
import StatCardPrimary from '@/components/ui/cards/StatCardPrimary';
import { Feather, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showText, setShowText] = useState(false)
  return (
    <View
      className='bg-white mb-36'>
      <View className='bg-[#E5F4FD] rounded-b-xl'>
        <SafeAreaView>
          <View className={`flex-row justify-between items-center mt-5 mx-5`}>
            <View className="flex-row items-center gap-2.5">


              <Text
                className={`font-proximanova-bold text-2xl text-primary dark:text-dark-primary`}
              >
                Profile
              </Text>
            </View>
            <View className='flex-row gap-1.5 items-center justify-center'>
              <View className='h-10 w-10 bg-white rounded-full items-center justify-center'>
                <Octicons name="paintbrush" size={18} color="black" />
              </View>
              <View className='h-10 w-10 bg-white rounded-full items-center justify-center'>
                <Feather name="edit-2" size={18} color="black" />
              </View>
              <View className='h-10 w-10 bg-white rounded-full items-center justify-center'>
                <MaterialCommunityIcons name="export-variant" size={22} color="black" />
              </View>

            </View>
          </View>
        </SafeAreaView>
      </View>



      <ScrollView

        showsVerticalScrollIndicator={false}
      >
        {/* Bandage item */}
        <View className='mx-5 flex-row justify-between mt-5 items-center'>
          <View className='flex-row gap-2.5 items-center'>
            <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center '>

              <MaterialCommunityIcons
                className='rotate-180'
                name="medal-outline"
                size={16}
                color="black"
              />
            </View>
            <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Bandage</Text>
          </View>
          <Text className='font-proximanova-semibold text-sm text-[#4FB2F3] underline '>View all bandage</Text>
        </View>
        <BandageCard className='mx-5 mt-3.5' />


        {/* short intro */}
        <View className='mx-5 mt-8 flex-row gap-2.5'>
          <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center'>
            <Foundation name="clipboard" size={16} color="black" />
          </View>
          <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Short Intro</Text>
        </View>
        <View className='mx-5 mt-4'>

          <Text
            className='font-proximanova-regular text-sm text-secondary dark:text-dark-secondary'
          >Join the core team at Space Hotel, a unique dining experience known for its space-themed interiors and premium service
            {showText || '........'}
            {showText && 'Join the core team at Space Hotel, a unique dining experience known for its space-themed interiors and premium service'}
            {'   '}
            <Text
              onPress={() => setShowText(!showText)}
              className='font-proximanova-semibold text-sm text-[#11293A]'

            >{showText ? 'See less' : 'Read More'}</Text>
          </Text>
        </View>

        {/* Experience */}
        <View className='mx-5 mt-8 flex-row gap-2.5'>
          <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center'>
            <Foundation name="clipboard" size={16} color="black" />
          </View>
          <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Experience</Text>
        </View>
        <ExperienceCard focus className='mt-8' />
        <ExperienceCard className='mt-2.5' />
        <ExperienceCard className='mt-2.5' />



        {/* Achievement */}
        <View className=" mx-5 mt-8">
          <View className='flex-row gap-2.5 items-center'>
            <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center '>

              <MaterialCommunityIcons
                className='rotate-180'
                name="medal-outline"
                size={16}
                color="black"
              />
            </View>
            <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Achievement</Text>
          </View>
          <View className="flex-row gap-3 mb-4 mt-4">
            <StatCardPrimary point={'87%'} title='On-Time Arrival' subtitle={'This month'} background={require("@/assets/images/stats-bg.svg")} />
            <StatCardPrimary point={'92%'} title='Task Completion' subtitle={'completed'} background={require("@/assets/images/stats-bg.svg")} />
          </View>
          <View className="flex-row gap-3 mb-4">
            <StatCardPrimary point={'80%'} title='Positive Feedback' subtitle={'positive'} background={require("@/assets/images/stats-bg.svg")} />
            <StatCardPrimary point={'30%'} title='Growth Score' subtitle={'growth'} background={require("@/assets/images/stats-bg.svg")} />
          </View>
        </View>
      </ScrollView>
    </View>

  )
}

export default profile