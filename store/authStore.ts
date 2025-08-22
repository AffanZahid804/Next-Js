import { create } from 'zustand';
import { authServices } from '@/services/authServices';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

// Helper function to set HTTP-only cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Helper function to remove cookie
const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  
  login: async (email: string, password: string) => {
    try {
      const response = await authServices.login(email, password);
      const userInfo = await authServices.getUserInfo(response.token);
      
      // Store token in HTTP-only cookie
      setCookie('authToken', response.token, 7);
      
      set({
        isAuthenticated: true,
        user: { id: userInfo.id, name: userInfo.name },
        token: response.token,
      });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
    removeCookie('authToken');
  },
  
  checkAuthStatus: async () => {
    const token = getCookie('authToken');
    if (token) {
      try {
        // Verify token by fetching user info
        const userInfo = await authServices.getUserInfo(token);
        
        set({
          isAuthenticated: true,
          user: { id: userInfo.id, name: userInfo.name },
          token: token,
        });
      } catch (error) {
        // Token is invalid or expired, clear it
        console.error('Token validation failed:', error);
        removeCookie('authToken');
        set({ isAuthenticated: false, user: null, token: null });
      }
    } else {
      set({ isAuthenticated: false, user: null, token: null });
    }
  },
}));