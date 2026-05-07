import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "admin" | "user" | "manager" | string;

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  roles: string[];
  mobile: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  pendingUsername: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth_token") === "true";
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [pendingUsername, setPendingUsername] = useState<string | null>(null);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error(
          "Login API returned status:",
          response.status,
          response.statusText,
        );
        return false;
      }

      const data = await response.json();
      console.log("Login API response data:", JSON.stringify(data));

      if (data.success === true) {
        setPendingUsername(username);
        return true;
      }
      console.log("Login API success is not true, got:", data.success);
      return false;
    } catch (error) {
      console.error("Login API error:", error);
      return false;
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (!pendingUsername) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, username: pendingUsername }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (data.success === true && data.data) {
        const userData = data.data;
        const role = userData.roles?.includes("ROLE_ADMIN") ? "admin" : "user";

        const decodeB64 = (str: string) => {
          try {
            return atob(str);
          } catch {
            return str;
          }
        };
        console.log("Decoded data:", data);
        const newUser: AuthUser = {
          id: userData.id,
          name: userData.username,
          email: userData.email ? decodeB64(userData.email) : "",
          role: role,
          roles: userData.roles || [],
          mobile: userData.mobile ? decodeB64(userData.mobile) : "",
        };

        setIsAuthenticated(true);
        setUser(newUser);
        setPendingUsername(null);
        localStorage.setItem("auth_token", "true");
        localStorage.setItem("auth_user", JSON.stringify(newUser));
        localStorage.setItem("access_token", data.data.accessToken);
        localStorage.setItem("refresh_token", data.data.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("OTP verification error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPendingUsername(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        pendingUsername,
        login,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}
