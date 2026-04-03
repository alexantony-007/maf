import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useKidContext } from '../hooks/useKidContext';

const ParentAuth: React.FC = () => {
  const { loginParent } = useKidContext();
  const [method, setMethod] = useState<'email' | 'mobile'>('email');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setError(`Please enter your ${method}`);
      return;
    }
    
    // Simple validation
    if (method === 'email' && !value.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (method === 'mobile' && value.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsVerifying(true);
    // Mock delay for "Verification"
    setTimeout(() => {
      loginParent(value, method);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-kid-blue/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-kid-purple/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-[3.5rem] p-12 shadow-2xl relative z-10 border-4 border-white"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-slate-800 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white/20">
            <ShieldCheck size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Parent Access</h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Verify to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Method Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-[1.8rem] gap-1">
            <button
              type="button"
              onClick={() => { setMethod('email'); setError(''); setValue(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.4rem] font-black transition-all ${method === 'email' ? 'bg-white text-slate-800 shadow-md scale-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Mail size={18} strokeWidth={3} /> Email
            </button>
            <button
              type="button"
              onClick={() => { setMethod('mobile'); setError(''); setValue(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.4rem] font-black transition-all ${method === 'mobile' ? 'bg-white text-slate-800 shadow-md scale-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Phone size={18} strokeWidth={3} /> Mobile
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-4">
              {method === 'email' ? 'Email Address' : 'Mobile Number'}
            </label>
            <div className="relative">
              <input
                type={method === 'email' ? 'email' : 'tel'}
                placeholder={method === 'email' ? 'mom@example.com' : '+91 98765 43210'}
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(''); }}
                className="w-full pl-14 pr-8 py-6 rounded-[2.2rem] bg-slate-50 border-4 border-transparent focus:border-slate-200 focus:bg-white outline-none text-xl font-black transition-all shadow-inner placeholder:text-slate-300"
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">
                {method === 'email' ? <Mail size={22} /> : <Phone size={22} />}
              </div>
            </div>
            {error && <p className="text-red-500 text-xs font-black mt-3 px-4 animate-bounce">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full py-7 rounded-[2.2rem] font-black text-2xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${isVerifying ? 'bg-slate-200 text-slate-400' : 'bg-slate-800 text-white hover:shadow-2xl hover:-translate-y-1 border-t-4 border-white/10'}`}
          >
            {isVerifying ? (
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} className="w-2.5 h-2.5 bg-slate-400 rounded-full" />
                ))}
              </div>
            ) : (
              <>Verify & Enter <ArrowRight size={24} strokeWidth={3} /></>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold text-xs flex items-center justify-center gap-2">
                <Lock size={14} strokeWidth={3} /> Secure Parent Portal
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentAuth;
