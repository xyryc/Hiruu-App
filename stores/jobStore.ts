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
  createRecruitment: (
    businessId: string,
    payload: CreateRecruitmentPayload
  ) => Promise<any>;
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

  clearError: () => set({ error: null }),
}));
