import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

export type TermsAndConditionsData = {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

interface SettingsState {
  termsAndConditions: TermsAndConditionsData | null;
  isLoadingTermsAndConditions: boolean;
  error: Error | null;
  getTermsAndConditions: () => Promise<TermsAndConditionsData | null>;
  clearError: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  termsAndConditions: null,
  isLoadingTermsAndConditions: false,
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

  clearError: () => set({ error: null }),
}));
