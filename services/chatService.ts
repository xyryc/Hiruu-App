import axiosInstance from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ChatUploadMedia {
  uri: string;
  type: string;
  name: string;
}

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
    content?: string;
    replyToId?: string;
    mentions?: string[];
    media?: ChatUploadMedia[];
  }): Promise<any> {
    try {
      const hasMedia = Array.isArray(data.media) && data.media.length > 0;

      if (!hasMedia) {
        const response = await axiosInstance.post(`/chat/rooms/${roomId}/messages`, {
          content: data.content?.trim() || "",
          replyToId: data.replyToId,
          mentions: data.mentions,
        });
        const result = response.data;

        if (!result?.success) {
          throw new Error(result?.message || "Failed to send message");
        }

        return result;
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!baseUrl) {
        throw new Error("API URL not configured");
      }

      const formData = new FormData();

      if (data.content?.trim()) {
        formData.append("content", data.content.trim());
      }
      if (data.replyToId) {
        formData.append("replyToId", data.replyToId);
      }
      if (Array.isArray(data.mentions) && data.mentions.length > 0) {
        formData.append("mentions", JSON.stringify(data.mentions));
      }

      data.media?.forEach((file, index) => {
        const fallbackName = `upload-${Date.now()}-${index}`;
        formData.append("media", {
          uri: file.uri,
          type: file.type || "application/octet-stream",
          name: file.name || fallbackName,
        } as any);
      });

      const accessToken = await AsyncStorage.getItem("auth_access_token");
      const uploadResponse = await fetch(`${baseUrl}/chat/rooms/${roomId}/messages`, {
        method: "POST",
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        body: formData,
      });

      const responseText = await uploadResponse.text();
      let result: any = null;
      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = { success: false, message: responseText || "Failed to send message" };
      }

      if (!uploadResponse.ok || !result?.success) {
        throw new Error(result?.message || "Failed to send message");
      }

      return result;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
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
