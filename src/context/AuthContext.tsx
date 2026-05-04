import { createContext, useContext, useState, type ReactNode } from "react";
import { userAccounts } from "../data/mockData";

export interface AuthUser {
  name: string;
  email: string;
  role: "admin" | "user";
  managerName: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string): boolean => {
    // Check against registered accounts first
    const account = userAccounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (account) {
      setIsAuthenticated(true);
      setUser({
        name: account.name,
        email: account.email,
        role: account.role,
        managerName: account.managerName,
      });
      return true;
    }

    // Demo fallback: any email + 4+ char password → admin
    if (email && password.length >= 4) {
      setIsAuthenticated(true);
      setUser({
        name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: "admin",
        managerName: null,
      });
      return true;
    }

    return false;
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
