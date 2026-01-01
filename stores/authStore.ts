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

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      set({
        user: {
          id: result.data.id,
          email: result.data.email,
          phoneNumber: result.data.phoneNumber,
          fullName: result.data.fullName,
          isVerified: result.data.isVerified,
          role: result.data.role,
          businessId: result.data.businessId,
          businessName: result.data.businessName,
          roles: result.data.roles,
        },
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        isLoading: false,
      });

      return result.data;
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

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      set({
        user: {
          id: result.data.id,
          email: result.data.email,
          phoneNumber: result.data.phoneNumber,
          fullName: result.data.fullName,
          isVerified: result.data.isVerified,
          role: result.data.role,
          businessId: result.data.businessId,
          businessName: result.data.businessName,
          roles: result.data.roles,
        },
        isLoading: false,
      });

      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      set({
        user: {
          id: result.data.id,
          email: result.data.email,
          phoneNumber: result.data.phoneNumber,
          fullName: result.data.fullName,
          isVerified: result.data.isVerified,
          role: result.data.role,
          businessId: result.data.businessId,
          businessName: result.data.businessName,
          roles: result.data.roles,
        },
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        isLoading: false,
      });

      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
