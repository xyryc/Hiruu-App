import { translateApiMessage } from '@/utils/apiMessages';
import axiosInstance from '@/utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    USER: 'auth_user',
    ACCESS_TOKEN: 'auth_access_token',
    REFRESH_TOKEN: 'auth_refresh_token',
};

export interface RegisterData {
    email?: string;
    password?: string;
    countryCode?: string;
    phoneNumber?: string;
    role: 'user' | 'provider';
    firstName?: string;
    lastName?: string;
}

export interface LoginData {
    email?: string;
    password?: string;
    countryCode?: string;
    phoneNumber?: string;
}

export interface OAuthData {
    provider: 'google' | 'apple';
    oauthId: string;
}

export interface VerifyAccountData {
    email?: string;
    phoneNumber?: string;
    countryCode?: string;
    code: string;
}

export interface ForgotPasswordData {
    email?: string;
    phoneNumber?: string;
}

export interface ResetPasswordData {
    email?: string;
    phoneNumber?: string;
    otp: string;
    password: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ResendOTPData {
    email: string;
}

export interface AddContactData {
    phoneNumber: string;
    countryCode: string;
    otp?: string;
}

// Updated to match your actual API response format
export interface AuthResponse {
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
    debug?: {
        otp?: string;
    };
    tokens?: {
        access: {
            token: string;
            expiresAt: string;
        };
        refresh: {
            token: string;
            expiresAt: string;
        };
    };
}

export interface SimpleResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: any;
}

export interface RefreshTokenResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        id: string;
        role: string;
    } | null;
    tokens?: {
        access: {
            token: string;
            expiresAt: string;
        };
        refresh: {
            token: string;
            expiresAt: string;
        };
    };
}

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await axiosInstance.post('/auth/register', data);
            const result = response.data;

            // Check if registration was successful
            if (!result.success) {
                throw new Error(result.message || 'Registration failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Login user with email and password
     */
    async login(data: LoginData): Promise<AuthResponse> {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            const result = response.data;

            // Check if login was successful
            if (!result.success) {
                throw new Error(result.message || 'Login failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * OAuth login (Google/Apple)
     */
    async oauthLogin(data: OAuthData): Promise<AuthResponse> {
        try {
            const response = await axiosInstance.post('/auth/login/oauth', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'OAuth login failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Verify account with OTP
     */
    async verifyAccount(data: VerifyAccountData): Promise<AuthResponse> {
        try {
            const response = await axiosInstance.post('/auth/verify-account', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Account verification failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Refresh access token
     */
    async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
        try {
            const response = await axiosInstance.post('/auth/refresh-tokens', {
                refreshToken,
            });
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Token refresh failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Request password reset
     */
    async forgotPassword(data: ForgotPasswordData): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/forgot-password', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Password reset request failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Reset password with OTP
     */
    async resetPassword(data: ResetPasswordData): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/reset-password', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Password reset failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Change password (authenticated user)
     */
    async changePassword(data: ChangePasswordData): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/change-password', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Password change failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Request account verification (for logged-in users)
     */
    async requestVerifyAccount(): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/req-verify-account');
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Verification request failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Resend OTP
     */
    async resendOTP(data: ResendOTPData): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/resend-otp', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'OTP resend failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Add/verify contact number (OTP flow)
     */
    async addContact(data: AddContactData): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/add-contact', data);
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Add contact failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Logout user
     */
    async logout(refreshToken: string): Promise<SimpleResponse> {
        try {
            const response = await axiosInstance.post('/auth/logout', {
                refreshToken,
            });
            const result = response.data;

            if (!result.success) {
                throw new Error(result.message || 'Logout failed');
            }

            return result;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Store authentication data in AsyncStorage
     */
    async storeAuthData(authResponse: AuthResponse): Promise<void> {
        try {
            const promises = [];

            // Store user data if available
            if (authResponse.data) {
                promises.push(AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authResponse.data)));
            }

            // Store tokens if available
            if (authResponse.tokens) {
                promises.push(
                    AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authResponse.tokens.access.token),
                    AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authResponse.tokens.refresh.token)
                );
            }

            await Promise.all(promises);
        } catch (error) {
            console.error('Failed to store auth data:', error);
            throw error;
        }
    }

    /**
     * Clear authentication data from AsyncStorage
     */
    async clearAuthData(): Promise<void> {
        try {
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.USER,
                STORAGE_KEYS.ACCESS_TOKEN,
                STORAGE_KEYS.REFRESH_TOKEN,
            ]);
        } catch (error) {
            console.error('Failed to clear auth data:', error);
            throw error;
        }
    }

    /**
     * Get stored authentication data
     */
    async getStoredAuthData(): Promise<{
        user: any | null;
        accessToken: string | null;
        refreshToken: string | null;
    }> {
        try {
            const [userStr, accessToken, refreshToken] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.USER),
                AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
                AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
            ]);

            return {
                user: userStr ? JSON.parse(userStr) : null,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.error('Failed to get stored auth data:', error);
            return {
                user: null,
                accessToken: null,
                refreshToken: null,
            };
        }
    }

    /**
     * Handle API errors
     */
    private handleError(error: any): Error {
        if (error.response?.data) {
            const errorData = error.response.data;
            // Use the message from your API response format
            if (typeof errorData.message === 'string' && errorData.message.trim().length > 0) {
                return new Error(translateApiMessage(errorData.message));
            }

            if (Array.isArray(errorData.data) && errorData.data.length > 0) {
                return new Error(String(errorData.data[0]));
            }

            return new Error('An error occurred');
        }
        return new Error(error.message || 'Network error occurred');
    }
}

export const authService = new AuthService();
