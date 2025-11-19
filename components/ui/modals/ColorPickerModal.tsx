import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";

const { width } = Dimensions.get("window");

interface ColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectColor: (color: string | string[]) => void;
  initialColor?: string;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  visible,
  onClose,
  onSelectColor,
  initialColor = "#6366F1",
}) => {
  const [pickerType, setPickerType] = useState<"solid" | "gradient">("solid");
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [gradientColors, setGradientColors] = useState(["#6366F1", "#EC4899"]);
  const [activeGradientIndex, setActiveGradientIndex] = useState(0);

  // Saved solid colors
  const savedColors = [
    "#6366F1",
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#14B8A6",
    "#3B82F6",
    "#EC4899",
    "#F43F5E",
    "#A855F7",
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#84CC16",
  ];

  // Recent gradients (you can save these to AsyncStorage)
  const recentGradients = [
    ["#6366F1", "#EC4899"],
    ["#EF4444", "#F97316"],
    ["#F97316", "#EAB308"],
    ["#EAB308", "#22C55E"],
  ];

  const onSelectComplete = (colors: any) => {
    if (pickerType === "solid") {
      setSelectedColor(colors.hex);
    } else {
      const newGradientColors = [...gradientColors];
      newGradientColors[activeGradientIndex] = colors.hex;
      setGradientColors(newGradientColors);
    }
  };

  const handlePreview = () => {
    if (pickerType === "solid") {
      onSelectColor(selectedColor);
    } else {
      onSelectColor(gradientColors);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <BlurView intensity={20} tint="dark" className="flex-1 justify-end">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-white dark:bg-dark-card rounded-t-3xl p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-proximanova-bold text-primary dark:text-dark-primary">
              Change Profile color
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Type Selector */}
          <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
            <TouchableOpacity
              onPress={() => setPickerType("solid")}
              className={`flex-1 py-3 rounded-full ${
                pickerType === "solid" ? "bg-[#11293A]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-center font-proximanova-semibold ${
                  pickerType === "solid" ? "text-white" : "text-gray-600"
                }`}
              >
                Solid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPickerType("gradient")}
              className={`flex-1 py-3 rounded-full ${
                pickerType === "gradient" ? "bg-[#11293A]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-center font-proximanova-semibold ${
                  pickerType === "gradient" ? "text-white" : "text-gray-600"
                }`}
              >
                Gradient
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Color Picker */}
            <ColorPicker
              value={
                pickerType === "solid"
                  ? selectedColor
                  : gradientColors[activeGradientIndex]
              }
              onComplete={onSelectComplete}
              style={{ width: "100%" }}
            >
              <Panel1
                style={{ borderRadius: 16, height: 200, marginBottom: 20 }}
              />
              <HueSlider style={{ borderRadius: 20, height: 40 }} />
            </ColorPicker>

            {/* Gradient Color Buttons */}
            {pickerType === "gradient" && (
              <View className="flex-row gap-3 mb-4 mt-4">
                {gradientColors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveGradientIndex(index)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      activeGradientIndex === index
                        ? "border-[#4FB2F3]"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </View>
            )}

            {/* Saved Colors or Recent Gradients */}
            {pickerType === "solid" ? (
              <View className="mb-4">
                <Text className="text-sm font-proximanova-semibold text-gray-600 mb-3">
                  Saved colors:
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {savedColors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-[#4FB2F3]"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View className="mb-4">
                <Text className="text-sm font-proximanova-semibold text-gray-600 mb-3">
                  Recent Gradient:
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {recentGradients.map((gradient, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setGradientColors(gradient)}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 overflow-hidden"
                    >
                      <LinearGradient
                        colors={gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Preview Button */}
          <TouchableOpacity
            onPress={handlePreview}
            className="bg-[#11293A] rounded-full py-4 flex-row items-center justify-between px-6 mt-4"
          >
            <Text className="text-white text-lg font-proximanova-semibold flex-1 text-center">
              Preview
            </Text>
            <View className="bg-white rounded-full p-2">
              <Ionicons name="arrow-forward" size={20} color="#11293A" />
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ColorPickerModal;
