import axiosInstance from "@/utils/axios";

class WalletService {
  async getWallet(): Promise<any> {
    const response = await axiosInstance.get("/wallet");
    const result = response.data;

    if (!result?.success) {
      throw new Error(result?.message || "Failed to get wallet");
    }

    return result;
  }
}

export const walletService = new WalletService();

