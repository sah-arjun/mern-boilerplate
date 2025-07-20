'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter, usePathname } from 'next/navigation';
import { isProtectedRoute } from '@/lib/isProtectedRoute';

type User = {
  user: {
    id: string;
    username: string;
    name: string;
  }
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchMe = async () => {
    try {
      const res = await axios.get('/auth/dashboard');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await axios.post('/auth/login', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    await fetchMe();
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    if (isProtectedRoute(pathname)) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
