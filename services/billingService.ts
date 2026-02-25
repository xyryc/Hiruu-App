import axiosInstance from "@/utils/axios";

export type CreateSubscriptionSheetPayload = {
    planId: string;
    interval: "month" | "year";
};

export type CreateSubscriptionSheetResponse = {
    customerId: string;
    ephemeralKey: string;
    paymentIntentClientSecret: string;
};

class BillingService {
    async createSubscriptionSheet(payload: CreateSubscriptionSheetPayload) {
        const response = await axiosInstance.post("/billing/subscription/sheet", payload);
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to create subscription sheet");
        }

        return result.data as CreateSubscriptionSheetResponse;
    }

    async getMySubscription() {
        const response = await axiosInstance.get("/billing/subscription/me");
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to fetch subscription");
        }

        return result.data;
    }
}

export const billingService = new BillingService();
