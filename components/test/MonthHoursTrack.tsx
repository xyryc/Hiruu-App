import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'

const MonthHoursTrack = ({ line, img, text, time }: any) => {

    return (
        <View className="flex-row items-center">
            {line && <Image source={line} contentFit="contain" style={{ height: 110, width: 1 }} />}

            <View className="m-2.5">
                {/* Icon Circle */}
                <View className="h-8 w-8 rounded-full bg-[#FFFFFF] overflow-hidden items-center justify-center">
                    <Image source={img} contentFit="contain" style={{ height: 15, width: 15 }} />
                </View>

                {/* Text Labels */}
                <Text className="mt-1.5 font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">{text}</Text>
                <Text className="mt-2.5 font-proximanova-semibold text-lg text-primary dark:text-dark-primary">{time}</Text>
            </View>
        </View>

    )
}

export default MonthHoursTrack