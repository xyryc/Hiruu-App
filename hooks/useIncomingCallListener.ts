import { socketService } from "@/services/socketService";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export const useIncomingCallListener = (enabled: boolean) => {
  const router = useRouter();
  const lastHandledCallIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let handler: ((payload: any) => void) | null = null;

    const setup = async () => {
      try {
        await socketService.connectCalls();

        handler = (payload: any) => {
          const call = payload?.call || payload?.data || payload;
          const callId = call?.callId || call?.id;
          const roomId = call?.chatRoomId || call?.roomId || "";

          if (!callId) return;
          if (lastHandledCallIdRef.current === callId) return;

          lastHandledCallIdRef.current = callId;
          router.push({
            pathname: "/screens/jobs/audio-call",
            params: {
              callId,
              roomId: roomId || "",
              mode: "incoming",
            },
          });
        };

        socketService.onIncomingCall(handler);
      } catch {
        // calls socket not available now, keep app usable
      }
    };

    setup();

    return () => {
      if (handler) {
        socketService.offIncomingCall(handler);
      }
    };
  }, [enabled, router]);
};
