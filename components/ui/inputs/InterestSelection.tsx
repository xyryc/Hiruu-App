import React from "react";
import { Text, View } from "react-native";
import InterestGrid from "./InterestGrid";

interface InterestsSelectionProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  maxSelections?: number;
  readonly?: boolean;
  showSelectedOnly?: boolean;
}

const InterestsSelection: React.FC<InterestsSelectionProps> = ({
  selectedInterests,
  onInterestsChange,
  maxSelections = 10,
  readonly = false,
  showSelectedOnly = false,
}) => {
  const toggleInterest = (interestId: string) => {
    if (readonly) return;
    const isSelected = selectedInterests.includes(interestId);

    if (isSelected) {
      onInterestsChange(selectedInterests.filter((id) => id !== interestId));
    } else if (selectedInterests.length < maxSelections) {
      onInterestsChange([...selectedInterests, interestId]);
    }
  };

  return (
    <View>
      {!readonly && (
        <View className="mb-6">
          <Text className="text-xl font-proximanova-semibold text-gray-900 mb-2">
            What are your interests?
          </Text>
          <Text className="text-sm text-gray-600">
            Select up to {maxSelections} interests ({selectedInterests.length}/
            {maxSelections} selected)
          </Text>
        </View>
      )}

      <InterestGrid
        selectedInterests={selectedInterests}
        onToggle={toggleInterest}
        readonly={readonly}
        showSelectedOnly={showSelectedOnly}
      />

      {!readonly && selectedInterests.length >= maxSelections && (
        <View className="mt-4 p-3 bg-blue-50 rounded-lg">
          <Text className="text-blue-700 text-sm text-center">
            Maximum selections reached. Deselect an interest to choose another.
          </Text>
        </View>
      )}
    </View>
  );
};

export default InterestsSelection;
