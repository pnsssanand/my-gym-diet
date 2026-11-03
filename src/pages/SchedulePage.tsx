import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { DayNavigator } from '../components/schedule/DayNavigator';
import { MealCard } from '../components/schedule/MealCard';
import { MealEditModal } from '../components/schedule/MealEditModal';
import { RecipeDetailModal } from '../components/recipes/RecipeDetailModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { Meal, Recipe } from '../types';
import { Plus, RefreshCw, Sparkles } from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const {
    schedule,
    selectedDay,
    setSelectedDay,
    currentDayPlan,
    toggleMealCompleted,
    updateMeal,
    addMealToDay,
    deleteMealFromDay,
    regenerateDayPlan,
    recipes,
  } = useDiet();

  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isRegenerateConfirmOpen, setIsRegenerateConfirmOpen] = useState(false);

  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isRecipeDetailOpen, setIsRecipeDetailOpen] = useState(false);

  const plan = currentDayPlan || schedule[0];

  const handleOpenRecipe = (meal: Meal) => {
    const matching = recipes.find((r) => r.id === meal.recipeId) || {
      id: meal.recipeId,
      name: meal.title,
      mealType: meal.mealType,
      prepTime: meal.prepTime,
      cookTime: meal.cookTime,
      servingSize: meal.portionSize,
      ingredients: meal.ingredients,
      equipment: ['Pan', 'Spatula'],
      instructions: meal.instructions || ['Cook and enjoy your meal.'],
      nutrition: {
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        fiber: meal.fiber,
        calories: meal.calories,
      },
      preparationTips: ['Digital food scale weighing ensures 120g target accuracy.'],
      storageInstructions: 'Refrigerate in airtight container up to 48 hours.',
      substitutionOptions: ['Strictly zero dairy. Use tofu, soya chunks, or boiled eggs.'],
      image: meal.image,
      tags: ['Dairy-Free', 'High-Protein'],
      isVegetarian: meal.isVegetarian,
    };
    setViewingRecipe(matching);
    setIsRecipeDetailOpen(true);
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsEditModalOpen(true);
  };

  const handleDeletePrompt = (mealId: string) => {
    setDeletingMealId(mealId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingMealId) {
      deleteMealFromDay(selectedDay, deletingMealId);
      setDeletingMealId(null);
    }
  };

  const handleConfirmRegenerate = () => {
    regenerateDayPlan(selectedDay);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* 1. Calm Day Switcher */}
      <DayNavigator
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        schedule={schedule}
      />

      {/* 2. Action Row with Day Title */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white font-['Outfit']">
            {plan?.dayName}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            6 timed meals providing 120g protein & 1,950 kcal daily target.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Meal</span>
          </button>

          <button
            onClick={() => setIsRegenerateConfirmOpen(true)}
            title="Reset to original balanced plan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium border border-white/5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Reset Day</span>
          </button>
        </div>
      </div>

      {/* 3. The 6 Scheduled Meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plan?.meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            dayNumber={selectedDay}
            onToggleCompleted={toggleMealCompleted}
            onViewRecipe={handleOpenRecipe}
            onEditMeal={handleEditMeal}
            onDeleteMeal={handleDeletePrompt}
          />
        ))}
      </div>

      {/* Recipe Modal */}
      <RecipeDetailModal
        recipe={viewingRecipe}
        isOpen={isRecipeDetailOpen}
        onClose={() => setIsRecipeDetailOpen(false)}
      />

      {/* Edit Meal Modal */}
      <MealEditModal
        meal={editingMeal}
        dayNumber={selectedDay}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updated) => updateMeal(selectedDay, updated)}
      />

      {/* Add Meal Modal */}
      <MealEditModal
        meal={null}
        dayNumber={selectedDay}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(newMeal) => addMealToDay(selectedDay, newMeal)}
      />

      {/* Confirm Meal Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Scheduled Meal?"
        message="Are you sure you want to remove this meal from today's plan?"
        confirmText="Delete Meal"
      />

      {/* Confirm Regenerate Modal */}
      <ConfirmModal
        isOpen={isRegenerateConfirmOpen}
        onClose={() => setIsRegenerateConfirmOpen(false)}
        onConfirm={handleConfirmRegenerate}
        title="Reset Day Plan?"
        message={`Reset Day ${selectedDay} to its original balanced dairy-free high-protein plan?`}
        confirmText="Reset Day"
        isDestructive={false}
      />
    </div>
  );
};
