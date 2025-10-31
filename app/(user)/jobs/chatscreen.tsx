import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import ChatScreenHeader from "@/components/header/ChatScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      text: "Hi, I just applied for the bartender position",
      time: "1:44 PM",
      isSent: true,
      isRead: true,
      avatar:
        "https://i0.wp.com/www.splento.com/blog/wp-content/uploads/2024/10/confident-young-african-american-business-woman-in-2024-04-26-18-20-12-utc-scaled.jpg?ssl=1",
    },
    {
      id: 2,
      text: "Yes, we're still hiring",
      time: "1:44 PM",
      isSent: false,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      text: "I've worked 2 years at The Lounge Bar",
      time: "1:44 PM",
      isSent: true,
      isRead: true,
      avatar:
        "https://i0.wp.com/www.splento.com/blog/wp-content/uploads/2024/10/confident-young-african-american-business-woman-in-2024-04-26-18-20-12-utc-scaled.jpg?ssl=1",
    },
    {
      id: 4,
      text: "Thank You andrew",
      time: "1:44 PM",
      isSent: false,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      text: "Wow that's great, andrew",
      time: "1:44 PM",
      isSent: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "bottom", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" />

      <View className="bg-[#E5F4FD80] flex-1">
        {/* Header */}
        <ChatScreenHeader />

        {/* Job Card */}
        <JobCard
          status="chatscreen"
          className="mx-5 bg-white border border-[#EEEEEE] mt-4"
        />

        {/* Date Divider */}
        <View className="items-center my-3">
          <View className="bg-gray-100 px-4 py-1.5 rounded-full">
            <Text className="font-proximanova-regular text-xs text-gray-600">
              Today
            </Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={`flex-row mb-4 ${
                msg.isSent ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isSent && (
                <Image
                  source={{ uri: msg.avatar }}
                  style={{ width: 32, height: 32 }}
                  className="rounded-full mr-1.5"
                />
              )}

              <View
                className={`max-w-[70%] ${
                  msg.isSent ? "items-end" : "items-start"
                }`}
              >
                <View
                  className={`px-4 py-3 rounded-2xl ${
                    msg.isSent
                      ? "bg-[#4FB2F3] rounded-br-sm"
                      : "bg-white rounded-bl-sm"
                  }`}
                >
                  <Text
                    className={`font-proximanova-regular text-sm ${
                      msg.isSent ? "text-white" : "text-primary"
                    }`}
                  >
                    {msg.text}
                  </Text>
                </View>

                <View className="flex-row items-center mt-1 gap-1 border">
                  {msg.isSent && msg.isRead && (
                    <Ionicons name="checkmark-done" size={14} color="#4FB2F3" />
                  )}
                  <Text className="font-proximanova-regular text-xs text-gray-500">
                    {msg.time}
                  </Text>
                </View>
              </View>

              {msg.isSent && (
                <Image
                  source={{ uri: msg.avatar }}
                  style={{ width: 32, height: 32 }}
                  className="rounded-full ml-1.5"
                />
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row gap-1.5">
              <View className="w-2 h-2 rounded-full bg-gray-400" />
              <View className="w-2 h-2 rounded-full bg-gray-400" />
              <View className="w-2 h-2 rounded-full bg-gray-400" />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Input Bar */}
      <View className="px-4 py-3 border-t border-[#ECECEC] flex-row items-center gap-2">
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <MaterialCommunityIcons
            name="emoticon-outline"
            size={26}
            color="#666"
          />
        </TouchableOpacity>

        <View className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-3 flex-row items-center">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type Something...."
            placeholderTextColor="#999"
            className="flex-1 font-proximanova-regular text-sm text-primary"
          />
        </View>

        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <MaterialIcons name="attach-file" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity className="w-12 h-12 bg-[#11293A] rounded-full items-center justify-center">
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
