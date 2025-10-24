import React, { useState } from "react";
import { Text, View } from "react-native";
import BusinessDropdown from "./BusinessDropdownModal";

// Sample data
const leaveTypes = [
  {
    label: "Sick Leave",
    value: "sick",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Personal Leave",
    value: "personal",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Work From Home",
    value: "wfh",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
  {
    label: "Emergency Leave",
    value: "emergency",
    avatar:
      "https://i.pinimg.com/736x/16/6f/73/166f73ab4a3d7657e67b4ec1246cc2d6.jpg",
  },
];

const SelectBusiness = () => {
  const [selectedLeave, setSelectedLeave] = useState<string>("");

  return (
    <View>
      <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mb-2">
        Select Business
      </Text>
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
  );
};

export default SelectBusiness;
