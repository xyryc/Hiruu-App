import SmallButton from "@/components/ui/buttons/SmallButton";
import { ToggleButton } from "@/components/ui/buttons/ToggleButton";
import JobCard from "@/components/ui/cards/JobCard";
import RatingBanner from "@/components/ui/cards/RatingBanner";
import RatingProgress from "@/components/ui/cards/RatingProgress";
import {
  EvilIcons,
  Feather,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const BusinessProfile = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState("about");
  const [togolIsOn, setTogolIsOn] = useState(false);
  console.log(selectedTab);

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom", "top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#ffffff] dark:bg-dark-border rounded-b-2xl pt-3.5"
      >
        {/* Profile Header */}
        <View className="flex-row justify-between mx-5">
          <Text className="font-proximanova-bold text-2xl text-primary dark:text-dark-primary">
            Profile
          </Text>
          <View className="flex-row gap-1.5 items-center justify-center">
            <TouchableOpacity
              onPress={() => router.push("/profile/edit-business-profile")}
              className="h-10 w-10 bg-[#EEEEEE] rounded-full items-center justify-center"
            >
              {/* <EvilIcons name="share-apple" size={24} color="black" /> */}
              <Feather name="edit-2" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-10 bg-[#EEEEEE] rounded-full items-center justify-center">
              <Octicons name="share" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-10 bg-[#EEEEEE] rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* cover and prifile */}
        <View className="mt-3 relative">
          {/* cover photo */}
          <Image
            source={require("@/assets/images/business-cover.png")}
            contentFit="cover"
            style={{ width: 430, height: 137 }}
          />
          {/* prifile photo */}
          <View className="flex-row items-center justify-between ml-7 mr-14 absolute -bottom-[45px]">
            <View className="h-[90px] w-[90px] bg-white flex-row justify-center items-center rounded-full">
              <Image
                source={require("@/assets/images/business-profil-pic.png")}
                contentFit="cover"
                style={{ height: 86, width: 86, borderRadius: 100 }}
              />
            </View>
            <View className="bg-primary py-1 px-4 rounded-full left-36">
              <Text className="font-proximanova-semibold text-sm p-1 text-[#FFFFFF] capitalize">
                actively recruiting
              </Text>
            </View>
          </View>
        </View>
        {/* prifile name and details */}
        <View className="mx-6 mt-16 ">
          <View className="flex-row gap-1.5">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              PalmBeach Hotel
            </Text>
            <MaterialCommunityIcons
              name="check-decagram"
              size={20}
              color="#3EBF5A"
            />
            <View className="h-5 w-5 bg-[#4E57FF]  flex-row justify-center items-center rounded-full">
              <FontAwesome6 name="crown" size={10} color="white" />
            </View>
          </View>
          <View className="flex-row items-center gap-1.5">
            <EvilIcons name="location" size={18} color="black" />
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              New York, North Bergen{"  "} |{"  "} 150 employee
            </Text>
          </View>
        </View>
        {/* Tabs */}
        <View className="flex-row mx-5 mt-4 dark:bg-dark-background">
          {["about", "job"].map((tab) => (
            <TouchableOpacity
              className={`w-1/2 ${selectedTab === tab ? "border-b-2 border-[#11293A] pb-2" : "border-b-hairline"}`}
              key={tab}
              onPress={() => setSelectedTab(tab)}
            >
              <View className="flex-row justify-center gap-2">
                <Text
                  className={`text-center capitalize dark:text-dark-primary ${selectedTab === tab ? "font-proximanova-semibold" : "font-proximanova-regular"}`}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/*  About Tabs */}
        {selectedTab === "about" && (
          <View>
            {/* rating summery */}
            <View className="flex-row justify-between items-centers mx-5 mt-4">
              <View className="flex-row items-centers gap-2.5">
                <View className="bg-[#E5F4FD] h-7 w-7 rounded-full flex-row items-center justify-center">
                  <EvilIcons name="star" size={18} color="black" />
                </View>
                <Text className="font-proximanova-semibold text-xl text-primary dark:text-dark-primary">
                  Rating Summary
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/profile/rating")}
                className="items-center"
              >
                <Text className="text-sm font-proximanova-semibold text-[#4FB2F3]">
                  See All Ratings
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mx-5 p-4 border mt-4 border-[#EEEEEE] rounded-2xl ">
              <RatingBanner />
              <View className="flex-row justify-between mx-3 mt-5">
                <View>
                  <RatingProgress rating={3.5} />
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary text-center mt-1.5 capitalize">
                    work enviroment
                  </Text>
                </View>

                <Image
                  source={require("@/assets/images/vertical-line.svg")}
                  contentFit="contain"
                  style={{ height: 70, width: 2 }}
                />
                <View>
                  <RatingProgress rating={4.5} />
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary text-center mt-1.5 capitalize">
                    pay on time
                  </Text>
                </View>
                <Image
                  source={require("@/assets/images/vertical-line.svg")}
                  contentFit="contain"
                  style={{ height: 70, width: 2 }}
                />
                <View>
                  <RatingProgress rating={2} />
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary text-center mt-1.5 capitalize">
                    communication
                  </Text>
                </View>
              </View>
            </View>

            {/* About Us */}
            <View className="mx-5 mt-8 flex-row gap-2.5">
              <View className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center">
                <Foundation name="clipboard" size={16} color="black" />
              </View>
              <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
                About Us
              </Text>
            </View>
            <View className="mx-5 mt-4">
              <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                Ocean View Hotel is a premium beachfront destination renowned
                for its exceptional guest service, welcoming atmosphere, and
                dynamic work culture.
              </Text>
            </View>

            {/* Team & Overview */}
            <View className="mx-5 mt-8 flex-row gap-2.5">
              <View className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center">
                <Ionicons name="person-outline" size={18} color="black" />
              </View>
              <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
                Team & Overview
              </Text>
            </View>
            <View className="mx-5 px-4 py-3 border border-[#eeeeee] mt-4 rounded-xl">
              <View className="flex-row justify-between items-center mt-2.5 p-2">
                <View className="flex-row gap-2">
                  <Feather name="users" size={18} color="black" />
                  <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                    Total Employee
                  </Text>
                </View>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary">
                  50 +
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-2.5 p-2">
                <View className="flex-row gap-2">
                  <MaterialCommunityIcons
                    name="file-document-check-outline"
                    size={18}
                    color="black"
                  />
                  <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                    Active job posting:
                  </Text>
                </View>
                <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-pritext-primary">
                  04
                </Text>
              </View>

              <View className="flex-row justify-between items-center mt-2.5 p-2">
                <View className="flex-row gap-2">
                  <MaterialCommunityIcons
                    name="account-search"
                    size={18}
                    color="#282930"
                  />
                  <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                    Actively Recruiting
                  </Text>
                </View>
                <ToggleButton
                  isOn={togolIsOn}
                  setIsOn={setTogolIsOn}
                  title={`${togolIsOn ? "YES" : "NO"}`}
                />
              </View>
              <Text className="mt-2.5 mx-2 font-proximanova-regular text-sm text-primary dark:text-dark-primary">
                {" "}
                <Text className="font-proximanova-semibold">Note</Text> : X more
                hire to activate
              </Text>
            </View>

            {/* Contact Us On */}

            <View className="flex-row justify-between items-center mx-5 mt-8 ">
              <View className="flex-row gap-2.5">
                <View className="h-8 w-8 rounded-full bg-[#E5F4FD] flex-row justify-center items-center">
                  <Ionicons name="call-outline" size={16} color="black" />
                </View>
                <Text className="font-proximanova-semibold text-lg text-primary dark:text-dark-primary">
                  Contact Us On
                </Text>
              </View>
              <Text className="font-proximanova-semibold text-sm text-[#4FB2F3] underline ">
                Edit
              </Text>
            </View>

            <View className="border border-[#EEEEEE] rounded-xl m-5">
              <View className="flex-row justify-between items-center  p-2.5 border border-[#EEEEEE] rounded-t-xl ">
                <View className="flex-row items-center gap-2.5">
                  <Image
                    source={require("@/assets/images/facebook2.svg")}
                    contentFit="contain"
                    style={{ height: 40, width: 40 }}
                  />

                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    Facebook
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    @alvber_f{" "}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center  p-2.5  border border-[#EEEEEE]">
                <View className="flex-row items-center gap-2.5">
                  <View>
                    <Image
                      source={require("@/assets/images/linkedin.svg")}
                      contentFit="contain"
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    Linkdin
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    {" "}
                    in/albert-flore-12562f25{" "}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center  p-2.5 border border-[#EEEEEE] ">
                <View className="flex-row items-center gap-2.5">
                  <View>
                    <Image
                      source={require("@/assets/images/whatsapp.svg")}
                      contentFit="contain"
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    Whats App
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    {" "}
                    +1(125) 256 25612{" "}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center p-2.5  border border-[#EEEEEE] ">
                <View className="flex-row items-center gap-2.5">
                  <View>
                    <Image
                      source={require("@/assets/images/twitter.svg")}
                      contentFit="contain"
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    Twitter
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                    {" "}
                    @alber256{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* job tobs */}
        {selectedTab === "job" && (
          <View className="mx-5">
            <Text className="my-4">aslkdfj</Text>

            <JobCard className="bg-white border border-[#EEEEEE]" status={""} />
            <JobCard className="bg-white border border-[#EEEEEE]" status={""} />
            <JobCard className="bg-white border border-[#EEEEEE]" status={""} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessProfile;
