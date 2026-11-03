import React, { useState, useEffect } from 'react';
import { Meal, MealType } from '../../types';
import { Modal } from '../common/Modal';
import { useDiet } from '../../context/DietContext';

interface MealEditModalProps {
  meal?: Meal | null;
  dayNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: Meal) => void;
}

export const MealEditModal: React.FC<MealEditModalProps> = ({
  meal,
  dayNumber,
  isOpen,
  onClose,
  onSave,
}) => {
  const { recipes } = useDiet();

  const [title, setTitle] = useState('');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [time, setTime] = useState('08:00 AM');
  const [portionSize, setPortionSize] = useState('1 serving (350g)');
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(25);
  const [carbs, setCarbs] = useState(40);
  const [fats, setFats] = useState(8);
  const [fiber, setFiber] = useState(6);
  const [image, setImage] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState('');

  useEffect(() => {
    if (meal) {
      setTitle(meal.title);
      setMealType(meal.mealType);
      setTime(meal.time);
      setPortionSize(meal.portionSize);
      setCalories(meal.calories);
      setProtein(meal.protein);
      setCarbs(meal.carbs);
      setFats(meal.fats);
      setFiber(meal.fiber);
      setImage(meal.image);
      setSelectedRecipeId(meal.recipeId);
    } else {
      setTitle('');
      setMealType('breakfast');
      setTime('08:00 AM');
      setPortionSize('1 serving (350g)');
      setCalories(350);
      setProtein(25);
      setCarbs(40);
      setFats(8);
      setFiber(6);
      setImage('https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80');
      setSelectedRecipeId('');
    }
  }, [meal, isOpen]);

  // When a user selects an existing recipe from dropdown, auto-fill all data!
  const handleRecipeSelect = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    const rec = recipes.find((r) => r.id === recipeId);
    if (rec) {
      setTitle(rec.name);
      setMealType(rec.mealType);
      setPortionSize(rec.servingSize);
      setCalories(rec.nutrition.calories);
      setProtein(rec.nutrition.protein);
      setCarbs(rec.nutrition.carbs);
      setFats(rec.nutrition.fats);
      setFiber(rec.nutrition.fiber);
      setImage(rec.image);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenRecipe = recipes.find((r) => r.id === selectedRecipeId);

    const savedMeal: Meal = {
      id: meal?.id || `d${dayNumber}-m${Date.now()}`,
      dayNumber,
      mealType,
      title: title.trim(),
      time,
      recipeId: selectedRecipeId || meal?.recipeId || 'rec-masala-oats-egg',
      prepTime: chosenRecipe?.prepTime || meal?.prepTime || '10 mins',
      cookTime: chosenRecipe?.cookTime || meal?.cookTime || '15 mins',
      portionSize,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
      fiber: Number(fiber) || 0,
      completed: meal?.completed || false,
      ingredients: chosenRecipe?.ingredients || meal?.ingredients || [],
      instructions: chosenRecipe?.instructions || meal?.instructions || [],
      image: image || chosenRecipe?.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
      isVegetarian: chosenRecipe?.isVegetarian ?? true,
    };

    onSave(savedMeal);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={meal ? `Edit Meal — Day ${dayNumber}` : `Add Meal — Day ${dayNumber}`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Recipe Template Picker */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Choose from Dairy-Free Recipe Library (Auto-fills macros & ingredients)
          </label>
          <select
            value={selectedRecipeId}
            onChange={(e) => handleRecipeSelect(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
          >
            <option value="">-- Custom or Choose Recipe --</option>
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.nutrition.protein}g protein, {r.nutrition.calories} kcal)
              </option>
            ))}
          </select>
        </div>

        {/* Meal Title */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Meal Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
          />
        </div>

        {/* Slot & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            >
              <option value="breakfast">Breakfast</option>
              <option value="morningSnack">Morning Snack</option>
              <option value="lunch">Lunch</option>
              <option value="eveningSnack">Evening Snack</option>
              <option value="dinner">Dinner</option>
              <option value="bedtimeSnack">Bedtime Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Timing</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 08:30 AM"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs font-mono"
            />
          </div>
        </div>

        {/* Macros */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Nutrition Breakdown</label>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Protein (g)</span>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-[#22c55e]/40 text-[#22c55e] font-bold text-xs font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Calories (kcal)</span>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-amber-500/30 text-amber-300 font-bold text-xs font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Carbs (g)</span>
              <input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Fats (g)</span>
              <input
                type="number"
                value={fats}
                onChange={(e) => setFats(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Portion & Image */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Portion Size</label>
            <input
              type="text"
              value={portionSize}
              onChange={(e) => setPortionSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Food Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
          >
            {meal ? 'Save Meal' : 'Add to Day'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
