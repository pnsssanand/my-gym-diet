import React, { useState, useEffect } from 'react';
import { Menu, Droplets, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDiet } from '../../context/DietContext';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { profile } = useAuth();
  const { selectedDay, waterRecord, addWater } = useDiet();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0B0C10]/95 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Date */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-white">{dateFormatted}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 font-mono">{timeStr}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400 font-semibold font-mono">Day {selectedDay}</span>
        </div>
      </div>

      {/* Right: Water Tracker Widget & Profile Avatar */}
      <div className="flex items-center gap-3">
        {/* Minimalist Water Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-white/5 text-xs">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-zinc-300">
            {waterRecord.totalMl} <span className="text-zinc-600">/ {waterRecord.targetMl}ml</span>
          </span>
          <button
            onClick={() => addWater(250)}
            title="Log 250ml water"
            className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors text-xs font-bold"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* User Avatar */}
        <img
          src={profile.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
          alt={profile.displayName}
          className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
        />
      </div>
    </header>
  );
};
