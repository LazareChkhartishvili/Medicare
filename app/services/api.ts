import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { logger } from "../utils/logger";

// iOS Simulator needs your computer's IP address instead of localhost
const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:4000"
    : "http://192.168.100.6:4000"; // Your computer's IP address

export interface User {
  id: string;
  email: string;
  name: string;
  role: "doctor" | "patient";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: "doctor" | "patient";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Public getter for baseURL
  getBaseURL(): string {
    return this.baseURL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `HTTP error! status: ${response.status}`;

      logger.api.error("Response", response.url, {
        status: response.status,
        message: errorMessage,
        data: errorData,
      });

      throw new Error(errorMessage);
    }
    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    logger.auth.login(credentials.email);

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await this.handleResponse<AuthResponse>(response);

    logger.auth.loginSuccess(data.data.user);

    // Store tokens only if they exist
    if (data.data.token) {
      await AsyncStorage.setItem("accessToken", data.data.token);
    }
    if (data.data.refreshToken) {
      await AsyncStorage.setItem("refreshToken", data.data.refreshToken);
    }
    if (data.data.user) {
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    logger.auth.register(userData.email, userData.role);

    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await this.handleResponse<AuthResponse>(response);

    logger.auth.registerSuccess(data.data.user);

    // Store tokens only if they exist
    if (data.data.token) {
      await AsyncStorage.setItem("accessToken", data.data.token);
    }
    if (data.data.refreshToken) {
      await AsyncStorage.setItem("refreshToken", data.data.refreshToken);
    }
    if (data.data.user) {
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await this.handleResponse<{ accessToken: string }>(response);

    // Update access token only if it exists
    if (data.accessToken) {
      await AsyncStorage.setItem("accessToken", data.accessToken);
    }

    return data;
  }

  async logout(): Promise<void> {
    logger.auth.logout();

    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        logger.error("Logout error:", error);
      }
    }

    // Clear all stored data
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem("accessToken");
    return !!token;
  }

  // Generic API call method
  async apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getAuthHeaders();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();
