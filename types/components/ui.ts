import { GestureResponderEvent } from "react-native";

export interface PrimaryButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface TitleHeaderProps {
  className: string;
  title: string;
  subtitle: string;
}

export interface DateOfBirthInputProps {
  value: Date | null;
  onDateChange: (date: Date | null) => void;
}

type GenderOption = "male" | "female" | "other" | null;

export interface GenderSelectionProps {
  value: GenderOption;
  onGenderChange: (gender: GenderOption) => void;
}
