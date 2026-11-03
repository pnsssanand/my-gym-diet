import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Dumbbell, Wheat, Sparkles } from 'lucide-react';

interface NutritionProgressRingsProps {
  proteinConsumed: number;
  proteinTarget: number;
  caloriesConsumed: number;
  caloriesTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fiberConsumed: number;
  fiberTarget: number;
}

export const NutritionProgressRings: React.FC<NutritionProgressRingsProps> = ({
  proteinConsumed,
  proteinTarget = 120,
  caloriesConsumed,
  caloriesTarget = 1950,
  carbsConsumed,
  carbsTarget = 220,
  fiberConsumed,
  fiberTarget = 35,
}) => {
  const proteinPct = Math.min(Math.round((proteinConsumed / proteinTarget) * 100), 100);
  const caloriesPct = Math.min(Math.round((caloriesConsumed / caloriesTarget) * 100), 100);
  const carbsPct = Math.min(Math.round((carbsConsumed / carbsTarget) * 100), 100);
  const fiberPct = Math.min(Math.round((fiberConsumed / fiberTarget) * 100), 100);

  // SVG ring calculations
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const proteinOffset = circumference - (proteinPct / 100) * circumference;

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border border-white/5">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Main Hero Protein Ring */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex items-center justify-center shrink-0">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth={strokeWidth}
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#22c55e"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: proteinOffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                className="drop-shadow-[0_0_12px_#22c55e]"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <Dumbbell className="w-5 h-5 text-[#22c55e] mb-1" />
              <span className="text-3xl font-extrabold text-white font-mono leading-none">
                {proteinConsumed}
                <span className="text-sm font-normal text-zinc-400">g</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mt-1">
                / {proteinTarget}g Target
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 text-xs font-semibold w-fit mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5" />
              {proteinPct >= 100 ? 'Target Achieved!' : `${proteinTarget - proteinConsumed}g Remaining Today`}
            </div>
            <h2 className="text-2xl font-bold text-white font-['Outfit']">Daily Protein Intake</h2>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Consistently hitting ~120g of clean dairy-free protein stimulates maximum muscle protein synthesis.
            </p>
          </div>
        </div>

        {/* Secondary Macro Metric Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Calories */}
          <div className="flex flex-col p-4 rounded-2xl bg-[#161A24] border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">Calories</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xl font-bold text-white font-mono">
              {caloriesConsumed}
              <span className="text-xs text-zinc-500 font-normal"> / {caloriesTarget}</span>
            </span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div
                className="h-full bg-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${caloriesPct}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">{caloriesPct}% kcal</span>
          </div>

          {/* Carbs */}
          <div className="flex flex-col p-4 rounded-2xl bg-[#161A24] border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">Carbs</span>
              <Wheat className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-xl font-bold text-white font-mono">
              {carbsConsumed}
              <span className="text-xs text-zinc-500 font-normal"> / {carbsTarget}g</span>
            </span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${carbsPct}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">{carbsPct}% energy</span>
          </div>

          {/* Fiber */}
          <div className="flex flex-col p-4 rounded-2xl bg-[#161A24] border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">Fiber</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-white font-mono">
              {fiberConsumed}
              <span className="text-xs text-zinc-500 font-normal"> / {fiberTarget}g</span>
            </span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${fiberPct}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">{fiberPct}% gut health</span>
          </div>
        </div>
      </div>
    </div>
  );
};
