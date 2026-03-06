import axiosInstance from "@/utils/axios";
import { create } from "zustand";

type ShiftStoreState = {
  myShifts: any[];
  myShiftsLoading: boolean;
  myShiftsError: string | null;
  homeShifts: any[];
  homeShiftsLoading: boolean;
  homeShiftsError: string | null;
  businessAssignments: any[];
  businessAssignmentsLoading: boolean;
  businessAssignmentsError: string | null;
  fetchMyShifts: (date?: string) => Promise<any[]>;
  fetchHomeShifts: (businessIds?: string[]) => Promise<any[]>;
  fetchBusinessAssignments: (businessId: string) => Promise<any[]>;
  clearMyShiftsError: () => void;
  clearHomeShiftsError: () => void;
  clearBusinessAssignmentsError: () => void;
};

export const useShiftStore = create<ShiftStoreState>((set) => ({
  myShifts: [],
  myShiftsLoading: false,
  myShiftsError: null,
  homeShifts: [],
  homeShiftsLoading: false,
  homeShiftsError: null,
  businessAssignments: [],
  businessAssignmentsLoading: false,
  businessAssignmentsError: null,

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

  fetchHomeShifts: async (businessIds = []) => {
    try {
      const uniqueIds = Array.from(
        new Set((Array.isArray(businessIds) ? businessIds : []).filter(Boolean))
      );

      set({ homeShiftsLoading: true, homeShiftsError: null });

      let merged: any[] = [];
      let firstErrorMessage: string | null = null;

      if (uniqueIds.length === 0) {
        const response = await axiosInstance.get("/shift-assignment/my-shifts/home");
        const payload = response?.data;
        const successOk = payload?.success === true;
        if (!successOk) {
          throw new Error(payload?.message || "Failed to load home shifts");
        }
        merged = Array.isArray(payload?.data?.data) ? payload.data.data : [];
      } else {
        const responses = await Promise.allSettled(
          uniqueIds.map((businessId) =>
            axiosInstance.get("/shift-assignment/my-shifts/home", {
              params: { businessId },
            })
          )
        );

        responses.forEach((item) => {
          if (item.status === "fulfilled") {
            const payload = item.value?.data;
            const successOk = payload?.success === true;
            if (!successOk) {
              if (!firstErrorMessage) {
                firstErrorMessage = payload?.message || "Failed to load home shifts";
              }
              return;
            }

            const data = Array.isArray(payload?.data?.data) ? payload.data.data : [];
            merged.push(...data);
            return;
          }

          if (!firstErrorMessage) {
            firstErrorMessage =
              (item.reason as any)?.message || "Failed to load home shifts";
          }
        });
      }

      set({
        homeShifts: merged,
        homeShiftsLoading: false,
        homeShiftsError: firstErrorMessage,
      });

      return merged;
    } catch (error: any) {
      const message = error?.message || "Failed to load home shifts";
      set({
        homeShifts: [],
        homeShiftsLoading: false,
        homeShiftsError: message,
      });
      throw error;
    }
  },

  clearHomeShiftsError: () => set({ homeShiftsError: null }),

  fetchBusinessAssignments: async (businessId) => {
    try {
      if (!businessId) {
        set({
          businessAssignments: [],
          businessAssignmentsLoading: false,
          businessAssignmentsError: null,
        });
        return [];
      }

      set({
        businessAssignmentsLoading: true,
        businessAssignmentsError: null,
      });

      const response = await axiosInstance.get(`/shift-assignment/${businessId}`);
      const result = response?.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load assignments");
      }

      const assignments = Array.isArray(result?.data) ? result.data : [];
      set({
        businessAssignments: assignments,
        businessAssignmentsLoading: false,
      });
      return assignments;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load assignments";
      set({
        businessAssignments: [],
        businessAssignmentsLoading: false,
        businessAssignmentsError: message,
      });
      throw error;
    }
  },

  clearBusinessAssignmentsError: () => set({ businessAssignmentsError: null }),
}));
