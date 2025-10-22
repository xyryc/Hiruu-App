import { QuickActionProps } from "@/types";
import {
  Feather,
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

  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-proximanova-semibold mb-4">
        Quick Actions
      </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ActionIconCard
          icon={
            <MaterialCommunityIcons name="clock" size={24} color="#4FB2F3" />
          }
          title="Track Hours"
          count={6}
          onPress={() => {
            router.push("/(user)/home/shift/track-hours/track-hours");
          }}
        />

        <ActionIconCard
          icon={
            <MaterialCommunityIcons
              name="clock-plus"
              size={24}
              color="#4FB2F3"
            />
          }
          title="OT Request"
          count={3}
          onPress={() => {
            router.push("/(user)/home/shift/overtime-action");
          }}
        />

        <ActionIconCard
          icon={<Ionicons name="calendar" size={24} color="#4FB2F3" />}
          title="Leave"
          onPress={() => {
            router.push("/(user)/home/shift/leave/leave-history");
          }}
        />

        <ActionIconCard
          icon={<Feather name="repeat" size={24} color="#4FB2F3" />}
          title="Swap Request"
          count={4}
          onPress={() => {
            router.push("/(user)/home/shift/swap-action");
          }}
        />

        <ActionIconCard
          icon={<MaterialIcons name="leaderboard" size={24} color="#4FB2F3" />}
          title="Leaderboard"
          onPress={() => {
            router.push("/(user)/home/leaderboard");
          }}
        />
      </ScrollView>
    </View>
  );
};

export default QuickAction;
