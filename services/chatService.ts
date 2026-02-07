import axiosInstance from "@/utils/axios";

class ChatService {
  async getChatRooms(): Promise<any> {
    try {
      const response = await axiosInstance.get("/chat/rooms");
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load chats");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to load chats");
    }
  }

  async getRoomMessages(roomId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`/chat/rooms/${roomId}/messages`);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load messages");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to load messages");
    }
  }
}

export const chatService = new ChatService();
