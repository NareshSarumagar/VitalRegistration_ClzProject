import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type {ReactNode} from "react"
import axios from "axios";
import type {
  AuthContextType,
  AuthResponse,
  RegisterPayload,
  User,
} from "../types/index";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

axios.defaults.withCredentials = true;
const API = import.meta.env.VITE_API_URL as string;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async (): Promise<void> => {
    try {
      const { data } = await axios.get<{ user: User }>(`${API}/auth/me`);
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

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${API}/auth/login`, {
      email,
      password,
    });
    setUser(data.user);
    return data;
  };

  const register = async (
    payload: RegisterPayload
  ): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
      `${API}/auth/register`,
      payload
    );
    setUser(data.user);
    return data;
  };

  const logout = async (): Promise<void> => {
    await axios.post(`${API}/auth/logout`);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};