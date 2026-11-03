import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Plus, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { DailyWaterRecord } from '../../types';

interface WaterQuickWidgetProps {
  waterRecord: DailyWaterRecord;
  onAddWater: (amountMl: number) => void;
  onResetWater: () => void;
}

export const WaterQuickWidget: React.FC<WaterQuickWidgetProps> = ({
  waterRecord,
  onAddWater,
  onResetWater,
}) => {
  const navigate = useNavigate();
  const [customMl, setCustomMl] = useState<string>('');
  const [showInput, setShowInput] = useState(false);

  const percentage = Math.min(Math.round((waterRecord.totalMl / waterRecord.targetMl) * 100), 100);
  const remainingMl = Math.max(0, waterRecord.targetMl - waterRecord.totalMl);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customMl, 10);
    if (!isNaN(val) && val > 0) {
      onAddWater(val);
      setCustomMl('');
      setShowInput(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between">
      {/* Background Cyan Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">Hydration Tracker</h3>
              <span className="text-[11px] text-zinc-400">
                {(waterRecord.totalMl / 1000).toFixed(2)}L / {(waterRecord.targetMl / 1000).toFixed(2)}L Target
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onResetWater}
              title="Reset today's water log"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/water')}
              className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Progress Bar & Wave Indicator */}
        <div className="relative w-full h-10 rounded-2xl bg-[#151922] border border-cyan-500/20 overflow-hidden mb-3">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-400 rounded-xl transition-all duration-700 ease-out shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            style={{ width: `${percentage}%` }}
          />

          <div className="absolute inset-0 flex items-center justify-between px-4 z-10 text-xs font-mono font-bold">
            <span className="text-white drop-shadow-md">{percentage}% completed</span>
            <span className="text-cyan-100 drop-shadow-md">
              {remainingMl > 0 ? `${remainingMl} ml left` : 'Goal achieved!'}
            </span>
          </div>
        </div>

        {/* Quick Add Presets: 150ml, 250ml, 500ml, 750ml */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[150, 250, 500, 750].map((amount) => (
            <button
              key={amount}
              onClick={() => onAddWater(amount)}
              className="py-2 rounded-xl bg-[#161A24] border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-xs font-mono font-semibold text-zinc-300 hover:text-cyan-300 transition-all flex flex-col items-center justify-center group"
            >
              <span className="text-[10px] text-zinc-500 group-hover:text-cyan-400">+</span>
              <span>{amount}ml</span>
            </button>
          ))}
        </div>

        {/* Custom Input Toggle */}
        {showInput ? (
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="number"
              placeholder="Custom ml (e.g. 350)"
              value={customMl}
              onChange={(e) => setCustomMl(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl bg-[#151922] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Log
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full py-1.5 text-center text-xs font-semibold text-zinc-400 hover:text-cyan-300 hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" /> Custom amount
          </button>
        )}
      </div>
    </div>
  );
};
