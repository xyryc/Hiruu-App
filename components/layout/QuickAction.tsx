import { QuickActionProps } from "@/types";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import ActionIconCard from "../ui/cards/ActionIconCard";

const QuickAction = ({ className }: QuickActionProps) => {
  return (
    <View className={`${className} px-4`}>
      <Text className="text-xl font-semibold mb-4">Join Your Colleagues</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ActionIconCard
          icon={
            <MaterialCommunityIcons name="clock" size={24} color="#4FB2F3" />
          }
          title="Track Hours"
          count={6}
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
        />

        <ActionIconCard
          icon={<Ionicons name="calendar" size={24} color="#4FB2F3" />}
          title="Leave"
        />

        <ActionIconCard
          icon={<Feather name="repeat" size={24} color="#4FB2F3" />}
          title="Swap Request"
          count={4}
        />

        <ActionIconCard
          icon={<MaterialIcons name="leaderboard" size={24} color="#4FB2F3" />}
          title="Leaderboard"
        />
      </ScrollView>
    </View>
  );
};

export default QuickAction;
