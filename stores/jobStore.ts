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
  isFeatured?: boolean;
};

type PublicRecruitmentQuery = {
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  search?: string;
};

type FeaturedRecruitmentQuery = {
  page?: number;
  limit?: number;
};

type RecruitmentListResponse = {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

interface JobState {
  isLoading: boolean;
  error: Error | null;
  getPublicRecruitments: (
    query?: PublicRecruitmentQuery
  ) => Promise<RecruitmentListResponse>;
  getRecruitmentById: (businessId: string, id: string) => Promise<any>;
  getFeaturedRecruitments: (
    businessId: string,
    query?: FeaturedRecruitmentQuery
  ) => Promise<RecruitmentListResponse>;
  createRecruitment: (
    businessId: string,
    payload: CreateRecruitmentPayload
  ) => Promise<any>;
  clearError: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  isLoading: false,
  error: null,

  getPublicRecruitments: async (query = {}) => {
    try {
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
      const isFeatured = query.isFeatured ?? true;
      const search = query.search?.trim() || undefined;

      const response = await axiosInstance.get("/recruitment/public", {
        params: {
          page,
          limit,
          isFeatured,
          ...(search ? { search } : {}),
        },
      });
      const result = response.data;

      const hasError =
        result?.success === false ||
        (typeof result?.statusCode === "number" && result.statusCode >= 400);
      if (hasError) {
        throw new Error(translateApiMessage(result?.message || "UNKNOWN_ERROR"));
      }

      return {
        data: Array.isArray(result?.data) ? result.data : [],
        pagination: {
          page: Number(result?.pagination?.page || page),
          limit: Number(result?.pagination?.limit || limit),
          total: Number(result?.pagination?.total || 0),
          totalPages: Number(result?.pagination?.totalPages || 1),
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch jobs";
      throw new Error(message);
    }
  },

  getRecruitmentById: async (businessId, id) => {
    try {
      const response = await axiosInstance.get(`/recruitment/${businessId}/${id}`);
      const result = response.data;

      const hasError =
        result?.success === false ||
        (typeof result?.statusCode === "number" && result.statusCode >= 400);
      if (hasError) {
        throw new Error(translateApiMessage(result?.message || "UNKNOWN_ERROR"));
      }

      return result?.data || null;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch recruitment details";
      throw new Error(message);
    }
  },

  getFeaturedRecruitments: async (businessId, query = {}) => {
    try {
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;

      const response = await axiosInstance.get(
        `/recruitment/${businessId}/featured`,
        {
          params: { page, limit },
        }
      );
      const result = response.data;

      if (!result?.statusCode || result.statusCode >= 400) {
        const messageKey = result?.message || "UNKNOWN_ERROR";
        throw new Error(translateApiMessage(messageKey));
      }

      return {
        data: Array.isArray(result?.data) ? result.data : [],
        pagination: {
          page: Number(result?.pagination?.page || page),
          limit: Number(result?.pagination?.limit || limit),
          total: Number(result?.pagination?.total || 0),
          totalPages: Number(result?.pagination?.totalPages || 1),
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to fetch featured jobs";
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
