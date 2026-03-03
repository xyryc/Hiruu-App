import { create } from "zustand";

const POLL_INTERVAL_MS = 5000;

let pollingTimer: ReturnType<typeof setInterval> | null = null;

const buildHealthUrl = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  return baseUrl || "";
};

const checkServerHealth = async () => {
  const url = buildHealthUrl();
  if (!url) return false;

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) return false;
    const result = await response.json();
    return Boolean(result?.success === true);
  } catch {
    return false;
  }
};

interface ServerStatusState {
  isServerDown: boolean;
  message: string;
  checkHealthNow: () => Promise<boolean>;
  startHealthPolling: () => void;
  stopHealthPolling: () => void;
  setServerDown: (message?: string) => void;
  clearServerDown: () => void;
}

export const useServerStatusStore = create<ServerStatusState>((set, get) => ({
  isServerDown: false,
  message: "Our server is currently unavailable. Please try again shortly.",
  checkHealthNow: async () => {
    const isHealthy = await checkServerHealth();
    if (isHealthy) {
      get().clearServerDown();
      return true;
    }
    return false;
  },
  startHealthPolling: () => {
    if (pollingTimer) return;

    void (async () => {
      const isHealthy = await checkServerHealth();
      if (isHealthy) {
        get().clearServerDown();
      }
    })();

    pollingTimer = setInterval(async () => {
      const isHealthy = await checkServerHealth();
      if (isHealthy) {
        get().clearServerDown();
      }
    }, POLL_INTERVAL_MS);
  },
  stopHealthPolling: () => {
    if (!pollingTimer) return;
    clearInterval(pollingTimer);
    pollingTimer = null;
  },
  setServerDown: (message) => {
    if (!get().isServerDown) {
      get().startHealthPolling();
    }
    set({
      isServerDown: true,
      message:
        message ||
        "Our server is currently unavailable. Please try again shortly.",
    });
  },
  clearServerDown: () => {
    get().stopHealthPolling();
    set({
      isServerDown: false,
      message: "Our server is currently unavailable. Please try again shortly.",
    });
  },
}));
