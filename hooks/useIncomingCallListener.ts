import { callService } from "@/services/callService";
import { chatService } from "@/services/chatService";
import { socketService } from "@/services/socketService";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export const useIncomingCallListener = (enabled: boolean) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const lastHandledCallIdRef = useRef<string | null>(null);
  const resolvingCallIdRef = useRef<string | null>(null);
  const pollingActiveCallsRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    let incomingHandler: ((payload: any) => void) | null = null;
    let participantsHandler: ((payload: any) => void) | null = null;
    let pollingInterval: ReturnType<typeof setInterval> | null = null;

    const openIncomingCall = (callId: string, roomId = "") => {
      console.log("[CALL_DEBUG] openIncomingCall:attempt", {
        callId,
        roomId,
        lastHandled: lastHandledCallIdRef.current,
      });
      if (!callId) return;
      if (lastHandledCallIdRef.current === callId) return;

      lastHandledCallIdRef.current = callId;
      console.log("[CALL_DEBUG] openIncomingCall:navigate", { callId, roomId });
      router.push({
        pathname: "/screens/jobs/audio-call",
        params: {
          callId,
          roomId,
          mode: "incoming",
        },
      });
    };

    const resolveAndOpenIfReceiver = async (callId: string, roomId = "") => {
      if (!callId || !user?.id) return;
      if (resolvingCallIdRef.current === callId) return;
      if (lastHandledCallIdRef.current === callId) return;

      resolvingCallIdRef.current = callId;
      try {
        const response = await callService.getCallById(callId);
        const call = response?.data || {};
        const initiatedBy = normalizeId(call?.initiatedBy);
        const currentUserId = normalizeId(user.id);
        const status = String(call?.status || "").toLowerCase();

        console.log("[CALL_DEBUG] resolve-call", {
          callId,
          initiatedBy: call?.initiatedBy,
          currentUserId: user.id,
          status,
        });

        // Open only for receiver side.
        if (initiatedBy && initiatedBy !== currentUserId) {
          if (!status || ["initiated", "ringing", "joined"].includes(status)) {
            openIncomingCall(callId, roomId || call?.chatRoomId || "");
          }
        }
      } catch (error) {
        console.log("[CALL_DEBUG] resolve-call:error", { callId, error });
      } finally {
        if (resolvingCallIdRef.current === callId) {
          resolvingCallIdRef.current = null;
        }
      }
    };

    const setup = async () => {
      try {
        console.log("[CALL_DEBUG] incoming-listener:setup:start", {
          enabled,
          userId: user?.id,
        });
        await socketService.connectCalls();
        console.log("[CALL_DEBUG] incoming-listener:setup:connected");

        incomingHandler = (payload: any) => {
          console.log("[CALL_DEBUG] incoming_call:event", payload);
          const call = payload?.call || payload?.data || payload;
          const callId = call?.callId || call?.id;
          const roomId = call?.chatRoomId || call?.roomId || "";

          void resolveAndOpenIfReceiver(callId, roomId);
        };

        // Fallback: if backend skips incoming_call and only publishes call participants.
        participantsHandler = (payload: any) => {
          console.log("[CALL_DEBUG] call_participants:event", payload);
          const callId = payload?.callId;
          const participants = Array.isArray(payload?.participants)
            ? payload.participants
            : [];
          if (!callId || !participants.length || !user?.id) return;

          const currentUserId = normalizeId(user.id);
          const participantIds = participants.map((p: any) =>
            normalizeId(p?.userId)
          );
          const me = participants.find(
            (p: any) => normalizeId(p?.userId) === currentUserId
          );
          console.log("[CALL_DEBUG] call_participants:match", {
            userId: user.id,
            participantIds,
            hasMe: Boolean(me),
          });
          void resolveAndOpenIfReceiver(callId);
        };

        socketService.onIncomingCall(incomingHandler);
        socketService.onCallParticipants(participantsHandler);
        console.log("[CALL_DEBUG] incoming-listener:handlers:attached");
      } catch {
        console.log("[CALL_DEBUG] incoming-listener:setup:error");
        // calls socket not available now, keep app usable
      }
    };

    const pollActiveCallsFallback = async () => {
      if (!enabled || !user?.id || pollingActiveCallsRef.current) return;
      pollingActiveCallsRef.current = true;
      try {
        const roomsResponse = await chatService.getChatRooms();
        const rooms = Array.isArray(roomsResponse?.data)
          ? roomsResponse.data
          : [];
        for (const room of rooms) {
          const roomId = room?.id;
          if (!roomId) continue;
          try {
            const active = await callService.getActiveCall(roomId);
            const call = active?.data;
            const callId = call?.id;
            if (!callId) continue;
            await resolveAndOpenIfReceiver(callId, roomId);
          } catch {
            // no active call for this room or unauthorized for room
          }
        }
      } catch (error) {
        console.log("[CALL_DEBUG] active-call:poll:error", error);
      } finally {
        pollingActiveCallsRef.current = false;
      }
    };

    setup();
    pollingInterval = setInterval(() => {
      void pollActiveCallsFallback();
    }, 3500);

    return () => {
      console.log("[CALL_DEBUG] incoming-listener:cleanup");
      if (pollingInterval) clearInterval(pollingInterval);
      if (incomingHandler) socketService.offIncomingCall(incomingHandler);
      if (participantsHandler) socketService.offCallParticipants(participantsHandler);
    };
  }, [enabled, router, user?.id]);
};
    const normalizeId = (value: unknown) =>
      String(value ?? "")
        .trim()
        .toLowerCase();
