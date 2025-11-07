import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import ShiftsSummaryCard from "../ui/cards/ShiftsSummaryCard";
import { Image } from "expo-image";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const TodayShiftsSummary = ({ className }: any) => {
  const teamMembers = ["John", "Jane", "Mike", "Sarah", "Tom"];
  return (
    <LinearGradient
      colors={["#4FB2F350", "#4FB2F320"]}
      style={{
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 15,
        overflow: "hidden",
      }}
      className="border border-[#4FB2F3]"
    >
      <View className={className}>
        <Text className="text-xl font-proximanova-semibold text-black">
          Today’s Shifts Summary
        </Text>
        <ShiftsSummaryCard
          icon={<Ionicons name="calendar" size={20} color="#4FB2F3" />}
          title="Total scheduled shifts"
          endItem="15"
          className="mt-2.5"
        />
        <ShiftsSummaryCard
          className="mt-2.5"
          icon={
            <MaterialCommunityIcons
              name="clock-alert"
              size={20}
              color="#4FB2F3"
            />
          }
          title="Late arrivals"
          endItem="4"
        />
        <ShiftsSummaryCard
          className="mt-2.5"
          icon={<FontAwesome6 name="user-group" size={17} color="#4FB2F3" />}
          title="Currently working"
          endItem={
            <View className="flex-row items-center">
              {/* Avatar Stack */}
              <View className="flex-row">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <View
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 justify-center items-center"
                    style={{
                      marginLeft: index > 0 ? -8 : 0,
                      zIndex: 10 - index,
                    }}
                  >
                    <Text className="text-xs font-proximanova-medium text-gray-600">
                      {member.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                ))}

                {teamMembers.length > 3 && (
                  <View
                    className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 justify-center items-center"
                    style={{ marginLeft: -8, zIndex: 7 }}
                  >
                    <Text className="text-xs font-proximanova-bold text-white">
                      +{teamMembers.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          }
        />

        <Image
          source={require("@/assets/images/dotted-line.svg")}
          contentFit="contain"
          style={{ height: 2, width: 350, marginVertical: 10 }}
        />
        <PrimaryButton title="View Shift Report" />
      </View>
    </LinearGradient>
  );
};

export default TodayShiftsSummary;
