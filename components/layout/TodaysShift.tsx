import { useBusinessStore } from "@/stores/businessStore";
import { TodaysShiftProps } from "@/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ActionCard from "../ui/cards/ActionCard";
import NoTaskCard from "../ui/cards/NoTaskCard";
import TaskCard from "../ui/cards/TaskCard";
import BusinessSelectionTrigger from "../ui/dropdown/BusinessSelectionTrigger";
import BusinessSelectionModal from "../ui/modals/BusinessSelectionModal";

const TodaysShift = ({ className }: TodaysShiftProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {
    myBusinesses,
    selectedBusinesses,
    setSelectedBusinesses,
    getMyBusinesses,
  } = useBusinessStore();

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        await getMyBusinesses();
      } catch {
        // ignore
      }
    };

    loadBusinesses();
  }, [getMyBusinesses]);

  const handleLogin = () => {
    console.log("Login pressed");
  };

  // Get display content for header button
  const getDisplayContent = () => {
    if (selectedBusinesses.length === 0) {
      return { type: "all", content: "All" };
    } else if (selectedBusinesses.length === 1) {
      const selectedBusiness = myBusinesses.find(
        (b) => b.id === selectedBusinesses[0]
      );
      return { type: "single", content: selectedBusiness };
    }
    return { type: "multi", content: `${selectedBusinesses.length} Selected` };
  };

  const displayContent = getDisplayContent();

  return (
    <View className={`${className} px-4`}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-proximanova-semibold">
          Your Today&apos;s Shifts
        </Text>

        <BusinessSelectionTrigger
          displayContent={displayContent as any}
          onPress={() => setShowModal(true)}
        />
      </View>

      {/* modal */}
      <BusinessSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        businesses={myBusinesses.map((b) => ({
          id: b.id,
          name: b.name,
          address: b.address,
          imageUrl: b.logo,
          logo: b.logo,
        }))}
        selectedBusinesses={selectedBusinesses}
        onSelectionChange={setSelectedBusinesses}
      />

      {/* cards */}
      <ScrollView
        className="mb-7"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TaskCard
          shiftTitle="Hotel & Bar Management"
          startTime="10:00 AM"
          endTime="6:00 PM"
          shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
          teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
          totalMembers={30}
          address="230 Aaron Bushnell St"
          city="Palestine, PL"
          onLoginPress={handleLogin}
          status="upcoming"
        />

        <TaskCard
          shiftTitle="Hotel & Bar Management"
          startTime="10:00 AM"
          endTime="6:00 PM"
          shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
          teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
          totalMembers={30}
          address="230 Aaron Bushnell St"
          city="Palestine, PL"
          onLoginPress={handleLogin}
          status="ongoing"
        />

        <TaskCard
          shiftTitle="Hotel & Bar Management"
          startTime="10:00 AM"
          endTime="6:00 PM"
          shiftImage="https://media.architecturaldigest.com/photos/66c8923688f5dc5cc31e1e35/1:1/w_3283,h_3283,c_limit/CH_BAD_ROMAN_NYC_ROUND_1_020323952A.jpg" // Replace with your image
          teamMembers={["John", "Jane", "Mike", "Sarah", "Tom"]}
          totalMembers={30}
          address="230 Aaron Bushnell St"
          city="Palestine, PL"
          onLoginPress={handleLogin}
          status="completed"
        />
      </ScrollView>

      <NoTaskCard className="mb-7" />

      {/* rank card */}
      <ActionCard
        title="See your rank on board"
        buttonTitle="View"
        onPress={() => router.push("/screens/home/leaderboard")}
        rightImage={require("@/assets/images/rank.svg")}
        imageClass="absolute bottom-0 right-2.5"
        imageWidth={144}
        imageHeight={95}
        background={require("@/assets/images/chessboard-bg.svg")}
      />
    </View>
  );
};

export default TodaysShift;
