import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDiet } from '../context/DietContext';
import { TodayMealsPreview } from '../components/dashboard/TodayMealsPreview';
import { TodosPreview } from '../components/dashboard/TodosPreview';
import { RecipeDetailModal } from '../components/recipes/RecipeDetailModal';
import { Meal, Recipe } from '../types';
import {
  Dumbbell,
  Flame,
  Droplets,
  Calendar,
  ShoppingBag,
  Plus,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const {
    selectedDay,
    currentDayPlan,
    toggleMealCompleted,
    recipes,
    waterRecord,
    addWater,
    todos,
    toggleTodoCompleted,
  } = useDiet();

  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Consumed calculations
  const meals = currentDayPlan?.meals || [];
  const completedMeals = meals.filter((m) => m.completed);
  const proteinConsumed = completedMeals.reduce((s, m) => s + m.protein, 0);
  const caloriesConsumed = completedMeals.reduce((s, m) => s + m.calories, 0);
  const proteinTarget = profile.dailyProteinTarget || 120;
  const proteinRemaining = Math.max(0, proteinTarget - proteinConsumed);
  const proteinPercent = Math.min(Math.round((proteinConsumed / proteinTarget) * 100), 100);

  const handleSelectMeal = (meal: Meal) => {
    const matchingRecipe =
      recipes.find((r) => r.id === meal.recipeId) || {
        id: meal.recipeId,
        name: meal.title,
        mealType: meal.mealType,
        prepTime: meal.prepTime,
        cookTime: meal.cookTime,
        servingSize: meal.portionSize,
        ingredients: meal.ingredients,
        equipment: ['Skillet', 'Measuring scale'],
        instructions: meal.instructions || ['Cook and enjoy your meal.'],
        nutrition: {
          protein: meal.protein,
          carbs: meal.carbs,
          fats: meal.fats,
          fiber: meal.fiber,
          calories: meal.calories,
        },
        preparationTips: ['Digital scale measurement recommended for 120g target.'],
        storageInstructions: 'Refrigerate in sealed container.',
        substitutionOptions: ['Strictly zero dairy. Use tofu, soya, or egg whites.'],
        image: meal.image,
        tags: ['Dairy-Free', 'High-Protein'],
        isVegetarian: meal.isVegetarian,
      };
    setSelectedRecipe(matchingRecipe);
    setIsRecipeOpen(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* 1. Peaceful Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Day {selectedDay} of 30
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" /> {currentTimeStr}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400/90 flex items-center gap-1 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Strictly Dairy-Free
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
            {timeGreeting},{' '}
            <span className="text-emerald-400">{profile.displayName || 'Anand'}</span>
          </h1>
        </div>

        {/* Quiet Quick Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/schedule')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Schedule</span>
          </button>
          <button
            onClick={() => navigate('/kitchen/grocery')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Groceries</span>
          </button>
        </div>
      </div>

      {/* 2. Calm Three-Metric Overview (Zero Clutter) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Protein Target */}
        <div className="rounded-2xl bg-[#12141C] border border-white/5 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span className="font-medium text-zinc-300">Daily Protein Target</span>
              <Dumbbell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-extrabold text-white">{proteinConsumed}g</span>
              <span className="text-sm text-zinc-500">/ {proteinTarget}g</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-1.5 flex justify-between">
              <span>{proteinPercent}% achieved</span>
              <span className="text-emerald-400 font-medium">
                {proteinRemaining > 0 ? `${proteinRemaining}g remaining` : 'Target Met'}
              </span>
            </div>
          </div>
        </div>

        {/* Calories Intake */}
        <div className="rounded-2xl bg-[#12141C] border border-white/5 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span className="font-medium text-zinc-300">Energy Intake</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-3xl font-extrabold text-white">{caloriesConsumed}</span>
              <span className="text-sm text-zinc-500">/ {profile.dailyCaloriesTarget || 1950} kcal</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(
                      (caloriesConsumed / (profile.dailyCaloriesTarget || 1950)) * 100
                    )
                  )}%`,
                }}
              />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-1.5 flex justify-between">
              <span>Clean Fueling</span>
              <span>
                {Math.round(
                  (caloriesConsumed / (profile.dailyCaloriesTarget || 1950)) * 100
                )}% of daily target
              </span>
            </div>
          </div>
        </div>

        {/* Hydration with One-Click +250ml */}
        <div className="rounded-2xl bg-[#12141C] border border-white/5 p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <span>Hydration</span>
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl font-extrabold text-cyan-300">{waterRecord.totalMl}</span>
                <span className="text-sm text-zinc-500">/ {waterRecord.targetMl} ml</span>
              </div>
            </div>

            <button
              onClick={() => addWater(250)}
              title="Add 250ml water"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-mono text-xs font-bold transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> 250ml
            </button>
          </div>

          <div className="mt-4">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((waterRecord.totalMl / waterRecord.targetMl) * 100)
                  )}%`,
                }}
              />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-1.5 flex justify-between">
              <span>High protein flushing</span>
              <span className="text-cyan-400">
                {Math.round((waterRecord.totalMl / waterRecord.targetMl) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Body: Timeline on Left, Calm Companion Widgets on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Meal Timeline (8 cols) */}
        <div className="lg:col-span-8">
          <TodayMealsPreview
            meals={meals}
            dayNumber={selectedDay}
            onToggleMeal={toggleMealCompleted}
            onSelectMeal={handleSelectMeal}
          />
        </div>

        {/* Right: To-Dos & Quick Shortcuts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <TodosPreview todos={todos} onToggleTodo={toggleTodoCompleted} />

          {/* Quick Grocery Card */}
          <div className="rounded-2xl bg-[#12141C] border border-white/5 p-4 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">Monthly Groceries</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Consolidated 30-day items in exact grams.
              </p>
            </div>
            <button
              onClick={() => navigate('/kitchen/grocery')}
              className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={isRecipeOpen}
        onClose={() => setIsRecipeOpen(false)}
      />
    </div>
  );
};
