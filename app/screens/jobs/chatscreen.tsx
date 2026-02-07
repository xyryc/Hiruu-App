import ChatScreenHeader from "@/components/header/ChatScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import NoMessages from "@/components/ui/cards/NoMessages";
import RenderMessage from "@/components/ui/cards/RenderMessage";
import ChatInput from "@/components/ui/inputs/ChatInput";
import TypingIndicator from "@/components/ui/inputs/TypingIndicator";
import { chatService } from "@/services/chatService";
import { useAuthStore } from "@/stores/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const params = useLocalSearchParams();
  const roomId =
    typeof params?.roomId === "string"
      ? params.roomId
      : "b8712c1d-9473-4450-989e-9497cb675211";

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const result = await chatService.getRoomMessages(roomId);
        const data = result?.data?.data || [];
        if (isMounted) {
          setMessages(Array.isArray(data) ? data : []);
        }
      } catch {
        // keep UI stable
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMessages();
    return () => {
      isMounted = false;
    };
  }, [roomId]);

  const formatTime = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const mappedMessages = useMemo(() => {
    const currentUserId = user?.id;
    return messages.map((msg) => ({
      id: msg.id,
      text: msg.content || "",
      time: formatTime(msg.createdAt),
      isSent: msg.senderId === currentUserId,
      status: msg.status,
      avatar: msg.sender?.avatar || require("@/assets/images/placeholder.png"),
    }));
  }, [messages, user?.id]);

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

          {/* Messages */}
          <FlatList
            data={mappedMessages}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            inverted={true}
            renderItem={({ item: msg }) => <RenderMessage msg={msg} />}
            ListHeaderComponent={<TypingIndicator />}
            ListEmptyComponent={
              loading ? (
                <View className="py-6 items-center">
                  <Text className="text-sm text-secondary">Loading...</Text>
                </View>
              ) : (
                <NoMessages />
              )
            }
            ListFooterComponent={
              <View className="flex-row items-center justify-center my-6">
                <LinearGradient
                  colors={["transparent", "#D1D5DB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="h-[1px] flex-1"
                />
                <Text className="mx-4 text-xs font-proximanova-regular text-primary">
                  Today
                </Text>
                <LinearGradient
                  colors={["#D1D5DB", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="h-[1px] flex-1"
                />
              </View>
            }
          />
        </View>

        {/* Input Bar */}
        <ChatInput message={message} setMessage={setMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
