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
