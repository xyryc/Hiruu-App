import ScreenHeader from "@/components/header/ScreenHeader";
import { EvilIcons, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderboardInfo = () => {
  const router = useRouter();

  // const renderComponent = ({
  //   icon,
  //   title,
  //   subtitle,
  //   point,
  //   className,
  // }: any) => {
  //   return (
  //     <View className={`flex-row gap-2.5 ${className || ""} `}>
  //       <View className="border border-[#EEEEEE] h-10 w-10 rounded-full bg-[#E5F4FD] flex-row justify-center items-center">
  //         {icon || <SimpleLineIcons name="clock" size={18} color="black" />}
  //       </View>
  //       <View className="flex-1">
  //         <View className="flex-row justify-between mt-2">
  //           <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
  //             {title || "Be On Time"}
  //           </Text>
  //           <View className="border border-[#4FB2F34D] rounded-[30px] py-1.5 px-2 bg-[#4fb2f330]">
  //             <Text
  //               className="text-[#4FB2F3] font-proximanova-regular text-sm text-center"
  //               numberOfLines={1}
  //             >
  //               {point || " +40 Points/month"}
  //             </Text>
  //           </View>
  //         </View>
  //         <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary ">
  //           {subtitle || "+2 points for every day you arrive on time"}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  const renderComponent = ({
    icon,
    title,
    subtitle,
    point,
    className,
  }: any) => {
    return (
      <View className={`flex-row gap-2.5 ${className || ""}`}>
        <View className="border border-[#EEEEEE] h-10 w-10 rounded-full bg-[#E5F4FD] flex-row justify-center items-center">
          {icon || <SimpleLineIcons name="clock" size={18} color="black" />}
        </View>
        <View className="flex-1">
          {/* Title and Points */}
          <View className="flex-row justify-between mt-2">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              {title || "Be On Time"}
            </Text>
            <View className="border border-[#4FB2F34D] rounded-[30px] py-1.5 px-2 bg-[#4fb2f330]">
              <Text className="text-[#4FB2F3] font-proximanova-regular text-sm">
                {point || "+40 Points/month"}
              </Text>
            </View>
          </View>
          {/* Subtitle */}
          <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary ">
            {subtitle || "+2 points for every day you arrive on time"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor="#BDE4F9" />

      {/* Custom Header */}
      <ScreenHeader
        onPressBack={() => router.back()}
        className="px-4 mt-2"
        title="Leaderboard Info"
      />

      {/* rules */}
      <ScrollView className="mt-7 mx-5">
        {/* rules */}
        <View className="bg-[#E5F4FD] rounded-xl p-4">
          {/* Title */}
          <Text className="font-proximanova-semibold text-lg mb-3">
            Visibility Rules:
          </Text>

          {/* Item 1 */}
          <View className="flex-row gap-2">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              1.
            </Text>
            <Text className="flex-1 text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Employees automatically appear on the leaderboard when they start
              earning points through their shift activity.
            </Text>
          </View>

          {/* Item 2 */}
          <View className="flex-row gap-2">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              2.
            </Text>
            <Text className="flex-1 text-sm font-proximanova-regular text-secondary dark:text-dark-secondary">
              Rankings reset at the start of each month.
            </Text>
          </View>
        </View>

        {/* card */}
        <View>
          {renderComponent({
            className: "mt-8",
          })}
          {renderComponent({
            icon: <EvilIcons name="calendar" size={25} color="black" />,
            title: "Arrive Early",
            subtitle: "Show up 10+ minutes early",
            point: "+1 Point/shift",
            className: "mt-4",
          })}{" "}
          {renderComponent({
            icon: <Feather name="repeat" size={18} color="black" />,
            title: "Cover a Teammate’s Shift",
            subtitle: "Accept and complete a swap request",
            point: "+2 Points/shift",
            className: "mt-4",
          })}
          {renderComponent({
            icon: <EvilIcons name="star" size={24} color="black" />,
            title: "Get 5-Star Client Feedback",
            subtitle:
              "Deliver great service that clients love and rate highly. monthly attendance to earn a consistency",
            point: "+100 Points",
            className: "mt-4",
          })}
          {renderComponent({
            icon: <EvilIcons name="check" size={24} color="black" />,
            title: "Complete All Assigned Tasks",
            subtitle:
              "Stay on top of your daily duties to earn extra points. monthly attendance to earn a consistency",
            point: "+120 Points",
            className: "mt-4",
          })}
          {renderComponent({
            title: "Complete All Assigned Tasks",
            subtitle:
              "Stay on top of your daily duties to earn extra points. monthly attendance to earn a consistency",
            point: "+120 Points",
            className: "mt-4",
          })}
          {renderComponent({
            icon: <EvilIcons name="close-o" size={24} color="black" />,
            title: "No Leave in One Month",
            subtitle:
              "Maintain perfect monthly attendance to earn a consistency monthly attendance to earn a consistency bonus.",
            point: "+180 Points",
            className: "mt-4",
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardInfo;
