import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputProps {
  message: string;
  setMessage: (text: string) => void;
  onSend: () => void;
  onTyping?: () => void;
  onStopTyping?: () => void;
  isSending?: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSend,
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
    if (message.trim() && !isSending && !disabled) {
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
    <View className="px-4 py-3.5 border-t border-[#ECECEC] flex-row items-center gap-3">
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
        <TouchableOpacity disabled={disabled}>
          <MaterialIcons
            name="attach-file"
            size={22}
            color={disabled ? "#CCC" : "#111111"}
          />
        </TouchableOpacity>
      </View>

      {/* send button */}
      <TouchableOpacity
        className="w-12 h-12 bg-[#11293A] rounded-full items-center justify-center"
        onPress={handleSend}
        disabled={!message.trim() || isSending || disabled}
        style={{
          opacity: !message.trim() || isSending || disabled ? 0.5 : 1,
        }}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Feather name="send" size={18} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
