import { translateApiMessage } from "@/utils/apiMessages";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  signup: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const translatedMessage = translateApiMessage(result.message);
        throw new Error(translatedMessage);
      }

      set({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        isLoading: false,
      });

      return result;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  verifyOTP: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const translatedMessage = translateApiMessage(result.message);
        throw new Error(translatedMessage);
      }

      set({
        user: result.user,
        isLoading: false,
      });

      return result;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
