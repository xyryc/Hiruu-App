import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import SmallButton from "../buttons/SmallButton";

const SOCIAL_ITEMS = [
  { id: "facebook", label: "Facebook", icon: require("@/assets/images/facebook2.svg") },
  { id: "linkedin", label: "LinkedIn", icon: require("@/assets/images/linkedin.svg") },
  { id: "whatsapp", label: "WhatsApp", icon: require("@/assets/images/whatsapp.svg") },
  { id: "twitter", label: "Twitter", icon: require("@/assets/images/twitter.svg") },
  { id: "telegram", label: "Telegram", icon: require("@/assets/images/telegram.svg") },
  { id: "instagram", label: "Instagram", icon: require("@/assets/images/instagram.svg") },
] as const;

const ConnectSocials = ({ className }: any) => {
  const [linkedValues, setLinkedValues] = useState<Record<string, string>>({});
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const startLink = (id: string) => {
    setEditingValues((prev) => ({ ...prev, [id]: linkedValues[id] || "" }));
  };

  const confirmLink = (id: string) => {
    const value = (editingValues[id] || "").trim();
    if (!value) return;

    setLinkedValues((prev) => ({ ...prev, [id]: value }));
    setEditingValues((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const removeLink = (id: string) => {
    setLinkedValues((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setEditingValues((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateDraft = (id: string, value: string) => {
    setEditingValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <View className={`${className} border border-[#EEEEEE] rounded-xl`}>
      {SOCIAL_ITEMS.map((item, index) => {
        const isEditing = Object.prototype.hasOwnProperty.call(editingValues, item.id);
        const linkedValue = linkedValues[item.id];
        const inputValue = editingValues[item.id] || "";

        return (
          <View
            key={item.id}
            className={`flex-row justify-between items-center p-3 ${
              index !== SOCIAL_ITEMS.length - 1 ? "border-b border-[#EEEEEE]" : ""
            }`}
          >
            <TouchableOpacity className="flex-row items-center gap-1.5">
              <Image
                style={{ height: 36, width: 36 }}
                source={item.icon}
                contentFit="contain"
              />
              <Text className="text-sm font-proximanova-semibold">{item.label}</Text>
            </TouchableOpacity>

            {isEditing ? (
              <View className="flex-row items-center gap-2 max-w-[56%]">
                <TextInput
                  value={inputValue}
                  onChangeText={(value) => updateDraft(item.id, value)}
                  placeholder={`Enter ${item.label}`}
                  className="bg-white border border-[#D8D8D8] rounded-full px-3 py-2 text-xs min-w-[120px]"
                />
                <TouchableOpacity
                  onPress={() => confirmLink(item.id)}
                  className="w-8 h-8 rounded-full bg-[#11293A] items-center justify-center"
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : linkedValue ? (
              <View className="flex-row items-center gap-2 max-w-[56%]">
                <Text className="text-sm font-proximanova-semibold text-primary" numberOfLines={1}>
                  {linkedValue}
                </Text>
                <TouchableOpacity onPress={() => removeLink(item.id)}>
                  <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
              </View>
            ) : (
              <SmallButton title="Link" onPress={() => startLink(item.id)} />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default ConnectSocials;
