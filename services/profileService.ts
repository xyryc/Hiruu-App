import { ProfileResponse, UpdateProfileData } from '@/types';
import axiosInstance from '@/utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileService {
    private toIsoString(value: any): string | undefined {
        if (!value) return undefined;
        if (value instanceof Date) {
            return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
        }
        if (typeof value === "string") {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
        }
        return undefined;
    }

    private normalizeExperiencePayload(experience: any) {
        return {
            companyId: experience?.companyId,
            position: experience?.position || undefined,
            description: experience?.description || undefined,
            startDate: this.toIsoString(experience?.startDate),
            endDate: this.toIsoString(experience?.endDate),
            isCurrent: Boolean(experience?.isCurrent),
        };
    }

    private isExperienceChanged(existing: any, next: any): boolean {
        const existingStart = this.toIsoString(existing?.startDate);
        const existingEnd = this.toIsoString(existing?.endDate);
        return (
            (existing?.position || "") !== (next?.position || "") ||
            (existing?.description || "") !== (next?.description || "") ||
            (existingStart || "") !== (next?.startDate || "") ||
            (existingEnd || "") !== (next?.endDate || "") ||
            Boolean(existing?.isCurrent) !== Boolean(next?.isCurrent)
        );
    }

    async syncExperiences(experiences: any[], existingExperiences: any[] = []): Promise<void> {
        try {
            if (!Array.isArray(experiences) || experiences.length === 0) return;

            const existingByCompanyId = new Map<string, any>();
            existingExperiences.forEach((item) => {
                if (item?.companyId) {
                    existingByCompanyId.set(item.companyId, item);
                }
            });

            for (const raw of experiences) {
                const payload = this.normalizeExperiencePayload(raw);
                if (!payload.companyId) continue;
                if (!payload.startDate) continue;

                const existing = existingByCompanyId.get(payload.companyId);
                if (existing?.id) {
                    if (!this.isExperienceChanged(existing, payload)) {
                        continue;
                    }
                    await axiosInstance.patch(`/experiences/${existing.id}`, payload);
                } else {
                    await axiosInstance.post("/experiences", payload);
                }
            }
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    // Update user profile
    async updateProfile(data: UpdateProfileData): Promise<ProfileResponse> {
        try {
            const formData = new FormData();
            let hasFile = false;

            // Add all profile data fields
            Object.keys(data).forEach((key) => {
                const value = data[key as keyof UpdateProfileData];

                if (value === null || value === undefined) {
                    return; // Skip null/undefined
                }

                // Handle file objects (images)
                if (typeof value === 'object' && 'uri' in value && 'type' in value && 'name' in value) {
                    hasFile = true;
                    formData.append(key, value as any);
                }
                // Handle objects
                else if (typeof value === 'object' && !(value instanceof Date)) {
                    formData.append(key, JSON.stringify(value));
                }
                // Handle dates
                else if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                }
                // Handle primitives
                else {
                    formData.append(key, value.toString());
                }
            });

            if (hasFile) {
                const baseUrl = process.env.EXPO_PUBLIC_API_URL;
                if (!baseUrl) {
                    throw new Error('API URL not configured');
                }

                const accessToken = await AsyncStorage.getItem('auth_access_token');
                const response = await fetch(`${baseUrl}/users/profile`, {
                    method: 'PATCH',
                    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
                    body: formData,
                });

                const result = await response.json();

                if (!response.ok || !result?.success) {
                    throw new Error(result?.message || 'Profile update failed');
                }

                return result;
            }

            const response = await axiosInstance.patch('/users/profile', data);
            const result = response.data;

            // Check if update was successful
            if (!result.success) {
                throw new Error(result.message || 'Profile update failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    // Get user profile
    async getProfile(): Promise<ProfileResponse> {
        try {
            const response = await axiosInstance.get('/users/profile');
            const result = response.data;

            // Check if request was successful
            if (!result.success) {
                throw new Error(result.message || 'Failed to get profile');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    // Handle API errors
    private handleError(error: any): Error {
        if (error.response?.data) {
            const errorData = error.response.data;
            if (Array.isArray(errorData.data) && errorData.data.length > 0) {
                const firstValidationError = errorData.data[0];
                if (typeof firstValidationError === "string") {
                    return new Error(firstValidationError);
                }
            }
            return new Error(errorData.message || 'An error occurred');
        }
        return new Error(error.message || 'Network error occurred');
    }
}

export const profileService = new ProfileService();
