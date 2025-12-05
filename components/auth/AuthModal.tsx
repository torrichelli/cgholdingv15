import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, KeyRound, Fingerprint, Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthMode = 'login' | 'register' | 'setup';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    isAuthenticated,
    needsSetup,
    isLoading,
    error,
    login,
    register,
    setupAdmin,
    loginWithPasskey,
    clearError,
    checkAuth,
  } = useAuthStore();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasskeyOption, setShowPasskeyOption] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (needsSetup) {
      setMode('setup');
    }
  }, [needsSetup]);
  
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1000);
    }
  }, [isAuthenticated]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (mode === 'register' || mode === 'setup') {
      if (password !== confirmPassword) {
        return;
      }
      if (password.length < 8) {
        return;
      }
    }
    
    if (mode === 'setup') {
      await setupAdmin(username, password, displayName || username);
    } else if (mode === 'register') {
      await register(username, password, displayName || username);
    } else {
      await login(username, password);
    }
  };
  
  const handlePasskeyLogin = async () => {
    clearError();
    await loginWithPasskey(username || undefined);
  };
  
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setDisplayName('');
    setConfirmPassword('');
    clearError();
    setSuccess(false);
  };
  
  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                {mode === 'setup' ? (
                  <Shield size={20} className="text-white" />
                ) : (
                  <KeyRound size={20} className="text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {mode === 'setup' ? 'Create Admin Account' : mode === 'register' ? 'Create Account' : 'Sign In'}
                </h2>
                <p className="text-sm text-gray-500">
                  {mode === 'setup' 
                    ? 'Set up your first administrator account'
                    : mode === 'register'
                    ? 'Join CreativeCMS'
                    : 'Welcome back to CreativeCMS'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="p-6">
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
                <p className="text-gray-500">Redirecting to CMS...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
                
                {(mode === 'register' || mode === 'setup') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'login' ? 'Enter password' : 'Min 8 characters'}
                      required
                      minLength={mode === 'login' ? 1 : 8}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                    />
                  </div>
                </div>
                
                {(mode === 'register' || mode === 'setup') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading || (mode !== 'login' && password !== confirmPassword)}
                  className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Please wait...
                    </>
                  ) : mode === 'setup' ? (
                    <>
                      <Shield size={18} />
                      Create Admin Account
                    </>
                  ) : mode === 'register' ? (
                    'Create Account'
                  ) : (
                    'Sign In'
                  )}
                </button>
                
                {mode === 'login' && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handlePasskeyLogin}
                      disabled={isLoading}
                      className="w-full py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Fingerprint size={18} />
                      Sign in with Passkey
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
          
          {!success && mode !== 'setup' && (
            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-gray-500">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => switchMode('register')}
                      className="text-black font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => switchMode('login')}
                      className="text-black font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
