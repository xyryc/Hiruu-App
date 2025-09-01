import { GestureResponderEvent } from "react-native";

export interface PrimaryButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}


export interface HeaderProps {
  className: string,
  title: string, 
  subtitle: string
}