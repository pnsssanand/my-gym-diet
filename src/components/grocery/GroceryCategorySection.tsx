import React from 'react';
import { MonthlyGroceryItem } from '../../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface GroceryCategorySectionProps {
  category: MonthlyGroceryItem['category'];
  title: string;
  icon: React.ReactNode;
  items: MonthlyGroceryItem[];
  onTogglePurchased: (id: string) => void;
}

export const GroceryCategorySection: React.FC<GroceryCategorySectionProps> = ({
  title,
  icon,
  items,
  onTogglePurchased,
}) => {
  if (items.length === 0) return null;

  const purchasedCount = items.filter((i) => i.purchased).length;
  const totalPrice = items.reduce(
    (sum, i) =>
      sum + (i.estimatedPriceGBP !== undefined ? i.estimatedPriceGBP : (i.estimatedPriceINR ? i.estimatedPriceINR * 0.015 : 0)),
    0
  );

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-[#12141C] border border-white/5 space-y-3">
      {/* Category Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white/5 text-emerald-400">{icon}</div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white font-['Outfit']">{title}</h3>
            <span className="text-[11px] text-zinc-400 font-mono">
              {purchasedCount} of {items.length} purchased
            </span>
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="font-semibold text-zinc-300">£{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Item List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onTogglePurchased(item.id)}
            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
              item.purchased
                ? 'bg-[#0E1017]/60 border-white/5 opacity-55'
                : 'bg-[#161922] border-white/5 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {item.purchased ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-500 hover:text-emerald-400 shrink-0" />
              )}
              <span
                className={`text-xs truncate ${
                  item.purchased ? 'line-through text-zinc-500 font-normal' : 'text-zinc-200 font-medium'
                }`}
              >
                {item.name}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
              <span className="font-semibold text-zinc-300 bg-black/40 px-2 py-0.5 rounded border border-white/5 text-[11px]">
                {item.displayQuantity}
              </span>
              <span className="text-[11px] text-zinc-500">
                £{(item.estimatedPriceGBP !== undefined ? item.estimatedPriceGBP : (item.estimatedPriceINR ? item.estimatedPriceINR * 0.015 : 0)).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
