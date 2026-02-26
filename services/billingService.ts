import axiosInstance from "@/utils/axios";

export type BillingCycle = "monthly" | "yearly";

export type CreateSubscriptionIntentPayload = {
    planId: string;
    billingCycle: BillingCycle;
    businessId?: string;
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
    businessId?: string;
};

export type CancelSubscriptionResponse = {
    id: string;
    status: string;
    cancelAtPeriodEnd: boolean;
    autoRenew: boolean;
    endDate?: string;
    currentPeriodEnd?: string;
    billingCycle?: BillingCycle;
    provider?: string;
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

    async cancelSubscription(subscriptionId: string) {
        const response = await axiosInstance.post(`/subscriptions/${subscriptionId}/cancel`);
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to cancel subscription");
        }

        return result.data as CancelSubscriptionResponse;
    }
}

export const billingService = new BillingService();
