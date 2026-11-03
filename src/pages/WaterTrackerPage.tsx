import React from 'react';
import { useDiet } from '../context/DietContext';
import { useAuth } from '../context/AuthContext';
import { HydrationGlass } from '../components/water/HydrationGlass';
import { HydrationChart } from '../components/water/HydrationChart';
import { Droplets, HeartPulse } from 'lucide-react';

export const WaterTrackerPage: React.FC = () => {
  const { waterRecord, addWater, resetWater, setWaterTarget } = useDiet();
  const { profile } = useAuth();

  const recommendedMl = Math.round((profile.weight || 61) * 42.5);

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Calm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">
            Water Tracker
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Calibrated for Anand's bodyweight ({profile.weight} kg) to support 120g protein digestion.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#12141C] px-3.5 py-2 rounded-xl border border-white/5">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-bold">{waterRecord.totalMl} ml</span>
          <span className="text-zinc-500">/ {recommendedMl} ml target</span>
        </div>
      </div>

      {/* Main Hydration Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Glass / Bottle Widget (5 cols) */}
        <div className="lg:col-span-5">
          <HydrationGlass
            waterRecord={waterRecord}
            onAddWater={addWater}
            onResetWater={resetWater}
            onUpdateTarget={setWaterTarget}
          />
        </div>

        {/* Right Column: Weekly History & Log Entries (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <HydrationChart waterRecord={waterRecord} />

          {/* Simple Note on High Protein Hydration */}
          <div className="p-4 rounded-2xl bg-[#12141C] border border-white/5 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-['Outfit']">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              Hydration Rule for 120g Daily Protein
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Consuming high protein produces nitrogen byproducts that require consistent water for kidney filtration and muscle cell volumization. Aim to finish your 2.6L target before 8:30 PM for restorative sleep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
