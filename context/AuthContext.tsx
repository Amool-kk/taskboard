"use client";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";

type User = {
  email: string;
  name?: string;
};

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>; // ⬅ expose checkAuth
}>({
  user: null,
  loading: true,
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
