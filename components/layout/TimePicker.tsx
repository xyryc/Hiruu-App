import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'

const TimePicker = ({ title }: { title: string }) => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedTime?: Date) => {
        if (Platform.OS === "android") {
            setShow(false);
        }
        if (selectedTime) {
            setTime(selectedTime);
        }
    };
    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
    });

    return (
        <View className="flex-1">
            <Text className='mb-2.5 ml-1 font-semibold text-[#111111]'>{title}</Text>
            <TouchableOpacity
                onPress={() => setShow(true)}
                activeOpacity={0.8}
                className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-white"
            >
                <Text className="text-gray-700 text-base">{formattedTime ? formattedTime : title}</Text>
                <MaterialCommunityIcons name="clock" size={22} color="#4FB2F3" />
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default TimePicker