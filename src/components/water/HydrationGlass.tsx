import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Plus, RotateCcw } from 'lucide-react';
import { DailyWaterRecord } from '../../types';

interface HydrationGlassProps {
  waterRecord: DailyWaterRecord;
  onAddWater: (amountMl: number) => void;
  onResetWater: () => void;
  onUpdateTarget: (targetMl: number) => void;
}

export const HydrationGlass: React.FC<HydrationGlassProps> = ({
  waterRecord,
  onAddWater,
  onResetWater,
  onUpdateTarget,
}) => {
  const percentage = Math.min(Math.round((waterRecord.totalMl / waterRecord.targetMl) * 100), 100);
  const remainingMl = Math.max(0, waterRecord.targetMl - waterRecord.totalMl);
  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(waterRecord.targetMl.toString());

  const handleTargetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(targetInput, 10);
    if (!isNaN(val) && val >= 1000) {
      onUpdateTarget(val);
      setEditingTarget(false);
    }
  };

  return (
    <div className="rounded-2xl p-5 sm:p-6 bg-[#12141C] border border-white/5 relative overflow-hidden flex flex-col items-center">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <span className="text-[11px] font-mono font-medium text-cyan-400 uppercase flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5" /> Hydration Level
          </span>
          <h2 className="text-xl font-bold text-white font-['Outfit'] mt-0.5">Water Balance</h2>
        </div>

        <button
          onClick={onResetWater}
          title="Reset today's hydration log"
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Modern Clean Flask */}
      <div className="relative w-40 h-60 sm:w-44 sm:h-64 rounded-3xl border-2 border-cyan-400/20 bg-[#0B0C10] p-1.5 shadow-inner overflow-hidden flex flex-col justify-end my-3">
        {/* Liquid Water Fill */}
        <motion.div
          className="w-full bg-gradient-to-t from-cyan-600 via-cyan-500 to-emerald-400 rounded-b-2xl relative"
          initial={{ height: '0%' }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 select-none">
          <span className="text-3xl font-extrabold text-white font-mono drop-shadow-md">
            {percentage}%
          </span>
          <span className="text-xs text-zinc-200 font-mono mt-0.5">
            {waterRecord.totalMl} ml
          </span>
          <span className="text-[10px] text-zinc-400 mt-1">
            {remainingMl > 0 ? `${remainingMl} ml left` : 'Target Met'}
          </span>
        </div>
      </div>

      {/* Target Setting */}
      <div className="my-2">
        {editingTarget ? (
          <form onSubmit={handleTargetSubmit} className="flex items-center gap-1.5">
            <input
              type="number"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="w-24 px-2 py-1 rounded-lg bg-[#181B26] border border-cyan-400/50 text-white font-mono text-xs text-center"
              autoFocus
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-semibold text-xs"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingTarget(false)}
              className="text-xs text-zinc-500 hover:text-white"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setEditingTarget(true)}
            className="text-xs font-mono text-zinc-400 hover:text-cyan-300 px-3 py-1 rounded-full bg-white/5 border border-white/5 transition-colors"
          >
            Daily Target: <span className="text-white font-semibold">{waterRecord.targetMl} ml</span> (edit)
          </button>
        )}
      </div>

      {/* Quick Intake Tap Buttons */}
      <div className="w-full mt-4">
        <div className="grid grid-cols-4 gap-2">
          {[150, 250, 500, 750].map((amount) => (
            <button
              key={amount}
              onClick={() => onAddWater(amount)}
              className="py-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/15 text-zinc-200 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col items-center justify-center font-mono"
            >
              <div className="flex items-center text-[10px] text-zinc-500">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-xs font-bold">{amount}ml</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
