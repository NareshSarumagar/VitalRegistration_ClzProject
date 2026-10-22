import { createContext, useContext, useEffect, useState } from 'react';
import type {ReactNode} from 'react';
import api from '../api/adminapi';
import type { User, LoginResponse, MeResponse } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get<MeResponse>('/admin/me');
          setUser(data.user);
        } catch {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const { data } = await api.post<LoginResponse>('/admin/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};