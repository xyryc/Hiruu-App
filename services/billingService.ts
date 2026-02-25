import axiosInstance from "@/utils/axios";

export type BillingCycle = "monthly" | "yearly";

export type CreateSubscriptionIntentPayload = {
    planId: string;
    billingCycle: BillingCycle;
};

export type CreateSubscriptionIntentResponse = {
    mode: "setup";
    setupIntentClientSecret: string;
    customerId: string;
};

export type ConfirmSubscriptionPayload = {
    planId: string;
    billingCycle: BillingCycle;
    setupIntentId: string;
};

class BillingService {
    async createSubscriptionIntent(payload: CreateSubscriptionIntentPayload) {
        const response = await axiosInstance.post("/subscriptions/intent", payload);
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to create subscription intent");
        }

        return result.data as CreateSubscriptionIntentResponse;
    }

    async confirmSubscription(payload: ConfirmSubscriptionPayload) {
        const response = await axiosInstance.post("/subscriptions/confirm", payload);
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to confirm subscription");
        }

        return result.data;
    }

    async getMyActiveSubscription() {
        const response = await axiosInstance.get("/subscriptions/my/active");
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to fetch active subscription");
        }

        return result.data;
    }
}

export const billingService = new BillingService();
