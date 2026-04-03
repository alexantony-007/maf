import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';

const ParentAuth: React.FC = () => {
  const { loginParent, registerParent } = useKidContext();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (mode === 'register') {
      if (!formData.fullName) {
        setError('Please enter your full name');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      let result;
      if (mode === 'login') {
        result = await loginParent(formData.email, formData.password);
      } else {
        result = await registerParent(formData.fullName, formData.email, formData.password);
      }

      if (!result.success) {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-br from-kid-blue/20 to-transparent rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-gradient-to-tl from-kid-purple/20 to-transparent rounded-full blur-[120px]" 
          />
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full glass-card rounded-[4rem] p-12 md:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] relative z-10 border-4 border-white"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/20 group cursor-pointer"
          >
            <ShieldCheck size={48} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
          </motion.div>
          <motion.h1 
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-800 mb-3 tracking-tighter"
          >
            {mode === 'login' ? 'Welcome Back' : 'Join the Fun'}
          </motion.h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Parental Verification Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-6">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-slate-50 border-4 border-transparent focus:border-slate-200 focus:bg-white outline-none text-xl font-black transition-all shadow-inner placeholder:text-slate-300"
                  />
                  <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300">
                    <User size={24} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-6">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="mom@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-slate-50 border-4 border-transparent focus:border-slate-200 focus:bg-white outline-none text-xl font-black transition-all shadow-inner placeholder:text-slate-300"
              />
              <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300">
                <Mail size={24} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-6">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-16 pr-16 py-6 rounded-[2.5rem] bg-slate-50 border-4 border-transparent focus:border-slate-200 focus:bg-white outline-none text-xl font-black transition-all shadow-inner placeholder:text-slate-300"
              />
              <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300">
                <Lock size={24} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-6">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-slate-50 border-4 border-transparent focus:border-slate-200 focus:bg-white outline-none text-xl font-black transition-all shadow-inner placeholder:text-slate-300"
                  />
                  <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300">
                    <Sparkles size={24} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-black mt-4 px-6 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 group relative overflow-hidden ${isLoading ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:shadow-slate-200 hover:-translate-y-1 overflow-hidden'}`}
          >
            {isLoading ? (
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} className="w-3 h-3 bg-slate-400 rounded-full" />
                ))}
              </div>
            ) : (
              <>
                <span className="relative z-10">{mode === 'login' ? 'Verify & Enter' : 'Create Account'}</span>
                <ArrowRight size={28} strokeWidth={3} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
            <button 
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-slate-400 font-bold text-sm flex items-center justify-center gap-3 mx-auto hover:text-slate-800 transition-colors group"
            >
                {mode === 'login' ? (
                  <>Don't have an account? <span className="text-slate-800 font-black group-hover:underline">Join Now</span></>
                ) : (
                  <>Already registered? <span className="text-slate-800 font-black group-hover:underline">Sign In</span></>
                )}
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentAuth;
