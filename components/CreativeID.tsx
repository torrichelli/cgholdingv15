import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fingerprint, ArrowRight, User, Lock, Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface CreativeIDProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  ssoRedirect?: 'cms' | null;
}

type AuthMode = 'login' | 'register' | 'setup';

const CreativeID: React.FC<CreativeIDProps> = ({ isOpen, onClose, onSuccess, ssoRedirect }) => {
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
    generateSSOToken,
  } = useAuthStore();
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      checkAuth();
      clearError();
      setSuccess(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (needsSetup) {
      setMode('setup');
    }
  }, [needsSetup]);
  
  useEffect(() => {
    const handleSSORedirect = async () => {
      if (isAuthenticated && isOpen && !success && !isRedirecting) {
        if (ssoRedirect === 'cms') {
          setIsRedirecting(true);
          const ssoResult = await generateSSOToken('/admin');
          if (ssoResult) {
            setSuccess(true);
            setTimeout(() => {
              window.location.href = ssoResult.ssoUrl;
            }, 1000);
          } else {
            setIsRedirecting(false);
            setSuccess(true);
            setTimeout(() => {
              onSuccess?.();
              onClose();
            }, 1000);
          }
        } else {
          setSuccess(true);
          setTimeout(() => {
            onSuccess?.();
            onClose();
          }, 1000);
        }
      }
    };
    
    handleSSORedirect();
  }, [isAuthenticated, isOpen, ssoRedirect]);
  
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
  };
  
  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-[400px] rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                    {mode === 'setup' ? <Shield size={16} /> : 'C'}
                  </div>
                  <span className="font-semibold text-lg tracking-tight">
                    Creative<span className="font-normal text-gray-500">ID</span>
                  </span>
               </div>
               <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                 <X size={18} />
               </button>
            </div>

            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Успешно!</h3>
                <p className="text-gray-500">
                  {isRedirecting ? 'Перенаправление в CreativeCMS...' : 'Добро пожаловать!'}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {mode === 'setup' ? 'Create Admin Account' : mode === 'register' ? 'Create Account' : 'Sign in'}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {mode === 'setup' 
                      ? 'Set up your first administrator account' 
                      : 'Access Nexium, Market, and LogiFlex Dashboard.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm"
                    >
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  
                  {(mode === 'register' || mode === 'setup') && (
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display Name" 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username" 
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'login' ? 'Password' : 'Password (min 8 chars)'} 
                      required
                      minLength={mode === 'login' ? 1 : 8}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                  
                  {(mode === 'register' || mode === 'setup') && (
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password" 
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 ml-1">Passwords do not match</p>
                      )}
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={isLoading || (mode !== 'login' && password !== confirmPassword)}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                      <>Continue <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
                
                {mode === 'login' && (
                  <>
                    <div className="my-6 flex items-center gap-4 text-gray-300">
                       <div className="h-[1px] bg-gray-200 flex-1" />
                       <span className="text-xs font-bold text-gray-400">OR</span>
                       <div className="h-[1px] bg-gray-200 flex-1" />
                    </div>

                    <button 
                      onClick={handlePasskeyLogin}
                      disabled={isLoading}
                      className="w-full py-4 border border-gray-200 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                       <Fingerprint className="text-blue-600" /> Passkey Sign in
                    </button>
                  </>
                )}
                
                {mode !== 'setup' && (
                  <div className="mt-6 text-center">
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

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400">
                    Protected by Enterprise Grade Security. <br/>
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreativeID;
