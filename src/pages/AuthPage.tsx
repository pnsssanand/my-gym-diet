import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Dumbbell,
  ShieldCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, signup, resetPassword, isFirebaseActive } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/');
      } else if (mode === 'signup') {
        if (!username.trim()) throw new Error('Please choose a username');
        await signup(username.trim(), email, password);
        navigate('/');
      } else {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email address!');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsAnand = async () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute w-[600px] h-[600px] bg-[#22c55e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none translate-y-64" />

      {/* Main Glassmorphic Card */}
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A202C] to-[#111319] border border-[#22c55e]/30 shadow-[0_0_25px_rgba(34,197,94,0.3)] mb-4">
            <Dumbbell className="w-8 h-8 text-[#22c55e]" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-wide font-['Outfit']">
            MY GYM <span className="text-[#22c55e]">DIET</span>
          </h1>

          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold mt-1">
            Elite 120g Protein • Dairy-Free OS
          </p>
        </div>

        {/* Tab Buttons (Login vs Signup) */}
        {mode !== 'forgot' && (
          <div className="flex items-center p-1 rounded-2xl bg-[#161A24] border border-white/5 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-[#22c55e] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-[#22c55e] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alert Notifications */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Username *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. anand_pinisetty"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#22c55e]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="athlete@gymdiet.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#22c55e]"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-400">Password *</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-[#22c55e] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#22c55e]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Dashboard'
                : mode === 'signup'
                ? 'Create My Nutrition Account'
                : 'Send Password Reset Link'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {mode === 'forgot' && (
          <div className="text-center mt-4">
            <button
              onClick={() => setMode('login')}
              className="text-xs text-zinc-400 hover:text-white underline"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* Instant Demo Switcher / Guest Pass */}
        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
          <button
            type="button"
            onClick={handleContinueAsAnand}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
            <span>Continue as Anand Pinisetty (Demo)</span>
          </button>
          <p className="text-[10px] text-zinc-500 text-center">
            {isFirebaseActive
              ? 'Firebase Authentication is configured and active.'
              : 'Local high-speed secure persistence is active.'}
          </p>
        </div>
      </div>
    </div>
  );
};
