import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserRewards = () => {
  return (
    <SafeAreaView
      className="flex-1 bg-[#E5F4FD] dark:bg-dark-background"
      edges={["top", "left", "right", 'bottom']}
    >
      <View className="mx-5">
        <Text className="font-proximanova-regular text-base text-secondary dark:text-dark-secondary text-center mt-2.5">Total Tokens</Text>
        <FontAwesome6 className='justify-end p-2.5 bg-[#ffffff] rounded-full absolute top-4 right-0' name="clock-rotate-left" size={20} color="black" />
        <View className="flex-row items-center justify-center mt-1 gap-2.5">
          <View>
            <Image source={require('@/assets/images/hiruu-coin.svg')} contentFit="contain" style={{ height: 44, width: 40 }} />
          </View>
          <Text className="font-proximanova-bold text-[40px] text-[#4FB2F3]">5,405</Text>
        </View>
        <PrimaryButton title="Redeem" className="w-44 justify-center items-center mx-auto mt-4" />
        <Text className="font-proximanova-regular text-sm text-center text-primary dark:text-dark-primary mt-2.5">Earn tokens as you unlock and level up badges!</Text>
        <View className="bg-[#4FB2F3] p-4 rounded-2xl mt-8">
          <Text className="font-proximanova-semibold text-lg text-[#FFFFFF] text-center">You've Completed 3 Shifts In A Raw!</Text>
          <View className="flex-row gap-2 mt-3">
            <View>
              <Image source={require('@/assets/images/reward/reward-complite-spark.svg')} contentFit="contain" style={{ width: 44, height: 44 }} />
            </View>
            <View>
              <View className="flex-row justify-between">
                <Text className="font-proximanova-regular text-sm text-[#ffffff]"><Text className="text-[#ffffff]/70">Completed:</Text> 3/5 Shifts</Text>
                <Text className="font-proximanova-semibold text-sm text-[#ffffff]">20 Tokens</Text>
              </View>
              <View>
                <Image source={require('@/assets/images/reward/reward-complite-slider.svg')} contentFit="contain" style={{ height: 24, width: 250 }} />
              </View>
            </View>
          </View>

        </View>
        <View>
          <Image source={require('@/assets/images/shift-ongoing-bg.svg')} contentFit="contain" style={{ height: 34, width: 250, marginHorizontal: 'auto' }} />
          <View className="flex-row items-center justify-center">
            <Text className="text-center -top-8 font-proximanova-regular text-sm text-primary dark:text-dark-primary">Your Time Remaining: </Text>
            <Image source={require('@/assets/images/reward/timer.svg')} contentFit="contain" style={{ height: 20, width: 20, marginVertical: 'auto', top: -26 }} />
            <Text className="text-center -top-7 font-proximanova-bold text-[#F3934F]"> 00:59:21</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserRewards;
