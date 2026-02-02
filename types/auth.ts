// Authentication related types
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'provider';
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
}

export interface AuthTokens {
    access: {
        token: string;
        expiresAt: string;
    };
    refresh: {
        token: string;
        expiresAt: string;
    };
}

export interface AuthResponse {
    status: number;
    message: string;
    response: {
        data: User;
        tokens: AuthTokens;
    };
}

export interface ApiError {
    code: number;
    message: string;
    stack?: string;
}

export interface ApiResponse<T = any> {
    status: number;
    message: string;
    response?: {
        data: T;
    };
    error?: ApiError;
}

// Form data types
export interface RegisterFormData {
    email: string;
    password: string;
    role: 'user' | 'provider';
    firstName?: string;
    lastName?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface VerifyAccountFormData {
    email: string;
    code: string;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface ResetPasswordFormData {
    email: string;
    otp: string;
    password: string;
}

export interface ChangePasswordFormData {
    oldPassword: string;
    newPassword: string;
}

export interface OAuthFormData {
    provider: 'google' | 'apple';
    oauthId: string;
}

export interface ResendOTPFormData {
    email: string;
}
