import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, ShieldCheck } from 'lucide-react';
import { DailyDietPlan } from '../../types';

interface DayNavigatorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  schedule: DailyDietPlan[];
}

export const DayNavigator: React.FC<DayNavigatorProps> = ({
  selectedDay,
  onSelectDay,
  schedule,
}) => {
  const currentPlan = schedule.find((p) => p.day === selectedDay) || schedule[0];

  const handlePrev = () => {
    if (selectedDay > 1) onSelectDay(selectedDay - 1);
  };

  const handleNext = () => {
    if (selectedDay < 30) onSelectDay(selectedDay + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#12141C] border border-white/5">
      {/* Day Selector with Next / Prev */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
        <button
          onClick={handlePrev}
          disabled={selectedDay <= 1}
          aria-label="Previous day"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-20 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181B26] border border-white/5">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <select
            value={selectedDay}
            onChange={(e) => onSelectDay(Number(e.target.value))}
            aria-label="Select schedule day"
            className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
          >
            {schedule.map((p) => (
              <option key={p.day} value={p.day} className="bg-[#12141C] text-white">
                Day {p.day} of 30 ({p.totalProtein}g protein)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedDay >= 30}
          aria-label="Next day"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-20 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day Theme & Macros */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-zinc-400 font-medium truncate max-w-sm">
          {currentPlan?.theme}
        </span>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          120g Daily Target
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Zero Dairy
        </span>
      </div>
    </div>
  );
};
