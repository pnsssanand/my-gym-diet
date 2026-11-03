import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ShieldCheck, Flame, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, minDurationMs = 1800 }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDurationMs) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0F] text-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Neon Background Glows */}
          <div className="absolute w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
          <div className="absolute w-[350px] h-[350px] bg-[#06b6d4]/10 rounded-full blur-[100px] pointer-events-none translate-y-32" />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex flex-col items-center mb-8"
          >
            {/* Glowing Icon Frame */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-[#1A202C] to-[#111319] border border-[#22c55e]/30 shadow-[0_0_40px_rgba(34,197,94,0.25)]">
              <Dumbbell className="w-12 h-12 text-[#22c55e] animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-2xl border border-dashed border-[#22c55e]/30"
              />
            </div>

            {/* Brand Title */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-3xl font-extrabold tracking-wider text-white font-['Outfit']">
                  MY GYM <span className="text-[#22c55e] drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">DIET</span>
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
                Elite Dairy-Free Nutrition OS
              </p>
            </div>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-64 max-w-[80vw] flex flex-col items-center gap-3">
            <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full shadow-[0_0_12px_#22c55e]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1 text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
                {progress < 40 ? 'Loading 30-Day Plan...' : progress < 75 ? 'Calculating 120g Protein...' : 'Calibrating Hydration...'}
              </span>
              <span className="text-[#22c55e] font-semibold">{progress}%</span>
            </div>
          </div>

          {/* Badges footer */}
          <div className="absolute bottom-8 flex items-center gap-6 text-[11px] text-zinc-400 tracking-wider">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" /> 100% Dairy-Free
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> 120g Daily Protein
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
