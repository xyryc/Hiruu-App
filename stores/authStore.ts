import { translateApiMessage } from "@/utils/apiMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEYS = {
  USER: "auth_user",
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
  PROFILE_COMPLETE: "auth_profile_complete",
};

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isProfileComplete: false,
  isInitialized: false,

  // Initialize auth state from storage
  initializeAuth: async () => {
    try {
      const [user, accessToken, refreshToken, profileComplete] =
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.PROFILE_COMPLETE),
        ]);

      set({
        user: user ? JSON.parse(user) : null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        isProfileComplete: profileComplete === "true",
        isInitialized: true,
      });
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({ isInitialized: true });
    }
  },

  // Persist auth data to storage
  persistAuthData: async (
    userData,
    accessToken,
    refreshToken,
    profileComplete
  ) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
        accessToken &&
          AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
        refreshToken &&
          AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
        AsyncStorage.setItem(
          STORAGE_KEYS.PROFILE_COMPLETE,
          String(profileComplete)
        ),
      ]);
    } catch (error) {
      console.error("Failed to persist auth data:", error);
    }
  },

  // Set profile completion status
  setProfileComplete: async (isComplete) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PROFILE_COMPLETE,
        String(isComplete)
      );
      set({ isProfileComplete: isComplete });
    } catch (error) {
      console.error("Failed to update profile completion:", error);
    }
  },

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

      const userData = {
        id: result.data.id,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        fullName: result.data.fullName,
        isVerified: result.data.isVerified,
        role: result.data.role,
        businessId: result.data.businessId,
        businessName: result.data.businessName,
        roles: result.data.roles,
      };

      // Persist to storage (profile not complete yet)
      await get().persistAuthData(
        userData,
        result.data.accessToken,
        result.data.refreshToken,
        false
      );

      set({
        user: userData,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        isProfileComplete: false,
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

      const userData = {
        id: result.data.id,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        fullName: result.data.fullName,
        isVerified: result.data.isVerified,
        role: result.data.role,
        businessId: result.data.businessId,
        businessName: result.data.businessName,
        roles: result.data.roles,
      };

      // Persist to storage (profile not complete yet - user needs to complete setup)
      await get().persistAuthData(userData, null, null, false);

      set({
        user: userData,
        isProfileComplete: false,
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

      const userData = {
        id: result.data.id,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        fullName: result.data.fullName,
        isVerified: result.data.isVerified,
        role: result.data.role,
        businessId: result.data.businessId,
        businessName: result.data.businessName,
        roles: result.data.roles,
      };

      // Check if profile is complete from API response or assume true for login
      const profileComplete = result.data.isProfileComplete ?? true;

      // Persist to storage
      await get().persistAuthData(
        userData,
        result.data.accessToken,
        result.data.refreshToken,
        profileComplete
      );

      set({
        user: userData,
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        isProfileComplete: profileComplete,
        isLoading: false,
      });

      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  logout: async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_COMPLETE),
      ]);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isProfileComplete: false,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  },

  clearError: () => set({ error: null }),
}));
