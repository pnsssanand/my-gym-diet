import React from 'react';
import { Meal } from '../../types';
import { isMealTimePassed } from '../../utils/time';
import {
  CheckCircle2,
  Circle,
  Clock,
  Utensils,
  Edit3,
  Trash2,
  MinusCircle,
} from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  dayNumber: number;
  onToggleCompleted: (day: number, mealId: string) => void;
  onViewRecipe: (meal: Meal) => void;
  onEditMeal: (meal: Meal) => void;
  onDeleteMeal: (mealId: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  dayNumber,
  onToggleCompleted,
  onViewRecipe,
  onEditMeal,
  onDeleteMeal,
}) => {
  const isTimePassed = isMealTimePassed(meal.time);
  const isStruckOut = meal.completed || (dayNumber === 1 && isTimePassed);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
        isStruckOut
          ? 'bg-[#0E1017]/80 border-white/5 opacity-60 hover:opacity-90'
          : 'bg-[#12141C] border-white/5 hover:border-emerald-500/30'
      }`}
    >
      <div>
        {/* Top: Checkmark, Meal Type, Time, Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleCompleted(dayNumber, meal.id)}
              aria-label={meal.completed ? 'Mark incomplete' : 'Mark complete'}
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              {meal.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isStruckOut ? (
                <MinusCircle className="w-5 h-5 text-zinc-600" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
              )}
            </button>

            <span className="text-[11px] font-mono uppercase font-bold text-zinc-400">
              {meal.mealType}
            </span>

            {isStruckOut && (
              <span className="text-[10px] text-zinc-500 font-mono">
                {meal.completed ? 'Eaten' : 'Passed'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span className={isStruckOut ? 'line-through text-zinc-500' : ''}>{meal.time}</span>
          </div>
        </div>

        {/* Dish Image & Title */}
        <div className="flex gap-3.5 mb-4">
          <img
            src={meal.image}
            alt={meal.title}
            className={`w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10 ${
              isStruckOut ? 'grayscale-[35%]' : ''
            }`}
          />

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h4
              onClick={() => onViewRecipe(meal)}
              className={`text-sm sm:text-base font-semibold hover:text-emerald-400 cursor-pointer transition-colors leading-snug line-clamp-2 ${
                isStruckOut ? 'line-through text-zinc-500' : 'text-white'
              }`}
            >
              {meal.title}
            </h4>

            <div className="text-[11px] text-zinc-400 mt-1 font-mono">
              {meal.portionSize}
            </div>

            <div className="text-[10px] text-zinc-500 mt-0.5">
              {meal.prepTime} prep • {meal.cookTime} cook
            </div>
          </div>
        </div>

        {/* Calm Macro Pill Strip */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#0B0C10] border border-white/5 mb-4 font-mono text-center text-xs">
          <div>
            <div className="text-[10px] text-zinc-500">PROTEIN</div>
            <div className={`font-bold ${isStruckOut ? 'text-zinc-500' : 'text-emerald-400'}`}>
              +{meal.protein}g
            </div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500">CALORIES</div>
            <div className="font-semibold text-zinc-300">{meal.calories}</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500">CARBS</div>
            <div className="font-semibold text-zinc-400">{meal.carbs}g</div>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <button
          onClick={() => onViewRecipe(meal)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/15 text-zinc-300 hover:text-emerald-400 text-xs font-medium transition-colors"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Recipe</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEditMeal(meal)}
            title="Edit Meal"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteMeal(meal.id)}
            title="Delete Meal"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
