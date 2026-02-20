import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

type CreateRecruitmentPayload = {
  roleId: string;
  description: string;
  gender: string;
  experience: string;
  ageMin: number;
  ageMax: number;
  shiftStartTime: string;
  shiftEndTime: string;
  salaryMin: number;
  salaryMax: number;
  requiredSkills: string[];
  salaryType: "hourly" | "monthly";
  numberOfOpenings: number;
};

interface JobState {
  isLoading: boolean;
  error: Error | null;
  getPublicRecruitments: () => Promise<any[]>;
  getRecruitmentsByBusiness: (businessId: string) => Promise<any[]>;
  getFeaturedRecruitments: (businessId: string) => Promise<any[]>;
  getRecruitmentById: (businessId: string, id: string) => Promise<any>;
  getReceivedApplications: (businessId: string) => Promise<any[]>;
  getMyApplications: () => Promise<any[]>;
  createRecruitment: (
    businessId: string,
    payload: CreateRecruitmentPayload
  ) => Promise<any>;
  applyForJob: (recruitmentId: string) => Promise<any>;
  clearError: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  isLoading: false,
  error: null,

  getPublicRecruitments: async () => {
    try {
      const response = await axiosInstance.get("/recruitment/public");
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const validation = Array.isArray(result?.data)
          ? result.data.join("\n")
          : null;
        const message = validation || translateApiMessage(messageKey);
        throw new Error(message);
      }

      return Array.isArray(result?.data) ? result.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const apiValidation = Array.isArray(axiosError.response?.data?.data)
        ? axiosError.response?.data?.data?.join("\n")
        : null;
      const message =
        apiValidation ||
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch jobs";
      throw new Error(message);
    }
  },

  getRecruitmentsByBusiness: async (businessId: string) => {
    try {
      const response = await axiosInstance.get(`/recruitment/${businessId}`);
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const validation = Array.isArray(result?.data)
          ? result.data.join("\n")
          : null;
        const message = validation || translateApiMessage(messageKey);
        throw new Error(message);
      }

      return Array.isArray(result?.data) ? result.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const apiValidation = Array.isArray(axiosError.response?.data?.data)
        ? axiosError.response?.data?.data?.join("\n")
        : null;
      const message =
        apiValidation ||
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch business recruitments";
      throw new Error(message);
    }
  },

  getFeaturedRecruitments: async (businessId: string) => {
    try {
      const response = await axiosInstance.get(`/recruitment/${businessId}/featured`);
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const message = translateApiMessage(messageKey);
        throw new Error(message);
      }

      return Array.isArray(result?.data) ? result.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch featured jobs";
      throw new Error(message);
    }
  },

  getRecruitmentById: async (businessId: string, id: string) => {
    try {
      const response = await axiosInstance.get(`/recruitment/${businessId}/${id}`);
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const message = translateApiMessage(messageKey);
        throw new Error(message);
      }

      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch job details";
      throw new Error(message);
    }
  },

  getReceivedApplications: async (businessId: string) => {
    try {
      const response = await axiosInstance.get(
        `/recruitment-application/business/${businessId}`
      );
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const message = translateApiMessage(messageKey);
        throw new Error(message);
      }

      return Array.isArray(result?.data) ? result.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch received applications";
      throw new Error(message);
    }
  },

  getMyApplications: async () => {
    try {
      const response = await axiosInstance.get("/recruitment-application/my-applications");
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const message = translateApiMessage(messageKey);
        throw new Error(message);
      }

      return Array.isArray(result?.data) ? result.data : [];
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch my applications";
      throw new Error(message);
    }
  },

  createRecruitment: async (businessId, payload) => {

    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(
        `/recruitment/${businessId}`,
        payload
      );
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const validation = Array.isArray(result?.data)
          ? result.data.join("\n")
          : null;
        const message = validation || translateApiMessage(messageKey);
        throw new Error(message);
      }

      set({ isLoading: false });
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const apiValidation = Array.isArray(axiosError.response?.data?.data)
        ? axiosError.response?.data?.data?.join("\n")
        : null;
      const message =
        apiValidation ||
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to create recruitment";
      const finalError = new Error(message);
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  applyForJob: async (recruitmentId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/recruitment-application", {
        recruitmentId,
      });
      const result = response.data;

      if (!result?.success) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        const validation = Array.isArray(result?.data)
          ? result.data.join("\n")
          : null;
        const message = validation || translateApiMessage(messageKey);
        throw new Error(message);
      }

      set({ isLoading: false });
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const apiValidation = Array.isArray(axiosError.response?.data?.data)
        ? axiosError.response?.data?.data?.join("\n")
        : null;
      const message =
        apiValidation ||
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to submit application";
      const finalError = new Error(message);
      set({ isLoading: false, error: finalError });
      throw finalError;
    }
  },

  clearError: () => set({ error: null }),
}));
