import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meal } from '../../types';
import { isMealTimePassed, isMealCurrentWindow } from '../../utils/time';
import {
  CheckCircle2,
  Circle,
  Clock,
  Utensils,
  ChevronRight,
  MinusCircle,
} from 'lucide-react';

interface TodayMealsPreviewProps {
  meals: Meal[];
  dayNumber: number;
  onToggleMeal: (day: number, mealId: string) => void;
  onSelectMeal: (meal: Meal) => void;
}

export const TodayMealsPreview: React.FC<TodayMealsPreviewProps> = ({
  meals,
  dayNumber,
  onToggleMeal,
  onSelectMeal,
}) => {
  const navigate = useNavigate();
  const [filterView, setFilterView] = useState<'all' | 'remaining'>('all');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update clock every 30 seconds for live meal status updates
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = meals.filter((m) => m.completed).length;

  const filteredMeals =
    filterView === 'remaining'
      ? meals.filter((m) => !m.completed && !isMealTimePassed(m.time, currentTime))
      : meals;

  return (
    <div className="rounded-2xl bg-[#12141C] border border-white/5 p-5 sm:p-6 space-y-4">
      {/* Calm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              Today's Meal Schedule
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              {completedCount} of {meals.length} eaten
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Meals past their scheduled time are automatically struck out.
          </p>
        </div>

        {/* Peaceful Tab Filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B0C10] border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setFilterView('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterView === 'all'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All 6 Meals
          </button>
          <button
            onClick={() => setFilterView('remaining')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterView === 'remaining'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Upcoming Only
          </button>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-2.5">
        {filteredMeals.map((meal, idx) => {
          const nextMeal = meals[idx + 1];
          const isPassed = isMealTimePassed(meal.time, currentTime);
          const isCurrent = isMealCurrentWindow(meal.time, nextMeal?.time, currentTime);
          const isStruckOut = meal.completed || isPassed;

          return (
            <div
              key={meal.id}
              className={`group rounded-xl p-3 sm:p-3.5 border transition-all duration-200 flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-[#151D18] border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/30'
                  : isStruckOut
                  ? 'bg-[#0E1017]/80 border-white/5 opacity-55 hover:opacity-85'
                  : 'bg-[#161922] border-white/5 hover:border-white/10'
              }`}
            >
              {/* Left: Checkmark + Dish Photo + Meal Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* One-click toggle */}
                <button
                  type="button"
                  onClick={() => onToggleMeal(dayNumber, meal.id)}
                  title={meal.completed ? 'Mark uncompleted' : 'Mark meal as eaten'}
                  className="shrink-0 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  {meal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isPassed ? (
                    <MinusCircle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400" />
                  )}
                </button>

                {/* Dish Photo */}
                <img
                  src={meal.image}
                  alt={meal.title}
                  className={`w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10 ${
                    isStruckOut ? 'grayscale-[35%]' : ''
                  }`}
                />

                {/* Text Details (clickable to open recipe) */}
                <div
                  onClick={() => onSelectMeal(meal)}
                  className="flex flex-col min-w-0 cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-0.5">
                    <span className="flex items-center gap-1 font-semibold text-zinc-300">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {meal.time}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="capitalize text-zinc-400">{meal.mealType}</span>

                    {/* Status Label */}
                    {isCurrent && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.2 rounded-full font-sans">
                          Eat Now
                        </span>
                      </>
                    )}
                    {meal.completed && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] font-medium text-emerald-400 font-sans">
                          Eaten
                        </span>
                      </>
                    )}
                    {!meal.completed && isPassed && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] text-zinc-500 font-sans">
                          Time Passed
                        </span>
                      </>
                    )}
                  </div>

                  {/* Meal Title with Strikethrough for out-of-time or completed */}
                  <h3
                    className={`text-sm truncate transition-colors ${
                      isStruckOut
                        ? 'line-through text-zinc-500 font-normal'
                        : isCurrent
                        ? 'text-white font-bold'
                        : 'text-zinc-100 font-medium group-hover:text-emerald-400'
                    }`}
                  >
                    {meal.title}
                  </h3>
                </div>
              </div>

              {/* Right: Macros & Recipe Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right font-mono">
                  <div
                    className={`text-xs font-bold ${
                      isStruckOut ? 'text-zinc-500' : 'text-emerald-400'
                    }`}
                  >
                    +{meal.protein}g protein
                  </div>
                  <div className="text-[10px] text-zinc-500">{meal.calories} kcal</div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectMeal(meal)}
                  title="View recipe details"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Utensils className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Recipe</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
        <span>Day {dayNumber} • 100% Dairy-Free Schedule</span>
        <button
          onClick={() => navigate('/schedule')}
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
        >
          <span>Full 30-Day Calendar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
