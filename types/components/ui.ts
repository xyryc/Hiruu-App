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
