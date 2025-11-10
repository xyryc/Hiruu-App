import userData from "@/assets/data/user.json";
import { QuickActionProps } from "@/types";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
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
        {/* quick actions */}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ActionIconCard
            icon={<Ionicons name="calendar" size={24} color="#4FB2F3" />}
            title="Leave"
            onPress={() => {
              user.role === "user"
                ? router.push("/screens/home/shift/leave/leave-history")
                : router.push("/screens/home/business/leave/leave-request");
            }}
          />

          <ActionIconCard
            icon={
              <MaterialCommunityIcons
                name="timer-settings"
                size={24}
                color="#4FB2F3"
              />
            }
            title="Shift Request"
            // onPress={() => router.push("/(user)/schreen/schedule/shift/overtime")}
            onPress={() => router.push("/screens/home/business/shift-request")}
          />

          <ActionIconCard
            icon={<FontAwesome name="users" size={20} color="#4FB2F3" />}
            title="Team Panel"
            onPress={() => router.push("/screens/schedule/shift/swap")}
            // onPress={() => router.push("/(user)/schedule/shift/swap")}
          />

          <ActionIconCard
            icon={
              <MaterialCommunityIcons
                name="calendar-plus-outline"
                size={24}
                color="#4FB2F3"
              />
            }
            title="Week Schedule"
            onPress={() => router.push("/screens/schedule/shift/report")}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default QuickAction;
