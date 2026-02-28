import RoleChip, { DEFAULT_ROLE_CHIPS } from "@/components/ui/badges/RoleChip";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const ShiftTemplateCard = ({
  className,
  title,
  weekly,
  timeRange,
  breakTimeRange,
  location,
  roles,
  businessName,
  businessLogo,
  templateId,
  businessId,
  onDelete,
  assignParams,
  assignmentStatusText,
  isAssignmentComplete,
}: any) => {
  const scrollX = new Animated.Value(0);
  const roleChips =
    Array.isArray(roles) && roles.length > 0 ? roles : DEFAULT_ROLE_CHIPS;

  return (
    <View className={`${className}`}>
      <View className="border border-[#EEEEEE] rounded-[14px]">
        <View className="bg-[#E5F4FD] rounded-t-[14px] flex-row justify-between items-center py-1.5">
          <Text className="mx-3 font-proximanova-semibold text-primary dark:text-dark-primary ">
            {title}
          </Text>
          <View className="flex-row gap-1.5 items-center mx-3">
            {weekly && (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/screens/schedule/business/assign",
                    params: assignParams,
                  })
                }
                className="h-10 w-10 rounded-full bg-[#FFF] flex-row justify-center items-center"
              >
                <AntDesign name="user-add" size={16} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/screens/schedule/business/edit-template",
                  params: {
                    templateId,
                    businessId,
                  },
                })
              }
              className="h-9 w-9 rounded-full bg-[#FFF] flex-row justify-center items-center "
            >
              <Feather name="edit-2" size={16} color="black" />
            </TouchableOpacity>

            {/* delete shift */}
            {weekly || (
              <TouchableOpacity onPress={onDelete}>
                <EvilIcons name="trash" size={24} color="#F34F4F" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* time box */}
        <View className="p-4">
          <View className="flex-row justify-between items-center ">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              Time:
            </Text>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary ">
              {timeRange || "7:00 AM - 3:00 PM"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-2.5 ">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              Break Time:
            </Text>
            <Text className="font-proximanova-regular text-sm text-primary dark:text-dark-primary ">
              {breakTimeRange || "10:00 AM - 11:00 PM"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-2.5">
            <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
              Location:
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-proximanova-regular text-sm text-primary dark:text-dark-primary w-1/2 text-right"
            >
              {location || "Location not defined"}
            </Text>
          </View>

          <View className="flex-row items-start mt-2.5">
            {/* Label */}
            <Text className="font-proximanova-regular text-[14px] text-secondary dark:text-dark-secondary mt-2">
              Roles:
            </Text>

            {/* Scrollable Role Chips with fade edge */}
            <View className="flex-1 ml-2">
              <Animated.FlatList
                data={roleChips}
                horizontal
                keyExtractor={(item, index) =>
                  `${item?.businessRoleName || item?.roleName || item?.name || item?.role?.name || item?.roleId || "role"}-${item?.roleId || index}`
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingRight: 20 }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                renderItem={({ item }) => (
                  <RoleChip
                    name={
                      item?.businessRoleName ||
                      item?.roleName ||
                      item?.name ||
                      item?.role?.name ||
                      item?.roleId ||
                      "Role"
                    }
                    count={Number(item?.count || 0)}
                    bg={item?.bg}
                    color={item?.color}
                  />
                )}
              />

              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 50,
                }}
              />
            </View>
          </View>

          {weekly && assignmentStatusText ? (
            <View className="flex-row items-center mt-2.5">
              <Feather
                name={isAssignmentComplete ? "check-circle" : "alert-triangle"}
                size={16}
                color={isAssignmentComplete ? "#22C55E" : "#F34F4F"}
              />
              <Text
                numberOfLines={2}
                className={`ml-1.5 text-sm font-proximanova-regular ${isAssignmentComplete ? "text-[#22C55E]" : "text-[#F34F4F]"
                  }`}
              >
                {assignmentStatusText}
              </Text>
            </View>
          ) : null}

          {/* line  */}
          <Image
            source={require("@/assets/images/dotted-line.svg")}
            contentFit="contain"
            style={{ width: "100%", height: 2, marginTop: 15 }}
          />

          {/* business logo and name */}
          <View className="flex-row gap-2 items-center mt-3">
            <Image
              source={
                businessLogo
                  ? { uri: businessLogo }
                  : require("@/assets/images/adaptive-icon.png")
              }
              contentFit="contain"
              style={{ width: 30, height: 30, borderRadius: 999 }}
            />
            <Text className="font-proximanova-regular  text-secondary dark:text-dark-secondary">
              {businessName || "Palm Beach"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShiftTemplateCard;
