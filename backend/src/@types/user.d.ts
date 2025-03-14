declare namespace User {
  type UserType = "authenticatedUser" | "guest";
  type AuthProvider = "google.com" | "facebook.com" | "github.com";

  interface ProviderData {
    providerId: AuthProvider;
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }

  interface AuthResponse {
    data: User;
    refreshToken: string;
    accessTokent: string;
    expiresAt: number;
  }

  interface LoginType {
    email: string;
    password: string;
  }
  interface TokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number; // Timestamp in milliseconds
  }

  interface User {
    role: UserType;
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    refreshToken?: string;
  }

  interface AddUser<T> {
    isLoggedIn: boolean;
    isError: boolean;
    isSuccess: boolean;
    data: Partial<T>;
    error?: string;
    isLoading: boolean;
  }
}
