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

  async getRoomMessages(roomId: string, page = 1, limit = 50): Promise<any> {
    try {
      const response = await axiosInstance.get(`/chat/rooms/${roomId}/messages`, {
        params: { page, limit }
      });
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load messages");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to load messages");
    }
  }

  async getChatRoom(roomId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`/chat/rooms/${roomId}`);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load chat room");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to load chat room");
    }
  }

  async sendMessage(roomId: string, data: {
    content: string;
    replyToId?: string;
    mentions?: string[];
  }): Promise<any> {
    try {
      const response = await axiosInstance.post(`/chat/rooms/${roomId}/messages`, data);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to send message");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to send message");
    }
  }

  async markAsRead(messageId: string): Promise<any> {
    try {
      const response = await axiosInstance.patch(`/chat/messages/${messageId}/read`);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to mark as read");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to mark as read");
    }
  }

  async markRoomAsRead(roomId: string): Promise<any> {
    try {
      const response = await axiosInstance.patch(`/chat/rooms/${roomId}/read`);
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to mark room as read");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to mark room as read");
    }
  }

  async createDirectChat(participantId: string): Promise<any> {
    try {
      const response = await axiosInstance.post("/chat/rooms", {
        type: "direct",
        participantIds: [participantId]
      });
      const result = response.data;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to create chat");
      }

      return result;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to create chat");
    }
  }
}

export const chatService = new ChatService();
