import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
};

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Don't add auth token for auth endpoints
      const isAuthEndpoint = config.url?.includes('/auth/');

      if (!isAuthEndpoint) {
        const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      // Don't override Content-Type if it's FormData (for file uploads)
      if (config.data instanceof FormData && config.headers) {
        delete config.headers['Content-Type'];
      }

      // utils/axios.ts inside request interceptor before return config
      console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
      console.log("Request:", config.url);
      console.log("Has token:", !!(await AsyncStorage.getItem("auth_access_token")));


      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly if it exists
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          const response = await axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL }).post('/auth/refresh-tokens', {
            refreshToken
          });

          const result = response.data;

          // Check if refresh was successful
          if (result.success && result.tokens) {
            const newAccessToken = result.tokens.access.token;
            const newRefreshToken = result.tokens.refresh.token;

            // Update stored tokens
            await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
            await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            return axiosInstance(originalRequest);
          } else {
            throw new Error(result.message || 'Token refresh failed');
          }
        }
      } catch (refreshError) {
        // Token refresh failed - clear storage and redirect to login
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.ACCESS_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
        ]);

        // You can emit an event here or use a navigation service to redirect to login
        return Promise.reject(refreshError);
      }
    }

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
