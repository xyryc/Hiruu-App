import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

export type SettingsContentData = {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

interface SettingsState {
  termsAndConditions: SettingsContentData | null;
  privacyPolicy: SettingsContentData | null;
  isLoadingTermsAndConditions: boolean;
  isLoadingPrivacyPolicy: boolean;
  error: Error | null;
  getTermsAndConditions: () => Promise<SettingsContentData | null>;
  getPrivacyPolicy: () => Promise<SettingsContentData | null>;
  clearError: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  termsAndConditions: null,
  privacyPolicy: null,
  isLoadingTermsAndConditions: false,
  isLoadingPrivacyPolicy: false,
  error: null,

  getTermsAndConditions: async () => {
    set({ isLoadingTermsAndConditions: true, error: null });

    try {
      const response = await axiosInstance.get("/settings/terms-and-conditions");
      const result = response.data;

      if (!result?.success) {
        const message =
          translateApiMessage(result?.message) ||
          "Failed to load terms and conditions";
        throw new Error(message);
      }

      const data = result?.data ?? null;
      set({
        termsAndConditions: data,
        isLoadingTermsAndConditions: false,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to load terms and conditions";
      const finalError = new Error(message);
      set({ isLoadingTermsAndConditions: false, error: finalError });
      throw finalError;
    }
  },

  getPrivacyPolicy: async () => {
    set({ isLoadingPrivacyPolicy: true, error: null });

    try {
      const response = await axiosInstance.get("/settings/privacy-policy");
      const result = response.data;

      if (!result?.success) {
        const message =
          translateApiMessage(result?.message) ||
          "Failed to load privacy policy";
        throw new Error(message);
      }

      const data = result?.data ?? null;
      set({
        privacyPolicy: data,
        isLoadingPrivacyPolicy: false,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to load privacy policy";
      const finalError = new Error(message);
      set({ isLoadingPrivacyPolicy: false, error: finalError });
      throw finalError;
    }
  },

  clearError: () => set({ error: null }),
}));
