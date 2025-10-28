import BandageCard from '@/components/test/BandageCard';
import { ToggleButton } from '@/components/ui/buttons/ToggleButton';
import ExperienceCard from '@/components/ui/cards/ExperienceCard';
import StatCardPrimary from '@/components/ui/cards/StatCardPrimary';
import Dropdown from '@/components/ui/dropdown/DropDown';
import { Feather, Foundation, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showText, setShowText] = useState(false)

  const interests = [
    { id: "art", name: "Art", icon: "🎨", color: "bg-orange-100" },
    { id: "traveling", name: "Traveling", icon: "✈️", color: "bg-blue-100" },
    {
      id: "photography",
      name: "Photography",
      icon: "📷",
      color: "bg-yellow-100",
    },
    { id: "music", name: "Music", icon: "🎵", color: "bg-green-100" },
    {
      id: "social-media",
      name: "Social Media",
      icon: "📱",
      color: "bg-gray-100",
    },
    { id: "sports", name: "Sports", icon: "⚽", color: "bg-gray-200" },
    { id: "reading", name: "Reading", icon: "📚", color: "bg-green-200" },
    { id: "poetry", name: "Poetry", icon: "📄", color: "bg-yellow-200" },
    { id: "drawing", name: "Drawing", icon: "✏️", color: "bg-pink-100" },
    { id: "climbing", name: "Climbing", icon: "🧗", color: "bg-brown-100" },
    { id: "cooking", name: "Cooking", icon: "🔍", color: "bg-orange-200" },
    { id: "nature", name: "Nature", icon: "🌳", color: "bg-green-300" },
    { id: "painting", name: "Painting", icon: "🖌️", color: "bg-blue-200" },
    { id: "acting", name: "Acting", icon: "🎭", color: "bg-cyan-100" },
    { id: "podcasts", name: "Podcasts", icon: "📋", color: "bg-gray-300" },
    { id: "shopping", name: "Shopping", icon: "🛍️", color: "bg-pink-200" },
    { id: "writing", name: "Writing", icon: "✍️", color: "bg-gray-400" },
    { id: "self-care", name: "Self-care", icon: "🐱", color: "bg-yellow-300" },
    { id: "design", name: "Design", icon: "🎨", color: "bg-orange-300" },
    { id: "singing", name: "Singing", icon: "🎤", color: "bg-purple-100" },
    {
      id: "architecture",
      name: "Architecture",
      icon: "🏛️",
      color: "bg-gray-500",
    },
    { id: "tattoo", name: "Tattoo", icon: "🐍", color: "bg-green-400" },
    { id: "crochet", name: "Crochet", icon: "🧶", color: "bg-red-100" },
    { id: "lifestyles", name: "Lifestyles", icon: "🍄", color: "bg-pink-300" },
  ];
  const [selectedIssue, setSelectedIssue] = useState("");
  const issues = [
    { label: "Missed Punch", value: "Missed Punch" },
    { label: "Late arrival", value: "Late arrival" },
    { label: "Early Departure", value: "Early Departure" },
    { label: "Forget to Tap", value: "Forget to Tap" },
    { label: "Network Issues", value: "Network Issues" },
  ];
  const [isOn, setIsOn] = useState(false)
  return (
    <View
      className='bg-white pb-36 dark:bg-dark-background'>
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

        {/* Interests */}
        <View className='mx-5 mt-8 flex-row gap-2.5'>
          <View className='h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center'>
            <Foundation name="clipboard" size={16} color="black" />
          </View>
          <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Interests</Text>
        </View>

        <View className='flex-row justify-between mx-5 mt-4'>
          <View>

            <View className='w-16 h-16 rounded-full items-center justify-center bg-gray-200 p-2.5'>
              <Text className="text-2xl">⚽</Text>
            </View>
            <Text className='text-center text-xs  mt-2 font-proximanova-medium'>Sports</Text>
          </View>
          <View>

            <View className='w-16 h-16 rounded-full items-center justify-center bg-green-100 p-2.5'>
              <Text className="text-2xl">🎵</Text>
            </View>
            <Text className='text-center text-xs  mt-2 font-proximanova-medium'>Music</Text>
          </View>
          <View>

            <View className='w-16 h-16 rounded-full items-center justify-center bg-yellow-100 p-2.5'>
              <Text className="text-2xl">📷</Text>
            </View>
            <Text className='text-center text-xs  mt-2 font-proximanova-medium'>Photography</Text>
          </View>
          <View>

            <View className='w-16 h-16 rounded-full items-center justify-center bg-orange-100 p-2.5'>
              <Text className="text-2xl">🎨</Text>
            </View>
            <Text className='text-center text-xs  mt-2 font-proximanova-medium'>Art</Text>
          </View>
        </View>

        <View className='mx-5 mt-8 flex-row justify-between items-center'>
          <Text className='font-proximanova-semibold text-xl text-primary dark:text-dark-primary'>Options for export</Text>
          <ToggleButton isOn={isOn} setIsOn={setIsOn} title='Keep colors' />
        </View>
        <View className='mx-5 mt-4'>
          <Dropdown
            // label="Select Style"
            placeholder="Select Style"
            options={issues}
            value={selectedIssue}
            onSelect={setSelectedIssue}
          />
        </View>

        {/* Employee Info */}
        <View className='flex-row items-center gap-2.5 mt-8 mx-5'>
          <View className='h-8 w-8 bg-[#E5F4FD] rounded-full flex-row justify-center items-center'>
            <Ionicons name="person" size={16} color="black" />
          </View>
          <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Employee Info</Text>
        </View>
        <View className='flex-row justify-between items-center mx-5 mt-4 p-2.5 bg-[#4FB2F3] rounded-xl'>
          <View className='flex-row items-center gap-2.5'>
            <View>
              <Image source={require('@/assets/images/reward/nameplate-profile.png')} contentFit='contain' style={{ height: 40, width: 40 }} />
            </View>
            <Text className='font-proximanova-bold text-white'>Rohan Mehta</Text>
          </View>
          <View className='h-10 w-10 bg-white rounded-full flex-row items-center justify-center'>
            <Image source={require('@/assets/images/messages-fill.svg')} contentFit='contain' style={{ height: 22, width: 22 }} />
          </View>
        </View>

        {/* Contact Us On */}

        <View className='flex-row items-center gap-2.5 mt-8 mx-5'>
          <View className='h-8 w-8 bg-[#E5F4FD] rounded-full flex-row justify-center items-center'>
            <Ionicons name="call-outline" size={16} color="black" />
          </View>
          <Text className='font-proximanova-semibold text-lg text-primary dark:text-dark-primary'>Contact Us On</Text>
        </View>


        <View className='flex-row justify-between items-center mx-5 mt-4 p-2.5  rounded-xl'>
          <View className='flex-row items-center gap-2.5'>
            <View>
              <Image source={require('@/assets/images/facebook2.svg')} contentFit='contain' style={{ height: 40, width: 40 }} />
            </View>
            <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Facebook</Text>
          </View>
          <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>@alvber_f </Text>
        </View>
        <View className='flex-row justify-between items-center mx-5 mt-4 p-2.5  rounded-xl'>
          <View className='flex-row items-center gap-2.5'>
            <View>
              <Image source={require('@/assets/images/linkedin.svg')} contentFit='contain' style={{ height: 40, width: 40 }} />
            </View>
            <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Linkdin</Text>
          </View>
          <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'> in/albert-flore-12562f25 </Text>
        </View>
        <View className='flex-row justify-between items-center mx-5 mt-4 p-2.5  rounded-xl'>
          <View className='flex-row items-center gap-2.5'>
            <View>
              <Image source={require('@/assets/images/whatsapp.svg')} contentFit='contain' style={{ height: 40, width: 40 }} />
            </View>
            <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Whats App</Text>
          </View>
          <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'> +1(125) 256 25612 </Text>
        </View>
        <View className='flex-row justify-between items-center mx-5 mt-4 p-2.5  rounded-xl'>
          <View className='flex-row items-center gap-2.5'>
            <View>
              <Image source={require('@/assets/images/twitter.svg')} contentFit='contain' style={{ height: 40, width: 40 }} />
            </View>
            <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'>Twitter</Text>
          </View>
          <Text className='font-proximanova-semibold text-sm text-primary dark:text-dark-primary'> @alber256 </Text>
        </View>



      </ScrollView>
    </View>

  )
}

export default profile