import userData from "@/assets/data/user.json";
import { QuickActionProps } from "@/types";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import ActionIconCard from "../ui/cards/ActionIconCard";

const QuickAction = ({ className }: QuickActionProps) => {
  const router = useRouter();
  const user = userData.user;

  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-proximanova-semibold mb-4">
        Quick Actions
      </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ActionIconCard
          icon={
            user.role === "user" ? (
              <Ionicons name="time" size={24} color="#4FB2F3" />
            ) : (
              <Ionicons name="calendar" size={24} color="#4FB2F3" />
            )
          }
          title={user.role === "user" ? "Track Hours" : "Leave"}
          onPress={() => {
            user.role === "user"
              ? router.push("/screens/home/shift/track-hours")
              : router.push("/screens/home/leave/request");
          }}
        />

        <ActionIconCard
          icon={
            user.role === "user" ? (
              <MaterialIcons name="timer" size={24} color="#4FB2F3" />
            ) : (
              <MaterialCommunityIcons
                name="timer-settings"
                size={24}
                color="#4FB2F3"
              />
            )
          }
          title={user.role === "user" ? "OT Request" : "Shift Request"}
          onPress={() => {
            user.role === "user"
              ? router.push("/screens/home/shift/overtime-request")
              : router.push("/screens/home/team/shift-requests");
          }}
        />

        <ActionIconCard
          icon={<FontAwesome name="users" size={20} color="#4FB2F3" />}
          title={user.role === "user" ? "Leave" : "Team Panel"}
          onPress={() => {
            user.role === "user"
              ? router.push("/screens/home/leave/history")
              : router.push("/screens/home/team/manage-team");
          }}
        />

        <ActionIconCard
          icon={
            user.role === "user" ? (
              <FontAwesome6
                name="repeat"
                size={20}
                color="white"
                className="bg-[#4FB2F3] rounded-full p-1"
              />
            ) : (
              <MaterialCommunityIcons
                name="calendar-plus-outline"
                size={24}
                color="#4FB2F3"
              />
            )
          }
          title={user.role === "user" ? "Swap Request" : "Week Schedule"}
          onPress={() => {
            user.role === "user"
              ? router.push("/screens/home/shift/swap-request")
              : router.push("/screens/schedule/business/weekly-schedule");
          }}
        />
      </ScrollView>
    </View>
  );
};

export default QuickAction;
