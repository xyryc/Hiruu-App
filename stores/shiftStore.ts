import axiosInstance from "@/utils/axios";
import { create } from "zustand";

type ShiftStoreState = {
  myShifts: any[];
  myShiftsLoading: boolean;
  myShiftsError: string | null;
  fetchMyShifts: (date?: string) => Promise<any[]>;
  clearMyShiftsError: () => void;
};

export const useShiftStore = create<ShiftStoreState>((set) => ({
  myShifts: [],
  myShiftsLoading: false,
  myShiftsError: null,

  fetchMyShifts: async (date) => {
    try {
      set({ myShiftsLoading: true, myShiftsError: null });
      const response = await axiosInstance.get("/shift-assignment/my-shifts", {
        params: date ? { date } : undefined,
      });
      const result = response?.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load shifts");
      }

      const shifts = Array.isArray(result?.data) ? result.data : [];
      set({ myShifts: shifts, myShiftsLoading: false });
      return shifts;
    } catch (error: any) {
      const message = error?.message || "Failed to load shifts";
      set({
        myShifts: [],
        myShiftsLoading: false,
        myShiftsError: message,
      });
      throw error;
    }
  },

  clearMyShiftsError: () => set({ myShiftsError: null }),
}));
