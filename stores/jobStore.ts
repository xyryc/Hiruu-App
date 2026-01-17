import { create } from "zustand";

export const useJobsStore = create((set, get) => ({
  isLoading: false,
  error: null,
  colleagueCode: null,

  scanQrCode: async (code: string, accessToken: string) => {
    set({ isLoading: true, error: null });

    try {
      if (!accessToken) {
        console.log("No Access Token");
        throw new Error(error);
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/colleagues-jobs/colleague-code/enter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ code }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const errorCode = result.error?.code || result.code || "UNKNOWN_ERROR";
        // const translatedMessage = translateApiMessage(errorCode);
        throw new Error(errorCode);
      }

      set({ collegueCode: code, isLoading: false });

      return result;
    } catch (error) {
      set({ isLoading: true, error: error });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
