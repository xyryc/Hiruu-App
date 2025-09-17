import { TodaysShiftProps } from "@/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TaskCard from "../ui/cards/TaskCard";
import BusinessSelectionModal from "../ui/modals/BusinessSelectionModal";

const TodaysShift = ({ className }: TodaysShiftProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);

  const businesses = [
    {
      id: "1",
      name: "Space Hotel",
      imageUrl:
        "https://academicsforpalestine.org/wp-content/uploads/2025/07/afp_notext.png",
    },
    {
      id: "2",
      name: "Paradise Holiday",
      imageUrl:
        "https://logos-world.net/wp-content/uploads/2023/02/Ubisoft-Symbol.png",
    },
    {
      id: "3",
      name: "Farout Beach Club",
      imageUrl:
        "https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp",
    },
  ];

  const handleLogin = () => {
    console.log("Login pressed");
  };

  return (
    <View className={`${className} px-4`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold mb-4">Your Today's Shifts</Text>

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="bg-[#E5F4FD] flex-row items-center p-0.5 rounded-[26px]"
        >
          <Image
            source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
            style={{ width: 30, height: 30, borderRadius: 999 }}
            contentFit="cover"
          />
          <SimpleLineIcons
            className="p-1.5"
            name="arrow-down"
            size={12}
            color="#111111"
          />
        </TouchableOpacity>
      </View>

      {/* modal */}
      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={businesses}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />

      {/* cards */}
      <View className="mt-4">
        <TaskCard
          shiftTitle="Hotel & Bar Management"
          startTime="10:00 AM"
          endTime="6:00 PM"
          shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
          teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
          totalMembers={30}
          address="230 Aaron Bushnell St"
          city="Madezine, Palestine, PL"
          onLoginPress={handleLogin}
          status="upcoming"
        />
      </View>
    </View>
  );
};

export default TodaysShift;
