import React, { useState, useEffect } from 'react';
import { Recipe, MealType, Ingredient } from '../../types';
import { Modal } from '../common/Modal';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { Plus, Trash2, Upload, AlertCircle } from 'lucide-react';

interface RecipeEditModalProps {
  recipe?: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

export const RecipeEditModal: React.FC<RecipeEditModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [prepTime, setPrepTime] = useState('10 mins');
  const [cookTime, setCookTime] = useState('15 mins');
  const [servingSize, setServingSize] = useState('1 serving (350g)');
  const [image, setImage] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Nutrition
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(45);
  const [fats, setFats] = useState<number>(8);
  const [fiber, setFiber] = useState<number>(6);
  const [calories, setCalories] = useState<number>(370);

  // Dynamic Lists
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantityGrams: 50, category: 'pulses' },
  ]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [equipment, setEquipment] = useState<string>('Pan, Spatula');
  const [storageInstructions, setStorageInstructions] = useState('Store in fridge up to 48 hours.');
  const [substitution, setSubstitution] = useState('Substitute with firm tofu or soya granules.');

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setMealType(recipe.mealType);
      setPrepTime(recipe.prepTime);
      setCookTime(recipe.cookTime);
      setServingSize(recipe.servingSize);
      setImage(recipe.image);
      setIsVegetarian(recipe.isVegetarian);
      setProtein(recipe.nutrition.protein);
      setCarbs(recipe.nutrition.carbs);
      setFats(recipe.nutrition.fats);
      setFiber(recipe.nutrition.fiber);
      setCalories(recipe.nutrition.calories);
      setIngredients(recipe.ingredients.length ? recipe.ingredients : [{ name: '', quantityGrams: 50, category: 'pulses' }]);
      setInstructions(recipe.instructions.length ? recipe.instructions : ['']);
      setEquipment(recipe.equipment?.join(', ') || '');
      setStorageInstructions(recipe.storageInstructions || '');
      setSubstitution(recipe.substitutionOptions?.join(', ') || '');
    } else {
      setName('');
      setMealType('lunch');
      setPrepTime('10 mins');
      setCookTime('15 mins');
      setServingSize('1 portion (350g)');
      setImage('https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80');
      setIsVegetarian(true);
      setProtein(30);
      setCarbs(45);
      setFats(8);
      setFiber(6);
      setCalories(370);
      setIngredients([{ name: 'Soya Granules', quantityGrams: 50, category: 'pulses' }]);
      setInstructions(['Boil and squeeze thoroughly.', 'Sauté with spices in oil.']);
      setEquipment('Pan, Knife');
      setStorageInstructions('Refrigerate up to 48h');
      setSubstitution('Strictly no dairy.');
    }
  }, [recipe, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setImage(url);
      } catch (err) {
        console.error('Image upload failed', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantityGrams: 50, category: 'vegetables' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: any) => {
    const next = [...ingredients];
    next[index] = { ...next[index], [field]: value };
    setIngredients(next);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const next = [...instructions];
    next[index] = value;
    setInstructions(next);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRecipe: Recipe = {
      id: recipe?.id || `rec-${Date.now()}`,
      name: name.trim(),
      mealType,
      prepTime,
      cookTime,
      servingSize,
      image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
      isVegetarian,
      nutrition: {
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fats: Number(fats) || 0,
        fiber: Number(fiber) || 0,
        calories: Number(calories) || 0,
      },
      ingredients: ingredients.filter((ing) => ing.name.trim() !== ''),
      equipment: equipment.split(',').map((s) => s.trim()).filter(Boolean),
      instructions: instructions.filter((step) => step.trim() !== ''),
      preparationTips: ['Strictly zero milk, curd, ghee or butter.', 'Measure gram weights with digital scale.'],
      storageInstructions,
      substitutionOptions: [substitution],
      tags: ['Dairy-Free', isVegetarian ? 'Vegetarian' : 'Non-Veg', `${protein}g Protein`],
    };

    onSave(newRecipe);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={recipe ? 'Edit Dairy-Free Recipe' : 'Add New High-Protein Recipe'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Dairy-Free Reminder Notice */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Dairy-Free Requirement: Ensure no milk, curd, paneer, whey, or butter is used.</span>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Recipe Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Soya Bhurji with Rotis"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Meal Timing Slot</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
            >
              <option value="breakfast">Breakfast</option>
              <option value="morningSnack">Morning Snack</option>
              <option value="lunch">Lunch</option>
              <option value="eveningSnack">Evening Snack</option>
              <option value="dinner">Dinner</option>
              <option value="bedtimeSnack">Bedtime Snack</option>
            </select>
          </div>
        </div>

        {/* Times & Serving */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Prep Time</label>
            <input
              type="text"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Cook Time</label>
            <input
              type="text"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Serving Size</label>
            <input
              type="text"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        {/* Macros Breakdown */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
            Nutritional Values Per Serving
          </label>
          <div className="grid grid-cols-5 gap-2">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Protein (g)</span>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-[#22c55e]/30 text-[#22c55e] font-bold text-xs font-mono"
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
            <div>
              <span className="text-[10px] text-zinc-500 font-mono">Fiber (g)</span>
              <input
                type="number"
                value={fiber}
                onChange={(e) => setFiber(Number(e.target.value))}
                className="w-full px-2 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs font-mono"
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
          </div>
        </div>

        {/* Image upload / URL */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Food Image (Cloudinary / File Upload or Image URL)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
            <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer transition-colors font-medium">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Uploading...' : 'Upload'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-zinc-400">Ingredients with Grams</label>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="flex items-center gap-1 text-[11px] text-[#22c55e] hover:text-[#4ade80] font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Ingredient
            </button>
          </div>

          <div className="space-y-2">
            {ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Grams"
                  value={ing.quantityGrams}
                  onChange={(e) =>
                    handleIngredientChange(i, 'quantityGrams', Number(e.target.value))
                  }
                  className="w-20 px-2 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs font-mono"
                />
                <select
                  value={ing.category}
                  onChange={(e) => handleIngredientChange(i, 'category', e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-zinc-300 text-xs"
                >
                  <option value="pulses">Pulses / Soya</option>
                  <option value="grains">Grains</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="meat">Eggs / Meat</option>
                  <option value="seafood">Fish</option>
                  <option value="spices">Spices</option>
                  <option value="oils">Oils</option>
                  <option value="fruits">Fruits / Nuts</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(i)}
                  className="text-zinc-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-zinc-400">Cooking Steps</label>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="flex items-center gap-1 text-[11px] text-[#22c55e] hover:text-[#4ade80] font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-2">
            {instructions.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500 w-4">{i + 1}.</span>
                <input
                  type="text"
                  placeholder={`Step ${i + 1}`}
                  value={step}
                  onChange={(e) => handleInstructionChange(i, e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#161A24] border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(i)}
                  className="text-zinc-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
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
            {recipe ? 'Save Changes' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
