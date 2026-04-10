import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserData {
  name: string;
  email: string;
  courseId: string;
  courseName: string;
  interests: string[];
}

interface AuthContextType {
  user: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
  updateInterests: (interests: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    const stored = localStorage.getItem("campus_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("campus_user", JSON.stringify(user));
    else localStorage.removeItem("campus_user");
  }, [user]);

  const login = (u: UserData) => setUser(u);
  const logout = () => setUser(null);
  const updateInterests = (interests: string[]) => {
    if (user) setUser({ ...user, interests });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateInterests }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
