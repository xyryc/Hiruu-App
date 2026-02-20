import { socketService } from "@/services/socketService";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useSocketLifecycle = (enabled: boolean) => {
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    if (!enabled) {
      socketService.disconnect();
      return;
    }

    const connectIfNeeded = () => {
      if (AppState.currentState === "active") {
        socketService.connect().catch((error) => {
          console.error("Failed to connect to socket:", error);
        });
        socketService.connectCalls().catch((error) => {
          console.error("Failed to connect to calls socket:", error);
        });
      }
    };

    connectIfNeeded();

    const subscription = AppState.addEventListener("change", (nextState) => {
      const prevState = appStateRef.current;
      appStateRef.current = nextState;

      if (prevState !== "active" && nextState === "active") {
        socketService.connect().catch((error) => {
          console.error("Failed to connect to socket:", error);
        });
        socketService.connectCalls().catch((error) => {
          console.error("Failed to connect to calls socket:", error);
        });
        return;
      }

      if (prevState === "active" && nextState.match(/inactive|background/)) {
        socketService.disconnect();
      }
    });

    return () => {
      subscription.remove();
      socketService.disconnect();
    };
  }, [enabled]);
};

