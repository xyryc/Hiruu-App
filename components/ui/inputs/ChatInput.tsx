import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface AttachmentPreview {
  uri: string;
  previewType: "image" | "video";
  name: string;
}

interface ChatInputProps {
  message: string;
  setMessage: (text: string) => void;
  onSend?: () => void;
  attachments?: AttachmentPreview[];
  onPickMedia?: () => void;
  onRemoveMedia?: (uri: string) => void;
  onTyping?: () => void;
  onStopTyping?: () => void;
  isSending?: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSend,
  attachments = [],
  onPickMedia,
  onRemoveMedia,
  onTyping,
  onStopTyping,
  isSending = false,
  disabled = false,
}) => {
  const [typingTimeout, setTypingTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const handleTextChange = (text: string) => {
    setMessage(text);

    // Trigger typing indicator
    if (onTyping && text.length > 0) {
      onTyping();

      // Clear previous timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set new timeout to stop typing after 2 seconds of inactivity
      const timeout = setTimeout(() => {
        if (onStopTyping) {
          onStopTyping();
        }
      }, 2000) as unknown as NodeJS.Timeout;

      setTypingTimeout(timeout);
    } else if (onStopTyping && text.length === 0) {
      onStopTyping();
    }
  };

  const handleSend = () => {
    const canSend = message.trim().length > 0 || attachments.length > 0;
    if (canSend && !isSending && !disabled && onSend) {
      onSend();
      if (onStopTyping) {
        onStopTyping();
      }
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
  };

  return (
    <View className="px-4 py-3.5 border-t border-[#ECECEC]">
      {attachments.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-3">
          {attachments.map((attachment) => (
            <View key={attachment.uri} className="relative">
              {attachment.previewType === "image" ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={{ width: 56, height: 56, borderRadius: 10 }}
                  contentFit="cover"
                />
              ) : (
                <View className="w-14 h-14 rounded-[10px] bg-[#11293A] items-center justify-center">
                  <Ionicons name="videocam" size={18} color="#fff" />
                  <Text className="text-[10px] text-white mt-0.5" numberOfLines={1}>
                    Video
                  </Text>
                </View>
              )}

              <TouchableOpacity
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black/70 items-center justify-center"
                onPress={() => onRemoveMedia?.(attachment.uri)}
                disabled={isSending || disabled}
              >
                <Ionicons name="close" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View className="flex-row items-center gap-3">
      {/* input and file attach */}
      <View className="px-3.5 py-1 flex-1 bg-[#F5F5F5] rounded-full flex-row items-center gap-1.5">
        {/* emoji */}
        <TouchableOpacity disabled={disabled}>
          <MaterialCommunityIcons
            name="emoticon-outline"
            size={22}
            color={disabled ? "#CCC" : "#111111"}
          />
        </TouchableOpacity>

        {/* chat input */}
        <TextInput
          value={message}
          onChangeText={handleTextChange}
          placeholder="Type Something...."
          placeholderTextColor="#999"
          className="flex-1 font-proximanova-regular text-sm text-secondary"
          editable={!disabled && !isSending}
          multiline
          maxLength={1000}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />

        {/* attach file */}
        <TouchableOpacity disabled={disabled || isSending} onPress={onPickMedia}>
          <MaterialIcons
            name="attach-file"
            size={22}
            color={disabled || isSending ? "#CCC" : "#111111"}
          />
        </TouchableOpacity>
      </View>

      {/* send button */}
      <TouchableOpacity
        className="w-12 h-12 bg-[#11293A] rounded-full items-center justify-center"
        onPress={handleSend}
        disabled={(!message.trim() && attachments.length === 0) || isSending || disabled || !onSend}
        style={{
          opacity: (!message.trim() && attachments.length === 0) || isSending || disabled || !onSend ? 0.5 : 1,
        }}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Feather name="send" size={18} color="white" />
        )}
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default ChatInput;
