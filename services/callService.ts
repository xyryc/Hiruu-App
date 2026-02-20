import axiosInstance from "@/utils/axios";

class CallService {
  async initiateAudioCall(chatRoomId: string): Promise<any> {
    const response = await axiosInstance.post(
      `/calls/rooms/${chatRoomId}/initiate`,
      {
        type: "audio",
      }
    );

    return response.data;
  }

  async joinCall(callId: string): Promise<any> {
    const response = await axiosInstance.post(`/calls/${callId}/join`);
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
}

export const callService = new CallService();
