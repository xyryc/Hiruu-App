import ChatScreenHeader from "@/components/header/ChatScreenHeader";
import JobCard from "@/components/ui/cards/JobCard";
import NoMessages from "@/components/ui/cards/NoMessages";
import RenderMessage from "@/components/ui/cards/RenderMessage";
import ChatInput from "@/components/ui/inputs/ChatInput";
import TypingIndicator from "@/components/ui/inputs/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { callService } from "@/services/callService";
import { useAuthStore } from "@/stores/authStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [startingAudioCall, setStartingAudioCall] = useState(false);
  const messagesListRef = useRef<FlatList<any> | null>(null);
  const { user } = useAuthStore();
  const router = useRouter();
  const params = useLocalSearchParams<{ roomId?: string; userId?: string }>();

  // Backend expects roomId from route params.
  const roomId =
    typeof params?.roomId === "string" ? params.roomId : undefined;


  // Initialize room strictly from params.roomId.
  useEffect(() => {
    setLoadingRoom(true);
    if (!user?.id) {
      setLoadingRoom(false);
      return;
    }
    if (!roomId) {
      toast.error("Missing chat room id");
      setActualRoomId(null);
      setLoadingRoom(false);
      return;
    }
    setActualRoomId(roomId);
    setLoadingRoom(false);
  }, [roomId, user?.id]);

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

  const formatDateLabel = useCallback((dateString?: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  }, []);

  const mappedMessages = useMemo(() => {
    const currentUserId = user?.id;
    const sortedMessages = [...messages].sort((a, b) => {
      const aTime = new Date(a.createdAt || 0).getTime();
      const bTime = new Date(b.createdAt || 0).getTime();
      return aTime - bTime;
    });

    return sortedMessages.map((msg, index) => {
      const prev = sortedMessages[index - 1];
      const currentDateLabel = formatDateLabel(msg.createdAt);
      const prevDateLabel = prev ? formatDateLabel(prev.createdAt) : "";

      return {
        id: msg.id,
        text: msg.content || "",
        time: formatTime(msg.createdAt),
        isSent: msg.senderId === currentUserId,
        status: msg.status,
        avatar: msg.sender?.avatar || require("@/assets/images/placeholder.png"),
        showDateSeparator: index === 0 || currentDateLabel !== prevDateLabel,
        dateLabel: currentDateLabel,
      };
    });
  }, [messages, user?.id, formatDateLabel, formatTime]);

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

  const handleStartAudioCall = useCallback(async () => {
    if (!actualRoomId || startingAudioCall) return;

    const getMyParticipantStatus = (call: any) => {
      const participants = Array.isArray(call?.participants) ? call.participants : [];
      const me = participants.find((p: any) => p?.userId === user?.id);
      return String(me?.status || "").toLowerCase();
    };

    const hasOtherActiveParticipant = (call: any) => {
      const participants = Array.isArray(call?.participants) ? call.participants : [];
      return participants.some((p: any) => {
        if (!p?.userId || p.userId === user?.id) return false;
        const status = String(p?.status || "").toLowerCase();
        return status === "invited" || status === "ringing" || status === "joined";
      });
    };

    const getModeForCall = (call: any) =>
      call?.initiatedBy === user?.id ? "outgoing" : "incoming";

    try {
      console.log("[CALL_DEBUG] initiate-call:start", { roomId: actualRoomId });

      // Pre-check active call to avoid stale-call initiate errors.
      try {
        const activeResponse = await callService.getActiveCall(actualRoomId);
        const activeCall = activeResponse?.data;
        if (activeCall?.id) {
          const myStatus = getMyParticipantStatus(activeCall);
          const isInitiator = activeCall?.initiatedBy === user?.id;
          const hasOtherActive = hasOtherActiveParticipant(activeCall);
          console.log("[CALL_DEBUG] initiate-call:active-precheck", {
            callId: activeCall.id,
            callStatus: activeCall?.status,
            myStatus,
            isInitiator,
            hasOtherActive,
          });

          // If I initiated and no one else is active, close stale call then create a fresh call.
          if (isInitiator && (myStatus === "left" || !hasOtherActive)) {
            try {
              await callService.endCall(activeCall.id);
            } catch (endErr) {
              console.log("[CALL_DEBUG] initiate-call:active-precheck:end-error", endErr);
            }
          } else {
            router.push({
              pathname: "/screens/jobs/audio-call",
              params: {
                callId: activeCall.id,
                roomId: actualRoomId,
                mode: getModeForCall(activeCall),
              },
            });
            return;
          }
        }
      } catch {
        // No active call in this room, continue with initiate.
      }

      setStartingAudioCall(true);
      const response = await callService.initiateAudioCall(actualRoomId);
      console.log("[CALL_DEBUG] initiate-call:response", response);
      const callData = response?.data;
      const callId =
        callData?.id || callData?.callId || callData?.call?.id || null;

      if (!callId) {
        toast.error("Call started but call id is missing");
        return;
      }

      router.push({
        pathname: "/screens/jobs/audio-call",
        params: { callId, roomId: actualRoomId, mode: "outgoing" },
      });
    } catch (error: any) {
      console.log("[CALL_DEBUG] initiate-call:error", error);
      const apiMessage =
        error?.response?.data?.message || error?.message || "Failed to start audio call";

      if (
        typeof apiMessage === "string" &&
        apiMessage.toLowerCase().includes("already an ongoing call")
      ) {
        try {
          const activeResponse = await callService.getActiveCall(actualRoomId);
          const activeCall = activeResponse?.data;
          const activeCallId = activeCall?.id;
          if (activeCallId) {
            const isInitiator = activeCall?.initiatedBy === user?.id;
            const myStatus = getMyParticipantStatus(activeCall);
            const hasOtherActive = hasOtherActiveParticipant(activeCall);
            if (isInitiator && (myStatus === "left" || !hasOtherActive)) {
              try {
                await callService.endCall(activeCallId);
                const retry = await callService.initiateAudioCall(actualRoomId);
                const retryCallId = retry?.data?.id;
                if (retryCallId) {
                  router.push({
                    pathname: "/screens/jobs/audio-call",
                    params: {
                      callId: retryCallId,
                      roomId: actualRoomId,
                      mode: "outgoing",
                    },
                  });
                  return;
                }
              } catch (retryError) {
                console.log("[CALL_DEBUG] initiate-call:retry-after-end:error", retryError);
              }
            }
            router.push({
              pathname: "/screens/jobs/audio-call",
              params: {
                callId: activeCallId,
                roomId: actualRoomId,
                mode: isInitiator ? "outgoing" : "incoming",
              },
            });
            return;
          }
        } catch (activeError) {
          console.log("[CALL_DEBUG] initiate-call:active-call:fetch-error", activeError);
        }
      }

      toast.error(apiMessage);
    } finally {
      setStartingAudioCall(false);
    }
  }, [actualRoomId, router, startingAudioCall, user?.id]);

  useEffect(() => {
    if (!mappedMessages.length) return;
    requestAnimationFrame(() => {
      messagesListRef.current?.scrollToEnd({ animated: true });
    });
  }, [mappedMessages.length]);

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
          <ChatScreenHeader
            onAudioCallPress={handleStartAudioCall}
            isStartingAudioCall={startingAudioCall}
          />

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
            compact
            className="mx-5 bg-white border border-[#EEEEEE] mt-4"
          />

          {/* Messages */}
          <FlatList
            ref={messagesListRef}
            data={mappedMessages}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            inverted={false}
            renderItem={({ item: msg }) => (
              <>
                {msg.showDateSeparator ? (
                  <View className="flex-row items-center justify-center my-6">
                    <View className="h-[1px] flex-1 bg-[#D1D5DB]" />
                    <Text className="mx-4 text-xs font-proximanova-regular text-primary">
                      {msg.dateLabel}
                    </Text>
                    <View className="h-[1px] flex-1 bg-[#D1D5DB]" />
                  </View>
                ) : null}
                <RenderMessage msg={msg} />
              </>
            )}
            ListEmptyComponent={
              loading ? (
                <View className="py-6 items-center">
                  <Text className="text-sm text-secondary">Loading messages...</Text>
                </View>
              ) : (
                <NoMessages />
              )
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

        <TypingIndicator isTyping={isTyping} userName={typingUser || undefined} />

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
