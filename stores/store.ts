import { translateApiMessage } from "@/utils/apiMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEYS = {
  USER: "auth_user",
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
};

export const useStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Add this function to persist auth data to AsyncStorage
  persistAuthData: async (user, accessToken, refreshToken) => {
    try {
      const promises = [
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      ];

      if (accessToken) {
        promises.push(
          AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
        );
      }

      if (refreshToken) {
        promises.push(
          AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
        );
      }

      await Promise.all(promises);
    } catch (error) {
      console.error("Failed to persist auth data:", error);
      throw error;
    }
  },

  // Add this function to initialize auth state from storage on app start
  initializeAuth: async () => {
    try {
      const [user, accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      ]);

      if (user) {
        set({
          user: JSON.parse(user),
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
          isInitialized: true,
        });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({ isInitialized: true });
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
        },
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
        false,
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
        },
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
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);
        throw new Error(translatedMessage);
      }

      await get().persistAuthData(
        result.data,
        result.data.accessToken,
        result.data.refreshToken,
      );

      set({
        user: result.data,
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

  logout: async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),

      ]);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,

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
        },
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
        JSON.stringify(updatedUser),
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
        },
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
        },
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

  createBusinessProfile: async (payload) => {
    set({ isLoading: true, error: null });

    console.log("API URL:", `${process.env.EXPO_PUBLIC_API_URL}`);

    try {
      // Create FormData for the request
      const formData = new FormData();
      const { accessToken } = get();

      // Add text fields
      Object.keys(payload).forEach((key) => {
        if (key !== "profilePhoto" && key !== "coverPhoto") {
          // Handle complex objects like location
          if (typeof payload[key] === "object" && payload[key] !== null) {
            formData.append(key, JSON.stringify(payload[key]));
          } else {
            formData.append(key, payload[key]);
          }
        }
      });

      // Add image files if they exist
      if (payload.profilePhoto) {
        const profilePhotoFile = {
          uri: payload.profilePhoto,
          type: "image/jpeg",
          name: "profilePhoto.jpg",
        };
        formData.append("profilePhoto", profilePhotoFile);
      }

      if (payload.coverPhoto) {
        const coverPhotoFile = {
          uri: payload.coverPhoto,
          type: "image/jpeg",
          name: "coverPhoto.jpg",
        };
        formData.append("coverPhoto", coverPhotoFile);
      }

      console.log("form data", formData);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/profile/company`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      // console.log("Response status:", response.status);
      // console.log("Response data:", result);

      if (!response.ok) {
        const errorCode = result.error?.code || "UNKNOWN_ERROR";
        const translatedMessage = translateApiMessage(errorCode);

        throw new Error(translatedMessage);
      }

      if (result.success) {
        set({
          userBusiness: result.data.business,
          isLoading: false,
        });

        return result;
      } else {
        throw new Error(
          result.message?.code || "Failed to create business profile",
        );
      }
    } catch (error) {
      console.error("Error in createBusinessProfile:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
      throw error;
    }
  },

  generateBusinessCode: async (businessId) => {
    try {
      set({ loading: true, error: null });

      const { accessToken } = get();

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/colleagues-jobs/colleague-code/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ businessId })
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate code");
      }

      const result = await res.json();
      set({ loading: false });

      return result.data; // Return the generated code data
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || "Something went wrong",
      });
      throw err;
    }

  },

  joinBusiness: async (businessId, inviteCode) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/workforce/business/joinbusiness?businessid=${businessId}&inviteCode=${inviteCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}` if needed
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to join business");
      }

      set({ loading: false });
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || "Something went wrong",
      });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
