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

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });

    try {
      const { accessToken } = get();

      if (!accessToken) {
        const errorMessage = translateApiMessage("NO_AUTH_TOKEN");
        throw new Error(errorMessage);
      }

      // Create FormData
      const formData = new FormData();

      // Add all profile data fields directly
      Object.keys(profileData).forEach((key) => {
        const value = profileData[key];

        if (value === null || value === undefined) {
          return; // Skip null/undefined
        }

        // Handle file objects (images) - check for uri, type, name
        if (value.uri && value.type && value.name) {
          formData.append(key, value as any);
        }
        // Handle objects (like location)
        else if (typeof value === "object" && !(value instanceof Date)) {
          formData.append(key, JSON.stringify(value));
        }
        // Handle dates
        else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        }
        // Handle primitives
        else {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // DO NOT set Content-Type for FormData - browser sets it automatically with boundary
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      // Update user data with profile info
      const currentUser = get().user;
      const updatedUser = {
        ...currentUser,
        ...result.data.profile,
      };

      // Update storage
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(updatedUser)
      );

      set({
        user: updatedUser,
        isLoading: false,
      });

      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  fetchBusinesses: async () => {
    try {
      const { accessToken } = get();

      if (!accessToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/workforce/business/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMsg =
          result.error?.message ||
          result.message?.code ||
          "Failed to fetch businesses";
        // console.error("API Error:", errorMsg, result);
        throw new Error(errorMsg);
      }

      // Convert object to array
      const businessesArray = Object.values(result.data);

      return businessesArray;
    } catch (error) {
      console.error("Fetch businesses error:", error);
      throw error;
    }
  },

  createCompanyManual: async (companyData) => {
    set({ isLoading: true, error: null });

    try {
      const { accessToken } = get();

      if (!accessToken) {
        const errorMessage = translateApiMessage("NO_AUTH_TOKEN");
        throw new Error(errorMessage);
      }

      // Create FormData
      const formData = new FormData();

      // Add companyName
      if (companyData.companyName) {
        formData.append("companyName", companyData.companyName);
      }

      // Add logo file
      if (companyData.logo && companyData.logo.uri) {
        formData.append("logo", companyData.logo as any);
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/profile/company/manual`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      set({ isLoading: false });

      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
