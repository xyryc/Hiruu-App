import { translateApiMessage } from "@/utils/apiMessages";
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

export type UserPlanItem = {
  id: string;
  description: string;
  monthlyPrice: string;
  yearlyDiscountPercentage: number;
  tier: string;
  currency: string;
  type: "user";
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  yearlyBasePrice?: number;
  yearlyDiscountedPrice?: number;
};

interface SubscriptionState {
  userPlans: UserPlanItem[];
  isLoadingUserPlans: boolean;
  error: Error | null;
  getUserPlans: () => Promise<UserPlanItem[]>;
  clearError: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  userPlans: [],
  isLoadingUserPlans: false,
  error: null,

  getUserPlans: async () => {
    set({ isLoadingUserPlans: true, error: null });
    try {
      const response = await axiosInstance.get("/plans/user");
      const result = response.data;

      if (!result?.success) {
        const message = translateApiMessage(result?.message) || "Failed to load user plans";
        throw new Error(message);
      }

      const plans = Array.isArray(result?.data) ? (result.data as UserPlanItem[]) : [];
      set({ userPlans: plans, isLoadingUserPlans: false });
      return plans;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      const message =
        translateApiMessage(axiosError.response?.data?.message) ||
        axiosError.message ||
        "Failed to load user plans";
      const finalError = new Error(message);
      set({ isLoadingUserPlans: false, error: finalError });
      throw finalError;
    }
  },

  clearError: () => set({ error: null }),
}));

