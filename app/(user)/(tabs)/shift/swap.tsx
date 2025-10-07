import users from "@/assets/data/users.json";
import ScreenHeader from "@/components/header/ScreenHeader";
import SimpleStatusBadge from "@/components/ui/badges/SimpleStatusBadge";
import SearchBar from "@/components/ui/inputs/SearchBar";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SwapShifts = () => {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const isSelected = (userId: string) => {
    return selectedUsers.includes(userId);
  };

  const toggleUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      // Deselect user
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // Select user (check max limit)
      if (selectedUsers.length < users.length) {
        setSelectedUsers([...selectedUsers, userId]);
      }
    }
  };

  return (
    <View>
      <SafeAreaView
        className="bg-[#E5F4FD] rounded-b-[20px]"
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar style="dark" backgroundColor="#E5F4FD" />

        {/* Custom Header */}
        <ScreenHeader
          onPressBack={() => router.back()}
          className="px-4"
          title="Detail"
          titleClass="dark:text-primary"
          iconColor="#111111"
          components={
            <SimpleStatusBadge
              title="All Cashiers"
              className="border-[0.5px] border-[#F3934F4D]"
              textColor="#F3934F"
            />
          }
        />
      </SafeAreaView>

      <View className="p-5">
        <SearchBar />

        <View className="mt-4">
          <Text className="font-semibold text-primary dark:text-dark-primary mb-4">
            Select ({selectedUsers.length}/{users.length})
          </Text>

          {/* user List */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {users.map((user) => (
              <TouchableOpacity
                key={user.id}
                onPress={() => toggleUser(user.id)}
                className="flex-row items-center pb-3 mb-3 rounded-xl border-b border-[#0B113C1A]"
              >
                {/* User Avatar */}
                <View className="rounded-full mr-4 justify-center items-center">
                  <Image
                    source={user.imageUrl}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                    }}
                    contentFit="cover"
                  />
                </View>

                {/* User Name */}
                <Text className="flex-1 font-proximanova-semibold">
                  {user.name}
                </Text>

                {/* Selection Indicator */}
                <View
                  className={`rounded-full border ${
                    isSelected(user.id)
                      ? "bg-[#4FB2F3] border-[#7A7A7A]"
                      : "bg-white"
                  } justify-center items-center`}
                >
                  {isSelected(user.id) && (
                    <Entypo
                      name="check"
                      size={20}
                      color={isSelected(user.id) ? "#fff" : "#4FB2F3"}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SwapShifts;
