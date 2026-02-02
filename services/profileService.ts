import axiosInstance from '@/utils/axios';

export interface UpdateProfileData {
    name?: string;
    avatar?: {
        uri: string;
        type: string;
        name: string;
    };
    onboarding?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    countryCode?: string;
    bio?: string;
    fcmToken?: string;
}

export interface ProfileResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        avatar: string;
        isEmailVerified: boolean;
        fcmToken?: string;
        phoneNumber?: string;
        countryCode?: string;
        isRestricted: boolean;
        restrictionReason?: string;
        bio?: string;
        isOnline: boolean;
        lastSeen?: string;
        lastLoginAt: string;
        createdAt: string;
        updatedAt: string;
    } | null;
}

class ProfileService {
    /**
     * Update user profile
     */
    async updateProfile(data: UpdateProfileData): Promise<ProfileResponse> {
        try {
            const formData = new FormData();

            // Add all profile data fields
            Object.keys(data).forEach((key) => {
                const value = data[key as keyof UpdateProfileData];

                if (value === null || value === undefined) {
                    return; // Skip null/undefined
                }

                // Handle file objects (images)
                if (typeof value === 'object' && 'uri' in value && 'type' in value && 'name' in value) {
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

            const response = await axiosInstance.patch('/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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

    /**
     * Get user profile
     */
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

    /**
     * Handle API errors
     */
    private handleError(error: any): Error {
        if (error.response?.data) {
            const errorData = error.response.data;
            return new Error(errorData.message || 'An error occurred');
        }
        return new Error(error.message || 'Network error occurred');
    }
}

export const profileService = new ProfileService();
