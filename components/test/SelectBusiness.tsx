import React, { useState } from 'react'
import { Text, View } from 'react-native'
import BusinessDropdown from './BinessDropDown'

// Sample data
const leaveTypes = [
    { label: "Sick Leave", value: "sick", avatar: require('@/assets/images/drop-down.png') },
    { label: "Personal Leave", value: "personal", avatar: require('@/assets/images/drop-down.png') },
    { label: "Work From Home", value: "wfh", avatar: require('@/assets/images/drop-down.png') },
    { label: "Emergency Leave", value: "emergency", avatar: require('@/assets/images/drop-down.png') },
]

const SelectBusiness = () => {

    const [selectedLeave, setSelectedLeave] = useState<string>("")

    return (
        <View>
            <Text className="font-semibold text-lg mb-2">Select Business</Text>
            {/* Top bar showing selected profiles */}
            <View>
                <BusinessDropdown
                    placeholder="Choose leave type"
                    options={leaveTypes}
                    value={selectedLeave}
                    onSelect={(value: any) => setSelectedLeave(value)}
                />
            </View>
        </View>
    )
}

export default SelectBusiness
