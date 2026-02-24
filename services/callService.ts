import axiosInstance from "@/utils/axios";

class CallService {
  async initiateCall(chatRoomId: string, type: "audio" | "video" = "audio"): Promise<any> {
    const response = await axiosInstance.post(
      `/calls/rooms/${chatRoomId}/initiate`,
      {
        type,
      }
    );

    return response.data;
  }

  async initiateAudioCall(chatRoomId: string): Promise<any> {
    return this.initiateCall(chatRoomId, "audio");
  }

  async initiateVideoCall(chatRoomId: string): Promise<any> {
    return this.initiateCall(chatRoomId, "video");
  }

  async joinCall(
    callId: string,
    payload?: { isMicMuted?: boolean; isCameraOff?: boolean }
  ): Promise<any> {
    const response = await axiosInstance.post(`/calls/${callId}/join`, payload ?? {});
    return response.data;
  }

  async endCall(callId: string): Promise<any> {
    const response = await axiosInstance.post(`/calls/${callId}/end`);
    return response.data;
  }

  async getActiveCall(chatRoomId: string): Promise<any> {
    const response = await axiosInstance.get(`/calls/rooms/${chatRoomId}/active`);
    return response.data;
  }

  async getCallById(callId: string): Promise<any> {
    const response = await axiosInstance.get(`/calls/${callId}`);
    return response.data;
  }

  async createMediaSession(callId: string): Promise<any> {
    const response = await axiosInstance.post(`/calls/${callId}/media/session`);
    return response.data;
  }

  async updateCallStatus(callId: string, status: string, declineReason?: string): Promise<any> {
    const response = await axiosInstance.patch(`/calls/${callId}/status`, {
      status,
      ...(declineReason ? { declineReason } : {}),
    });
    return response.data;
  }

  async updateMediaState(
    callId: string,
    payload: { isMicMuted?: boolean; isCameraOff?: boolean; isSharingScreen?: boolean }
  ): Promise<any> {
    const response = await axiosInstance.patch(`/calls/${callId}/media`, payload);
    return response.data;
  }
}

export const callService = new CallService();
