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
}

export const chatService = new ChatService();
