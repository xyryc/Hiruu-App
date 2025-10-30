import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface CoinProgressSliderProps {
    achieved: number;
    max: number;
    showLabels?: boolean;
}

export default function CoinProgressSlider({
    achieved,
    max,
    showLabels = true
}: CoinProgressSliderProps) {

    const percentage = Math.min((achieved / max) * 100, 100);

    const progressWidth = useSharedValue(0);
    const coinPosition = useSharedValue(0);

    useEffect(() => {
        progressWidth.value = withTiming(percentage, { duration: 800 });
        coinPosition.value = withTiming(percentage, { duration: 800 });
    }, [percentage]);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`,
    }));

    const coinStyle = useAnimatedStyle(() => ({
        left: `${coinPosition.value}%`,
    }));

    return (
        <View>
            <View className="relative">
                {/* Background Track */}
                <View className="w-full h-4 bg-[#DDF1FF] rounded-full">
                    {/* Progress Fill */}
                    <Animated.View
                        className="h-full bg-[#4FB2F3] rounded-full"
                        style={progressStyle}
                    />
                </View>

                {/* Coin Icon */}
                <Animated.View
                    className="absolute -top-1.5 -ml-3"
                    style={coinStyle}
                >
                    <Image
                        source={require("@/assets/images/hiruu-coin.svg")}
                        style={{ width: 22, height: 22 }}
                        contentFit="contain"
                    />
                </Animated.View>
            </View>
        </View>
    );
}