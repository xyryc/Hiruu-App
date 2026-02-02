import { authService, ChangePasswordData, ForgotPasswordData, LoginData, OAuthData, RegisterData, ResendOTPData, ResetPasswordData, VerifyAccountData } from "@/services/authService";
import { profileService, UpdateProfileData } from "@/services/profileService";
import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";

const STORAGE_KEYS = {
  USER: "auth_user",
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
  PROFILE_COMPLETE: "profile_complete",
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  isEmailVerified: boolean;
  isNumberVerified?: boolean;
  fcmToken?: string;
  phoneNumber?: string;
  countryCode?: string;
  isRestricted: boolean;
  restrictionReason?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  onboarding?: number;
}

interface StoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: Error | null;
  isInitialized: boolean;
  isProfileComplete?: boolean;
  userBusiness?: any;
  loading?: boolean;

  // Auth methods
  initializeAuth: () => Promise<void>;
  register: (data: RegisterData) => Promise<any>;
  login: (data: LoginData) => Promise<any>;
  oauthLogin: (data: OAuthData) => Promise<any>;
  verifyAccount: (data: VerifyAccountData) => Promise<any>;
  forgotPassword: (data: ForgotPasswordData) => Promise<any>;
  resetPassword: (data: ResetPasswordData) => Promise<any>;
  changePassword: (data: ChangePasswordData) => Promise<any>;
  requestVerifyAccount: () => Promise<any>;
  resendOTP: (data: ResendOTPData) => Promise<any>;
  logout: () => Promise<void>;

  // Profile methods
  updateProfile: (profileData: UpdateProfileData) => Promise<any>;
  getProfile: () => Promise<any>;

  // Business methods (keeping existing ones)
  fetchBusinesses: (search?: string) => Promise<any>;
  createCompanyManual: (companyData: any) => Promise<any>;
  createBusinessProfile: (payload: any) => Promise<any>;
  generateBusinessCode: (businessId: string) => Promise<any>;
  joinBusiness: (businessId: string, inviteCode: string) => Promise<any>;

  clearError: () => void;
  setProfileComplete: (isComplete: boolean) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  isProfileComplete: false,

  // Initialize auth state from storage on app start
  initializeAuth: async () => {
    try {
      const authData = await authService.getStoredAuthData();
      const profileCompleteStr = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_COMPLETE);
      const profileComplete =
        profileCompleteStr !== null ? profileCompleteStr === "true" : false;

      if (authData.user && authData.accessToken) {
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          isProfileComplete: profileComplete,
          isInitialized: true,
        });
      } else {
        set({ isInitialized: true, isProfileComplete: false });
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({ isInitialized: true });
    }
  },

  // Register a new user
  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.register(data);

      // For registration, we might not get tokens immediately (need verification)
      // Store user data if available
      if (response.data) {
        await AsyncStorage.setItem('auth_user', JSON.stringify(response.data));
        set({
          user: response.data,
          isLoading: false,
        });
      } else {
        // Registration successful but no user data yet (needs verification)
        set({ isLoading: false });
      }

      // Store tokens if available
      if (response.tokens) {
        await authService.storeAuthData(response);
        set({
          accessToken: response.tokens.access.token,
          refreshToken: response.tokens.refresh.token,
        });
      }

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Registration failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Login user
  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(data);

      // Store auth data if login was successful
      if (response.data && response.tokens) {
        await authService.storeAuthData(response);

        set({
          user: response.data,
          accessToken: response.tokens.access.token,
          refreshToken: response.tokens.refresh.token,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Login failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // OAuth login (Google/Apple)
  oauthLogin: async (data: OAuthData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.oauthLogin(data);

      // Store auth data if login was successful
      if (response.data && response.tokens) {
        await authService.storeAuthData(response);

        set({
          user: response.data,
          accessToken: response.tokens.access.token,
          refreshToken: response.tokens.refresh.token,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('OAuth login failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Verify account with OTP
  verifyAccount: async (data: VerifyAccountData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.verifyAccount(data);

      // Store auth data if verification was successful and we get tokens
      if (response.data && response.tokens) {
        await authService.storeAuthData(response);

        set({
          user: response.data,
          accessToken: response.tokens.access.token,
          refreshToken: response.tokens.refresh.token,
          isLoading: false,
        });
      } else if (response.data) {
        // User verified but no tokens yet
        await AsyncStorage.setItem('auth_user', JSON.stringify(response.data));
        set({
          user: response.data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Account verification failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.forgotPassword(data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Password reset request failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.resetPassword(data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Password reset failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Change password
  changePassword: async (data: ChangePasswordData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.changePassword(data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Password change failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Request account verification (for logged-in users)
  requestVerifyAccount: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.requestVerifyAccount();
      set({ isLoading: false });
      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Verification request failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Resend OTP
  resendOTP: async (data: ResendOTPData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.resendOTP(data);
      set({ isLoading: false });
      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('OTP resend failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const { refreshToken } = get();

      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      // Clear stored data
      await authService.clearAuthData();
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_COMPLETE);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isProfileComplete: false,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
      // Even if logout API fails, clear local data
      await authService.clearAuthData();
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_COMPLETE);
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isProfileComplete: false,
      });
    }
  },

  // Update user profile
  updateProfile: async (profileData: UpdateProfileData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await profileService.updateProfile(profileData);

      // Update user data in store (assuming profile service returns similar format)
      const currentUser = get().user;
      const updatedUser = {
        ...currentUser,
        ...response.data, // Adjust based on actual profile response format
      };

      // Update storage
      await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));

      set({
        user: updatedUser,
        isLoading: false,
      });

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Profile update failed');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Get user profile
  getProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await profileService.getProfile();

      // Update user data in store (assuming profile service returns similar format)
      const updatedUser = response.data; // Adjust based on actual profile response format

      // Update storage
      await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));

      set({
        user: updatedUser,
        isLoading: false,
      });

      return response;
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error('Failed to fetch profile');
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  // Business methods (keeping existing implementations)
  fetchBusinesses: async (search = "") => {
    try {
      const response = await axiosInstance.get("/companies", {
        params: { search },
      });

      const result = response.data;

      if (!result.success) {
        const errorMsg =
          result.error?.message ||
          result.message?.code ||
          "Failed to fetch businesses";
        throw new Error(errorMsg);
      }

      return result.data;
    } catch (error) {
      console.error("Fetch businesses error:", error);
      throw error;
    }
  },

  createCompanyManual: async (companyData) => {
    set({ isLoading: true, error: null });

    try {
      // Create FormData
      const formData = new FormData();

      // Add name
      if (companyData.companyName) {
        formData.append("name", companyData.companyName);
      }

      // Add logo file
      if (companyData.logo && companyData.logo.uri) {
        formData.append("logo", companyData.logo as any);
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("API URL not configured");
      }

      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const response = await fetch(`${baseUrl}/companies`, {
        method: "POST",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to add company");
      }

      set({ isLoading: false });

      return result.data ?? result;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        translateApiMessage("UNKNOWN_ERROR");
      const finalError = new Error(errorMessage);

      set({ isLoading: false, error: finalError });
      throw finalError;
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
        } as any;
        formData.append("profilePhoto", profilePhotoFile);
      }

      if (payload.coverPhoto) {
        const coverPhotoFile = {
          uri: payload.coverPhoto,
          type: "image/jpeg",
          name: "coverPhoto.jpg",
        } as any;
        formData.append("coverPhoto", coverPhotoFile);
      }

      console.log("form data", formData);

      const response = await axiosInstance.post("/profile/company", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = response.data;

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
      const axiosError = error as AxiosError<any>;
      const errorCode = axiosError.response?.data?.error?.code || "UNKNOWN_ERROR";
      const translatedMessage = translateApiMessage(errorCode);
      const finalError = new Error(translatedMessage);

      set({
        isLoading: false,
        error: finalError,
      });
      throw finalError;
    }
  },

  generateBusinessCode: async (businessId) => {
    try {
      set({ loading: true, error: null });

      const { accessToken } = get();

      const response = await axiosInstance.post(
        "/colleagues-jobs/colleague-code/generate",
        { businessId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = response.data;
      set({ loading: false });

      return result.data; // Return the generated code data
    } catch (err: any) {
      const axiosError = err as AxiosError<any>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || "Something went wrong";

      set({
        loading: false,
        error: new Error(errorMessage),
      });
      throw new Error(errorMessage);
    }

  },

  joinBusiness: async (businessId, inviteCode) => {
    try {
      set({ loading: true, error: null });
      const { accessToken } = get();

      const response = await axiosInstance.post(
        `/workforce/business/joinbusiness?businessid=${businessId}&inviteCode=${inviteCode}`,
        { businessId, inviteCode },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = response.data;

      set({ loading: false });

      return result.data;
    } catch (err: any) {
      const axiosError = err as AxiosError<any>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || "Something went wrong";

      set({
        loading: false,
        error: new Error(errorMessage),
      });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null }),

  setProfileComplete: async (isComplete: boolean) => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.PROFILE_COMPLETE,
      isComplete ? "true" : "false"
    );
    set({ isProfileComplete: isComplete });
  },
}));
