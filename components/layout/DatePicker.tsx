import { FontAwesome6 } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'

import DateTimePicker from "@react-native-community/datetimepicker"

const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedTime?: Date) => {
        if (Platform.OS === "android") {
            // picker auto-closes for Android when we setShow(false)
            setShow(false);
        }

        if (selectedTime) {
            setDate(selectedTime);
        }
    };
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); // Example: 18 Oct 2025

    return (
        <View className="px-4 py-2 mt-0.5">
            {/* Input field style */}
            <TouchableOpacity
                onPress={() => setShow(true)}
                activeOpacity={0.8}
                className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-white"
            >
                <Text className="text-gray-700 text-base">{formattedDate ? formattedDate : 'Select Date'}</Text>
                <FontAwesome6 name="calendar-days" size={22} color="#4FB2F3" />
            </TouchableOpacity>

            {/* Time picker */}
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

export default DatePicker