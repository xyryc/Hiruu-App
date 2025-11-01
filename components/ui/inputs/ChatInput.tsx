import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const ChatInput = ({ message, setMessage }) => {
  return (
    <View className="px-4 py-3 border-t border-[#ECECEC] flex-row items-center gap-3">
      {/* input and file attach */}
      <View className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-3 flex-row items-center gap-1.5">
        {/* emoji */}
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="emoticon-outline"
            size={22}
            color="#111111"
          />
        </TouchableOpacity>

        {/* chat input */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type Something...."
          placeholderTextColor="#999"
          className="flex-1 font-proximanova-regular text-sm text-secondary"
        />

        {/* attach file */}
        <TouchableOpacity>
          <MaterialIcons name="attach-file" size={22} color="#111111" />
        </TouchableOpacity>
      </View>

      {/* send button */}
      <TouchableOpacity className="w-12 h-12 bg-[#11293A] rounded-full items-center justify-center">
        <Feather name="send" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
