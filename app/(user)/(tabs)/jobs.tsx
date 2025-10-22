import ScreenHeader from "@/components/header/ScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserJobs = () => {
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-dark-background px-5"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScreenHeader
        title="Find Job"
        components={
          <View className="flex-row items-center gap-2.5">
            {/* left */}
            <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
              <Ionicons name="newspaper-outline" size={24} color="#4b5563" />
              <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
                <Text className="text-[10px] text-white">1</Text>
              </View>
            </TouchableOpacity>

            {/* right */}
            <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
              <Image
                source={require("@/assets/images/messages.svg")}
                style={{
                  width: 24,
                  height: 24,
                }}
                contentFit="contain"
              />
              <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
                <Text className="text-[10px] text-white">1</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />

      {/* search box */}
      <View className="flex-row items-center gap-1.5 mr-12 mt-3.5">
        <SearchBar />
        <Ionicons name="filter-circle" size={44} color="black" />
      </View>

      {/* featured job */}
      <ScrollView horizontal={true}>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserJobs;
