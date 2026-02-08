import ChatScreenHeader from "@/components/header/ChatScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import NoMessages from "@/components/ui/cards/NoMessages";
import RenderMessage from "@/components/ui/cards/RenderMessage";
import ChatInput from "@/components/ui/inputs/ChatInput";
import TypingIndicator from "@/components/ui/inputs/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { chatService } from "@/services/chatService";
import { useAuthStore } from "@/stores/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [actualRoomId, setActualRoomId] = useState<string | null>(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuthStore();
  const params = useLocalSearchParams();

  // This might be a roomId or a userId (for creating/getting a direct chat)
  const paramId = typeof params?.roomId === "string"
    ? params.roomId
    : "b8712c1d-9473-4450-989e-9497cb675211";

  // Get or create chat room (only run once per paramId change)
  useEffect(() => {
    let isMounted = true;

    const initializeChat = async () => {
      try {
        setLoadingRoom(true);

        // Check if paramId is a valid room ID by trying to load messages
        try {
          await chatService.getRoomMessages(paramId, 1, 1);
          if (isMounted) {
            setActualRoomId(paramId);
          }
        } catch (error: any) {
          // If it fails, assume it's a user ID and create/get direct chat
          const result = await chatService.createDirectChat(paramId);
          const roomId = result?.data?.id;

          if (roomId && isMounted) {
            setActualRoomId(roomId);
          } else {
            throw new Error('Failed to get room ID from response');
          }
        }
      } catch (error: any) {
        console.error('Failed to initialize chat:', error.message);
        if (isMounted) {
          toast.error('Failed to load chat');
        }
      } finally {
        if (isMounted) {
          setLoadingRoom(false);
        }
      }
    };

    if (user?.id && !actualRoomId) {
      initializeChat();
    }

    return () => {
      isMounted = false;
    };
  }, [paramId, user?.id]);

  // IMPORTANT: Always call useChat hook unconditionally
  // Pass empty string if roomId not ready yet
  const {
    messages,
    loading,
    sending,
    connected,
    isTyping,
    typingUser,
    sendMessage,
    startTyping,
    stopTyping,
    refreshMessages,
  } = useChat({
    roomId: actualRoomId || '', // Pass empty string if not ready
    onError: (error) => {
      // Show user-friendly error messages
      const errorMessage = error.message || "Something went wrong";

      if (errorMessage.includes("cannot send messages")) {
        toast.error("You don't have permission to send messages in this chat");
      } else if (errorMessage.includes("not found")) {
        toast.error("Chat room not found");
      } else if (errorMessage.includes("unauthorized")) {
        toast.error("You need to login again");
      } else {
        toast.error(errorMessage);
      }
    },
  });

  const formatTime = useCallback((dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

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
  }, [messages, user?.id, formatTime]);

  const handleSend = useCallback(async () => {
    if (!message.trim() || sending) return;

    const messageToSend = message.trim();
    setMessage(""); // Clear input immediately

    await sendMessage(messageToSend);
  }, [message, sending, sendMessage]);

  const handleTyping = useCallback(() => {
    startTyping();
  }, [startTyping]);

  const handleStopTyping = useCallback(() => {
    stopTyping();
  }, [stopTyping]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshMessages();
    setRefreshing(false);
  }, [refreshMessages]);

  // Show loading state while getting room ID
  if (loadingRoom || !actualRoomId) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <StatusBar barStyle="dark-content" />
        <Text className="text-base text-secondary">Loading chat...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "bottom", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* message content */}
        <View className="bg-[#E5F4FD80] flex-1">
          {/* Header */}
          <ChatScreenHeader />

          {/* Connection Status */}
          {!connected && (
            <View className="bg-yellow-100 px-4 py-2">
              <Text className="text-xs text-yellow-800 text-center font-proximanova-regular">
                Connecting to chat...
              </Text>
            </View>
          )}

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
            ListHeaderComponent={
              <TypingIndicator isTyping={isTyping} userName={typingUser || undefined} />
            }
            ListEmptyComponent={
              loading ? (
                <View className="py-6 items-center">
                  <Text className="text-sm text-secondary">Loading messages...</Text>
                </View>
              ) : (
                <NoMessages />
              )
            }
            ListFooterComponent={
              mappedMessages.length > 0 ? (
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
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#4FB2F3"
              />
            }
          />
        </View>

        {/* Input Bar */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
          onTyping={handleTyping}
          onStopTyping={handleStopTyping}
          isSending={sending}
          disabled={!connected}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
