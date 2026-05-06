import { createContext, useContext, useState, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  role: "admin" | "user";
  managerName: string | null;
  managerId: number | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (name: string, password: string) => Promise<boolean>;
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

  const login = async (name: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      if (data.status === "SUCCESS" && data.data && data.data.length > 0) {
        const userData = data.data[0];
        const role = userData.prjMgrNm === "admin" ? "admin" : "user";

        const newUser: AuthUser = {
          name: userData.prjMgrNm,
          email: name,
          role: role,
          managerName: role === "user" ? userData.prjMgrNm : null,
          managerId: userData.prjMgrId,
        };

        setIsAuthenticated(true);
        setUser(newUser);
        localStorage.setItem("auth_token", "true");
        localStorage.setItem("auth_user", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login API error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
