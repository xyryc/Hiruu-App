import { ImageSource } from "expo-image";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native";

export interface PrimaryButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface SecondaryButtonProps {
  className?: string;
  textClass?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  iconColor?: string;
  iconBackground?: string;
}

export interface SmallButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface TitleHeaderProps {
  className?: string;
  title: string;
  subtitle: string;
}

export interface DateOfBirthInputProps {
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export type GenderOption = "male" | "female" | "other" | null;

export interface GenderSelectionProps {
  value: GenderOption;
  onGenderChange: (gender: GenderOption) => void;
}

export interface ProfileImagePickerProps {
  value: string | null;
  onImageChange: (imageUri: string | null) => void;
  size?: number;
}

export interface Company {
  id: string;
  name: string;
}

export interface WorkExperience {
  companyId: string;
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  isCurrentJob: boolean;
}

export interface MultiSelectCompanyDropdownProps {
  selectedCompanies: Company[];
  workExperiences: WorkExperience[];
  onCompaniesChange: (companies: Company[]) => void;
  onWorkExperiencesChange: (experiences: WorkExperience[]) => void;
}

export interface HomeHeaderProps {
  className?: string;
}

export interface WelcomeHeaderProps {
  className?: string;
}

export interface JoinCollegueProps {
  className?: string;
}

export interface FindNewJobProps {
  className?: string;
}

export interface ActionCardProps {
  title: string;
  buttonTitle?: string;
  rightImage: ImageSource;
  imageClass?: string;
  imageWidth: number;
  imageHeight: number;
  background: ImageSource;
  backgroundClass?: string;
  backgroundWidth?: number;
  backgroundHeight?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface BusinessProfileProps {
  className?: string;
}

export interface ProfileProgressProps {
  className?: string;
}

export interface TodaysShiftProps {
  className?: string;
}

interface Business {
  id: string;
  name: string;
  imageUrl: string;
}

export interface BusinessSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  businesses: Business[];
  selectedBusinesses: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export interface SwapShiftModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface QuickActionProps {
  className?: string;
}

export interface ActionIconCardProps {
  icon: ReactElement<any, any>;
  title: string;
  count?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface WorkInsightsProps {
  className?: string;
}

export interface MonthPickerProps {
  value: Date | null;
  onDateChange: (date: Date) => void;
}

export interface StatCardPrimaryProps {
  background: string;
}

export interface StatCardSecondaryProps {
  background: string;
}

type StatusType = "upcoming" | "completed" | "missed" | "ongoing" |'pending' | "approved" | 'rejected' |'accepted';

export interface StatusBadgeProps {
  label?:string
  status: StatusType;
  size?: "small" | "medium" | "large";
  className?: string;
}

export interface SimpleStatusBadgeProps {
  className?: string;
  title: string;
  textColor?: string;
  bgColor?: string;
}

export interface EngagementPerksProps {
  className?: string;
}

export interface WidgetsProps {
  className?: string;
}

export interface NoTaskCardProps {
  className?: string;
}

export interface ShiftHeaderProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface WorkShiftCardProps {
  shiftTitle: string;
  startTime: string;
  endTime: string;
  shiftImage: any;
  teamMembers: string[];
  totalMembers: number;
  address: string;
  city: string;
  onLoginPress: () => void;
  status?: "ongoing" | "upcoming" | "completed" |'pending' | "approved" | 'rejected'|'accepted';
}

export interface ScreenHeaderProps {
  onPressBack?: () => void;
  title: string;
  iconColor?: string;
  titleClass?: string;
  buttonTitle?: string;
  onPress?: () => void;
  className?: string;
  components?: React.ReactNode;
}

export interface CountdownTimerProps {
  className: string;
  targetTime: Date | string;
  onComplete?: () => void;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
