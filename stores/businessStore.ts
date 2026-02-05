import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_access_token",
};

interface BusinessState {
  isLoading: boolean;
  loading: boolean;
  error: Error | null;
  userBusiness?: any;
  myBusinesses: any[];
  myBusinessesLoading: boolean;
  selectedBusinesses: string[];

  fetchBusinesses: (search?: string) => Promise<any>;
  getMyBusinesses: (force?: boolean) => Promise<any>;
  getMyBusinessRoles: (businessId: string) => Promise<any>;
  getBusinessProfile: (businessId: string) => Promise<any>;
  setSelectedBusinesses: (ids: string[]) => void;
  createCompanyManual: (companyData: any) => Promise<any>;
  createBusinessProfile: (payload: any) => Promise<any>;
  generateBusinessCode: (businessId: string) => Promise<any>;
  joinBusiness: (businessId: string, inviteCode: string) => Promise<any>;
  clearError: () => void;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  isLoading: false,
  loading: false,
  error: null,
  userBusiness: null,
  myBusinesses: [],
  myBusinessesLoading: false,
  selectedBusinesses: [],

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

  getMyBusinesses: async (force = false) => {
    try {
      const { myBusinesses } = get();
      if (!force && myBusinesses.length > 0) {
        return myBusinesses;
      }

      set({ myBusinessesLoading: true });
      const response = await axiosInstance.get("/business/my-businesses");
      const result = response.data;

      if (!result.success) {
        const errorMsg =
          result.error?.message ||
          result.message?.code ||
          "Failed to fetch businesses";
        throw new Error(errorMsg);
      }

      set({
        myBusinesses: result.data || [],
        myBusinessesLoading: false,
      });

      return result.data;
    } catch (error) {
      set({ myBusinessesLoading: false });
      console.error("Fetch my businesses error:", error);
      throw error;
    }
  },

  getMyBusinessRoles: async (businessId) => {
    try {
      const response = await axiosInstance.get(
        `/businesses/${businessId}/roles`
      );
      const result = response.data;

      if (!result.success) {
        const errorMsg =
          result.error?.message ||
          result.message?.code ||
          "Failed to fetch roles";
        throw new Error(errorMsg);
      }

      return result.data || [];
    } catch (error) {
      console.error("Fetch roles error:", error);
      throw error;
    }
  },

  getBusinessProfile: async (businessId) => {
    try {
      const response = await axiosInstance.get(`/business/${businessId}`);
      const result = response.data;

      if (!result.success) {
        const errorMsg =
          result.error?.message ||
          result.message?.code ||
          "Failed to fetch business profile";
        throw new Error(errorMsg);
      }

      return result.data;
    } catch (error) {
      console.error("Fetch business profile error:", error);
      throw error;
    }
  },

  setSelectedBusinesses: (ids) => set({ selectedBusinesses: ids }),

  createCompanyManual: async (companyData) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();

      if (companyData.companyName) {
        formData.append("name", companyData.companyName);
      }

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

    try {
      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("API URL not configured");
      }

      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      const formData = new FormData();
      if (payload.name) formData.append("name", payload.name);
      if (payload.description) formData.append("description", payload.description);
      if (payload.address) formData.append("address", payload.address);
      if (payload.phoneNumber) formData.append("phoneNumber", payload.phoneNumber);
      if (payload.countryCode) formData.append("countryCode", payload.countryCode);
      if (payload.email) formData.append("email", payload.email);
      if (payload.website) formData.append("website", payload.website);

      if (payload.logo) {
        const logoFile = {
          uri: payload.logo,
          type: "image/jpeg",
          name: "logo.jpg",
        } as any;
        formData.append("logo", logoFile);
      }

      if (payload.coverPhoto) {
        const coverFile = {
          uri: payload.coverPhoto,
          type: "image/jpeg",
          name: "cover.jpg",
        } as any;
        formData.append("coverPhoto", coverFile);
      }

      const response = await fetch(`${baseUrl}/business`, {
        method: "POST",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        body: formData,
      });

      const rawText = await response.text();
      let result: any = null;
      try {
        result = rawText ? JSON.parse(rawText) : null;
      } catch {
        result = null;
      }

      if (!response.ok || !result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const validation = Array.isArray(result?.data)
          ? result.data.join("\n")
          : null;
        const message = validation || translateApiMessage(messageKey);
        console.error("Create business failed:", {
          status: response.status,
          body: rawText,
        });
        throw new Error(message);
      }

      set({
        userBusiness: result.data ?? null,
        isLoading: false,
        myBusinesses: result?.data
          ? [
              result.data,
              ...get().myBusinesses.filter(
                (item) => item?.id !== result.data?.id
              ),
            ]
          : get().myBusinesses,
      });

      return result;
    } catch (error) {
      const finalError =
        error instanceof Error ? error : new Error("Failed to create business");
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  generateBusinessCode: async (businessId) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post(
        `/employment/businesses/${businessId}/invitations`
      );

      const result = response.data;
      set({ loading: false });

      return result.data;
    } catch (err: any) {
      const axiosError = err as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";

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
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

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
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";

      set({
        loading: false,
        error: new Error(errorMessage),
      });
      throw new Error(errorMessage);
    }
  },

  clearError: () => set({ error: null }),
}));
