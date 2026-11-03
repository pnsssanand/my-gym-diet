import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { DailyDietPlan } from '../../types';

interface NutritionBarChartProps {
  schedule: DailyDietPlan[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const NutritionBarChart: React.FC<NutritionBarChartProps> = ({
  schedule,
  selectedDay,
  onSelectDay,
}) => {
  // Take next 14 days or current sliding window
  const windowStart = Math.max(0, Math.min(selectedDay - 4, schedule.length - 10));
  const data = schedule.slice(windowStart, windowStart + 10).map((plan) => ({
    day: `Day ${plan.day}`,
    dayNumber: plan.day,
    protein: plan.totalProtein,
    calories: plan.totalCalories,
    theme: plan.theme,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#151922] border border-[#22c55e]/40 p-3 rounded-xl shadow-xl text-xs">
          <div className="font-bold text-white mb-1">{item.day}</div>
          <div className="text-[#22c55e] font-mono font-semibold">
            Protein: {item.protein}g (Target: 120g)
          </div>
          <div className="text-amber-300 font-mono">Calories: {item.calories} kcal</div>
          <div className="text-zinc-400 text-[11px] mt-1 max-w-[200px]">{item.theme}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Daily Protein Consistency (Target 120g)
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click any bar to jump to that day's schedule
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-3 h-3 rounded-sm bg-[#22c55e]" /> Protein (g)
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-3 h-0.5 bg-rose-500" /> 120g Target Line
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              domain={[0, 140]}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <ReferenceLine
              y={120}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <Bar
              dataKey="protein"
              radius={[6, 6, 0, 0]}
              onClick={(entry: any) => {
                if (entry && entry.dayNumber) onSelectDay(entry.dayNumber);
              }}
              className="cursor-pointer"
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.dayNumber}`}
                  fill={entry.dayNumber === selectedDay ? '#4ADE80' : '#15803D'}
                  stroke={entry.dayNumber === selectedDay ? '#22c55e' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
