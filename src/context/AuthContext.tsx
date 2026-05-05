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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (name: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://10.23.124.23:8080/api/login", {
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
        
        setIsAuthenticated(true);
        setUser({
          name: userData.prjMgrNm,
          email: name, // storing the input name as email for compatibility
          role: role,
          managerName: role === "user" ? userData.prjMgrNm : null,
          managerId: userData.prjMgrId,
        });
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
