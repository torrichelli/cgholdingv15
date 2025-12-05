import { create } from 'zustand';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

export interface AuthUser {
  id: number;
  username: string;
  role: string;
  displayName: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsSetup: boolean;
  error: string | null;
  
  checkAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, displayName?: string) => Promise<boolean>;
  setupAdmin: (username: string, password: string, displayName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  registerPasskey: () => Promise<boolean>;
  loginWithPasskey: (username?: string) => Promise<boolean>;
  getPasskeys: () => Promise<any[]>;
  deletePasskey: (id: number) => Promise<boolean>;
  
  generateSSOToken: (redirectUrl?: string) => Promise<{ ssoUrl: string; token: string } | null>;
  
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  needsSetup: false,
  error: null,
  
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/status', { credentials: 'include' });
      const data = await response.json();
      
      set({
        isAuthenticated: data.authenticated,
        user: data.user || null,
        needsSetup: data.needsSetup,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, isAuthenticated: false, user: null });
    }
  },
  
  login: async (username: string, password: string) => {
    try {
      set({ error: null, isLoading: true });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        set({ error: data.error, isLoading: false });
        return false;
      }
      
      set({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
        needsSetup: false,
      });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  register: async (username: string, password: string, displayName?: string) => {
    try {
      set({ error: null, isLoading: true });
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, displayName }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        set({ error: data.error, isLoading: false });
        return false;
      }
      
      set({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
      });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  setupAdmin: async (username: string, password: string, displayName?: string) => {
    try {
      set({ error: null, isLoading: true });
      const response = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, displayName }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        set({ error: data.error, isLoading: false });
        return false;
      }
      
      set({
        isAuthenticated: true,
        user: data.user,
        isLoading: false,
        needsSetup: false,
      });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ isAuthenticated: false, user: null });
  },
  
  registerPasskey: async () => {
    try {
      set({ error: null });
      
      const optionsResponse = await fetch('/api/passkey/register-options', {
        credentials: 'include',
      });
      const options = await optionsResponse.json();
      
      if (!optionsResponse.ok) {
        set({ error: options.error });
        return false;
      }
      
      const credential = await startRegistration({ optionsJSON: options });
      
      const verifyResponse = await fetch('/api/passkey/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credential),
      });
      
      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        set({ error: verifyData.error });
        return false;
      }
      
      return true;
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        set({ error: 'Passkey registration was cancelled' });
      } else {
        set({ error: error.message });
      }
      return false;
    }
  },
  
  loginWithPasskey: async (username?: string) => {
    try {
      set({ error: null, isLoading: true });
      
      const optionsResponse = await fetch('/api/passkey/login-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username }),
      });
      const options = await optionsResponse.json();
      
      if (!optionsResponse.ok) {
        set({ error: options.error, isLoading: false });
        return false;
      }
      
      const credential = await startAuthentication({ optionsJSON: options });
      
      const verifyResponse = await fetch('/api/passkey/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ response: credential, username }),
      });
      
      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        set({ error: verifyData.error, isLoading: false });
        return false;
      }
      
      set({
        isAuthenticated: true,
        user: verifyData.user,
        isLoading: false,
      });
      return true;
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        set({ error: 'Passkey login was cancelled', isLoading: false });
      } else {
        set({ error: error.message, isLoading: false });
      }
      return false;
    }
  },
  
  getPasskeys: async () => {
    try {
      const response = await fetch('/api/passkey/list', {
        credentials: 'include',
      });
      const data = await response.json();
      return response.ok ? data : [];
    } catch {
      return [];
    }
  },
  
  deletePasskey: async (id: number) => {
    try {
      const response = await fetch(`/api/passkey/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  },
  
  generateSSOToken: async (redirectUrl?: string) => {
    try {
      const response = await fetch('/api/sso/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ redirectUrl: redirectUrl || '/admin' }),
      });
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return {
        ssoUrl: data.ssoUrl,
        token: data.token,
      };
    } catch {
      return null;
    }
  },
  
  clearError: () => set({ error: null }),
}));
