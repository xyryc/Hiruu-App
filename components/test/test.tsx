import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const TestContact = () => {
  const [isLock, setIsLock] = useState(true);

  const contacts = [
    {
      id: 1,
      name: "David Miller",
      phone: "+917 124 1425214",
      avatar: require("@/assets/images/reward/complate-profile.svg"),
    },
    {
      id: 2,
      name: "James Wilson",
      phone: "+917 124 1425214",
      avatar: require("@/assets/images/reward/complate-profile.svg"),
    },
    {
      id: 3,
      name: "Anna Martinez",
      phone: "+917 124 1425214",
      avatar: require("@/assets/images/reward/complate-profile.svg"),
    },
    {
      id: 4,
      name: "Michael Chen",
      phone: "+917 124 1425214",
      avatar: require("@/assets/images/reward/complate-profile.svg"),
    },
  ];

  return (
    <View className="flex-1">
      <View>
        <MaterialCommunityIcons name="lock" size={24} color="black" />
      </View>
      <Text className="font-proximanova-semibold text-xl mt-4 text-primary dark:text-dark-primary mb-4">
        {isLock ? "Allow Access to Contact" : "Invite from Contact"}
      </Text>
      <View style={{ position: "relative" }} className="">
        {/* Content */}
        <View style={isLock && styles.blurContainer}>
          {contacts.map((contact, index) => (
            <View
              key={index}
              className="flex-row justify-between mb-5"
              style={isLock && { opacity: 0.4 }}
            >
              <View className="flex-row items-center gap-3">
                <View className="border-hairline rounded-full">
                  <Image
                    source={contact.avatar}
                    contentFit="contain"
                    style={{ height: 40, width: 40 }}
                    blurRadius={isLock ? 8 : 0}
                  />
                </View>
                <View>
                  <Text className="font-proximanova-semibold text-base">
                    {contact.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{contact.phone}</Text>
                </View>
              </View>
              <View className="bg-[#11293A] px-7 py-3 rounded-full">
                <Text className="font-proximanova-semibold text-sm text-white">
                  Invite
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Frosted glass overlay */}
        {isLock && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
            pointerEvents="none"
          />
        )}
      </View>

      {isLock && (
        <TouchableOpacity
          onPress={() => setIsLock(false)}
          className={`p-0.5 bg-[#fffff] rounded-full border flex-row items-center justify-center  pl-10  absolute bottom-10`}
        >
          <Text className="text-black text-center font-proximanova-semibold flex-1">
            Grant Permission
          </Text>

          <Feather
            name="arrow-right"
            size={24}
            color="#000000"
            className="p-2 bg-white rounded-full"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    overflow: "hidden",
  },
});

export default TestContact;
