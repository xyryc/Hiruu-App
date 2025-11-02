import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import ChatScreenHeader from "@/components/header/ChatScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import NoMessages from "@/components/ui/cards/NoMessages";
import TypingIndicator from "@/components/ui/inputs/TypingIndicator";
import RenderMessage from "@/components/ui/cards/RenderMessage";
import ChatInput from "@/components/ui/inputs/ChatInput";

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

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* message content */}
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
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            inverted={true}
            renderItem={({ item: msg }) => <RenderMessage msg={msg} />}
            ListHeaderComponent={<TypingIndicator />}
            ListEmptyComponent={<NoMessages />}
          />
        </View>

        {/* Input Bar */}
        <ChatInput message={message} setMessage={setMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
