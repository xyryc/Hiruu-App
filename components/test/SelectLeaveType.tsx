import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const LeaveData = [
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Personal Leave', value: 'Personal Leave' },
    { label: 'Work From Home', value: 'Work From Home' },
    { label: 'Emergency Leave', value: 'Emergency Leave' },
    { label: 'Causal Leave', value: 'Causal Leave' },
    { label: 'Unpaid Leave', value: 'Unpaid Leave' },
    { label: 'Other', value: 'Other' },
]

const SelectLeaveType = () => {
    const [selected, setSelected] = useState<string>('')
    console.log(selected);

    return (
        <View className="">
            <Text className="font-semibold text-lg mb-4">Select Leave Type</Text>

            <View className="flex-wrap flex-row gap-3">
                {LeaveData.map((item) => {
                    const isSelected = selected === item.value
                    return (

                        <TouchableOpacity
                            key={item.value}
                            onPress={() => setSelected(item.value)}
                            className={` mb-3 p-2.5 rounded-3xl ${isSelected
                                ? 'bg-[#4FB2F3]'
                                : 'bg-[#F5F5F5]'
                                } shadow-md`}
                        >
                            <Text className={`text-center px-1 ${isSelected ? 'text-white' : 'text-gray-800'} font-medium`}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default SelectLeaveType
