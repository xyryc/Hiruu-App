import { ImageSource } from "expo-image";
import { ReactElement } from "react";
import { GestureResponderEvent } from "react-native";

export interface PrimaryButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface SecondaryButtonProps {
  className?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
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
  buttonTitle: string;
  rightImage: ImageSource;
  imageClass?: string;
  imageWidth: number;
  imageHeight: number;
  background: ImageSource;
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

export interface QuickActionProps {
  className?: string;
}

export interface ActionIconCardProps {
  icon: ReactElement<any, any>;
  title: string;
  count?: number;
}

export interface WorkInsightsProps {
  className?: string;
}
