import DynamicBackground from "@/components/layout/DynamicBackground";
import { ToggleButton } from "@/components/ui/buttons/ToggleButton";
import BadgeCard from "@/components/ui/cards/BadgeCard";
import ExperienceCard from "@/components/ui/cards/ExperienceCard";
import NamePlateCard from "@/components/ui/cards/NamePlateCard";
import StatCardPrimary from "@/components/ui/cards/StatCardPrimary";
import Dropdown from "@/components/ui/dropdown/DropDown";
import ConnectSocials from "@/components/ui/inputs/ConnectSocials";
import ColorPickerModal from "@/components/ui/modals/ColorPickerModal";
import { profileService } from "@/services/profileService";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const profile = () => {
  const [showText, setShowText] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [profileData, setProfileData] = useState<any>(null);
  const issues = [
    { label: "Missed Punch", value: "Missed Punch" },
    { label: "Late arrival", value: "Late arrival" },
    { label: "Early Departure", value: "Early Departure" },
    { label: "Forget to Tap", value: "Forget to Tap" },
    { label: "Network Issues", value: "Network Issues" },
  ];
  const [isOn, setIsOn] = useState(false);
  const insets = useSafeAreaInsets();

  // color
  const [pickerType, setPickerType] = useState<"solid" | "gradient">("solid");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [profileColor, setProfileColor] = useState("#E5F4FD");
  const [gradientColors, setGradientColors] = useState<[string, string]>([
    "#E5F4FD",
    "#fff",
  ]);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const result = await profileService.getProfile();
        if (isMounted) {
          setProfileData(result.data);
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to load profile");
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleColorSelect = (color: string | string[]) => {
    if (Array.isArray(color)) {
      // Handle gradient
      // console.log("Selected gradient:", color);
      //@ts-ignore
      setGradientColors(color);
    } else {
      // Handle solid color
      setProfileColor(color);
    }
  };

  const bioText = profileData?.bio || "No bio yet.";
  const shortBio =
    bioText.length > 140 ? `${bioText.slice(0, 140)}...` : bioText;
  const interests: string[] = Array.isArray(profileData?.interest)
    ? profileData.interest
    : [];
  const experiences = Array.isArray(profileData?.experiences)
    ? profileData.experiences
    : [];

  return (
    <DynamicBackground
      style={{
        paddingTop: insets.top,
      }}
      pickerType={pickerType}
      profileColor={profileColor}
      gradientColors={gradientColors}
    >
      <DynamicBackground
        className="rounded-b-xl pb-3"
        pickerType={pickerType}
        profileColor={profileColor}
        gradientColors={gradientColors}
      >
        <View className={`flex-row justify-between items-center mt-5 mx-5`}>
          <View className="flex-row items-center gap-2.5">
            <Text
              className={`font-proximanova-bold text-2xl text-primary dark:text-dark-primary`}
            >
              Profile
            </Text>
          </View>
          <View className="flex-row gap-1.5 items-center justify-center">
            {/* color picker */}
            <TouchableOpacity
              onPress={() => setShowColorPicker(true)}
              className="h-10 w-10 bg-white rounded-full items-center justify-center"
            >
              <Ionicons name="brush-outline" size={20} color="black" />
            </TouchableOpacity>

            {/* color picker modal */}
            <ColorPickerModal
              pickerType={pickerType}
              setPickerType={setPickerType}
              visible={showColorPicker}
              onClose={() => setShowColorPicker(false)}
              onSelectColor={handleColorSelect}
              initialColor={profileColor}
            />

            {/* user edit screen */}
            <TouchableOpacity
              onPress={() => router.push("/screens/profile/user/edit")}
              className="h-10 w-10 bg-white rounded-full items-center justify-center"
            >
              <SimpleLineIcons name="pencil" size={18} color="black" />
            </TouchableOpacity>

            {/* setting */}
            <TouchableOpacity
              onPress={() => router.push("/screens/profile/settings/settings")}
              className="h-10 w-10 bg-white rounded-full items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </DynamicBackground>

      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/screens/profile/rating")}
          className="mx-5 mt-3.5"
        >
          <NamePlateCard
            variant="variant4"
            name={profileData?.name || profileData?.email || "User"}
            address={profileData?.address?.address || "Location unavailable"}
            profileImage={profileData?.avatar}
          />
        </TouchableOpacity>

        {/* Badge item */}
        <View className="mx-5 flex-row justify-between mt-5 items-center">
          <View className="flex-row gap-2.5 items-center">
            <DynamicBackground
              className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
              pickerType={pickerType}
              profileColor={profileColor}
              gradientColors={gradientColors}
            >
              <FontAwesome6 name="id-badge" size={14} color="black" />
            </DynamicBackground>
            <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
              Badge
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/screens/profile/badge")}
          >
            <Text className="font-proximanova-semibold text-sm text-[#4FB2F3] underline ">
              View all Badge
            </Text>
          </TouchableOpacity>
        </View>
        <BadgeCard className="mx-5 mt-3.5" />

        {/* short intro */}
        <View className="mx-5 mt-8 flex-row items-center gap-2.5">
          <DynamicBackground
            className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
            pickerType={pickerType}
            profileColor={profileColor}
            gradientColors={gradientColors}
          >
            {/* <Foundation name="clipboard" size={16} color="black" /> */}
            <MaterialCommunityIcons
              name="file-document-check-outline"
              size={16}
              color="black"
            />
          </DynamicBackground>
          <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
            Short Intro
          </Text>
        </View>

        <View className="mx-5 mt-4">
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
            {showText ? bioText : shortBio}
            {bioText.length > 140 && (
              <Text
                onPress={() => setShowText(!showText)}
                className="font-proximanova-semibold text-sm text-[#11293A]"
              >
                {showText ? "See less" : "Read More"}
              </Text>
            )}
          </Text>
        </View>

        {/* Experience */}
        <View className="mx-5 mt-8 flex-row gap-2.5">
          <DynamicBackground
            className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
            pickerType={pickerType}
            profileColor={profileColor}
            gradientColors={gradientColors}
          >
            <MaterialCommunityIcons
              name="file-document-check-outline"
              size={16}
              color="black"
            />
          </DynamicBackground>
          <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
            Experience
          </Text>
        </View>
        {experiences.map((experience: any, index: number) => (
          <ExperienceCard
            key={experience?.id || `${experience?.companyId}-${index}`}
            focus={Boolean(experience?.isCurrent)}
            className={index === 0 ? "mt-8 mx-5" : "mt-2.5 mx-5"}
            companyName={experience?.company?.name}
            position={experience?.position}
            companyLogo={experience?.company?.logo}
            isVerified={Boolean(experience?.company?.isVerified)}
          />
        )
        )}

        {/* Achievement */}
        <View className=" mx-5 mt-8">
          <View className="flex-row gap-2.5 items-center">
            <DynamicBackground
              className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
              pickerType={pickerType}
              profileColor={profileColor}
              gradientColors={gradientColors}
            >
              <MaterialCommunityIcons
                className="rotate-180"
                name="medal-outline"
                size={16}
                color="black"
              />
            </DynamicBackground>
            <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
              Achievement
            </Text>
          </View>
          <View className="flex-row gap-3 mb-4 mt-4">
            <StatCardPrimary
              point={"87%"}
              title="On-Time Arrival"
              subtitle={"This month"}
              background={require("@/assets/images/stats-bg.svg")}
            />
            <StatCardPrimary
              point={"92%"}
              title="Task Completion"
              subtitle={"completed"}
              background={require("@/assets/images/stats-bg.svg")}
            />
          </View>
          <View className="flex-row gap-3 mb-4">
            <StatCardPrimary
              point={"80%"}
              title="Positive Feedback"
              subtitle={"positive"}
              background={require("@/assets/images/stats-bg.svg")}
            />
            <StatCardPrimary
              point={"30%"}
              title="Growth Score"
              subtitle={"growth"}
              background={require("@/assets/images/stats-bg.svg")}
            />
          </View>
        </View>

        {/* Interests */}
        <View className="mx-5 mt-8 flex-row gap-2.5">
          <DynamicBackground
            className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
            pickerType={pickerType}
            profileColor={profileColor}
            gradientColors={gradientColors}
          >
            <MaterialCommunityIcons
              name="file-document-check-outline"
              size={16}
              color="black"
            />
          </DynamicBackground>
          <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
            Interests
          </Text>
        </View>

        <View className="flex-row justify-between mx-5 mt-4">
          {(interests.length ? interests.slice(0, 4) : ["No interests"]).map(
            (item, index) => (
              <View key={`${item}-${index}`}>
                <View className="w-16 h-16 rounded-full items-center justify-center bg-gray-200 p-2.5">
                  <Text className="text-xl">
                    {item === "No interests" ? "—" : item[0]?.toUpperCase()}
                  </Text>
                </View>
                <Text className="text-center text-xs mt-2 font-proximanova-medium">
                  {item}
                </Text>
              </View>
            )
          )}
        </View>

        <View className="mx-5 mt-8 flex-row justify-between items-center">
          <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
            Options for export
          </Text>
          <ToggleButton isOn={isOn} setIsOn={setIsOn} title="Keep colors" />
        </View>

        <View className="mx-5 mt-4">
          <Dropdown
            // label="Select Style"
            placeholder="Select Style"
            options={issues}
            value={selectedIssue}
            onSelect={setSelectedIssue}
          />
        </View>

        {/* Employee Info */}
        <View className="flex-row items-center gap-2.5 mt-8 mx-5">
          <DynamicBackground
            className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
            pickerType={pickerType}
            profileColor={profileColor}
            gradientColors={gradientColors}
          >
            <Feather name="user" size={16} color="black" />
          </DynamicBackground>
          <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
            Employee Info
          </Text>
        </View>
        <DynamicBackground
          className="flex-row justify-between items-center mx-5 mt-4 p-2.5 !bg-[#4FB2F3] rounded-xl overflow-hidden"
          pickerType={pickerType}
          profileColor={profileColor}
          gradientColors={gradientColors}
        >
          <View className="flex-row items-center gap-2.5">
            <Image
              source={require("@/assets/images/adaptive-icon.png")}
              contentFit="contain"
              style={{ height: 40, width: 40 }}
            />

            <Text className="font-proximanova-bold text-white">
              Md Talath Un Nabi Anik
            </Text>
          </View>
          <View className="h-10 w-10 bg-white rounded-full flex-row items-center justify-center">
            <Image
              source={require("@/assets/images/messages-fill.svg")}
              contentFit="contain"
              style={{ height: 22, width: 22 }}
            />
          </View>
        </DynamicBackground>

        {/* Contact Us On */}
        <View className="flex-row items-center gap-2.5 mt-8 mx-5">
          <DynamicBackground
            className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row items-center justify-center overflow-hidden"
            pickerType={pickerType}
            profileColor={profileColor}
            gradientColors={gradientColors}
          >
            <Ionicons name="call-outline" size={16} color="black" />
          </DynamicBackground>
          <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
            Contact Us On
          </Text>
        </View>

        <ConnectSocials className="mx-5 my-4" />
      </ScrollView>
    </DynamicBackground>
  );
};

export default profile;
