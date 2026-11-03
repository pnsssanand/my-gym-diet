import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DailyWaterRecord } from '../../types';

interface HydrationChartProps {
  waterRecord: DailyWaterRecord;
}

export const HydrationChart: React.FC<HydrationChartProps> = ({ waterRecord }) => {
  // Generate 7-day realistic hydration trend ending with today
  const weekData = [
    { day: 'Thu', ml: 2400, target: waterRecord.targetMl },
    { day: 'Fri', ml: 2650, target: waterRecord.targetMl },
    { day: 'Sat', ml: 2500, target: waterRecord.targetMl },
    { day: 'Sun', ml: 2200, target: waterRecord.targetMl },
    { day: 'Mon', ml: 2700, target: waterRecord.targetMl },
    { day: 'Tue', ml: 2600, target: waterRecord.targetMl },
    { day: 'Today', ml: waterRecord.totalMl, target: waterRecord.targetMl },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#12141C] border border-cyan-500/30 p-2.5 rounded-xl text-xs">
          <div className="font-semibold text-white mb-0.5">{data.day}</div>
          <div className="text-cyan-400 font-mono font-medium">Intake: {data.ml} ml</div>
          <div className="text-zinc-500 font-mono text-[10px]">Target: {data.target} ml</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl p-5 sm:p-6 bg-[#12141C] border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white font-['Outfit']">7-Day Hydration History</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Consistent hydration supports kidney filtration of protein metabolites.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Intake
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2.5 h-0.5 bg-cyan-400/50" /> Target
          </span>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weekData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              domain={[0, 3500]}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={waterRecord.targetMl}
              stroke="#06b6d4"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="ml"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cyanGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Timestamp Log entries */}
      <div>
        <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
          Today's Log Entries ({waterRecord.entries.length})
        </h4>
        {waterRecord.entries.length === 0 ? (
          <p className="text-xs text-zinc-500 italic">No entries logged yet today.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto">
            {waterRecord.entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-2 rounded-xl bg-[#161922] border border-white/5 text-xs font-mono"
              >
                <span className="text-zinc-400">{entry.time}</span>
                <span className="font-semibold text-cyan-400">+{entry.amountMl} ml</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
