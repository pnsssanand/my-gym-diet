import React from 'react';
import { Recipe } from '../../types';
import { Modal } from '../common/Modal';
import {
  Clock,
  Dumbbell,
  Flame,
  Wheat,
  Sparkles,
  ShieldAlert,
  Edit3,
  Trash2,
  CheckCircle2,
  Utensils,
  BookOpen,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (recipeId: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!recipe) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Hero Header with Food Image & Badges */}
        <div className="relative h-64 sm:h-72 -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151D] via-transparent to-black/40" />

          {/* Action buttons (Edit & Delete) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(recipe);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-white/20 text-white backdrop-blur-md text-xs font-semibold border border-white/10 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#22c55e]" /> Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  onClose();
                  onDelete(recipe.id);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-rose-500/30 text-rose-300 backdrop-blur-md text-xs font-semibold border border-rose-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            )}
          </div>

          {/* Bottom Title & Tag Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#22c55e] text-black">
                {recipe.mealType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                100% Dairy-Free
              </span>
              {recipe.isVegetarian ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-md">
                  Vegetarian
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  High-Protein Non-Veg
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] drop-shadow-md">
              {recipe.name}
            </h2>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#161A24] border border-white/5 flex items-center gap-3">
            <Clock className="w-4 h-4 text-zinc-400" />
            <div>
              <div className="text-[10px] uppercase text-zinc-400 font-semibold">Prep / Cook Time</div>
              <div className="text-xs font-bold text-white font-mono">
                {recipe.prepTime} / {recipe.cookTime}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#161A24] border border-[#22c55e]/20 flex items-center gap-3">
            <Dumbbell className="w-4 h-4 text-[#22c55e]" />
            <div>
              <div className="text-[10px] uppercase text-zinc-400 font-semibold">Protein</div>
              <div className="text-xs font-bold text-[#22c55e] font-mono">
                {recipe.nutrition.protein}g / serving
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#161A24] border border-white/5 flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] uppercase text-zinc-400 font-semibold">Calories</div>
              <div className="text-xs font-bold text-amber-300 font-mono">
                {recipe.nutrition.calories} kcal
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#161A24] border border-white/5 flex items-center gap-3">
            <Wheat className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] uppercase text-zinc-400 font-semibold">Carbs / Fats</div>
              <div className="text-xs font-bold text-zinc-200 font-mono">
                {recipe.nutrition.carbs}g / {recipe.nutrition.fats}g
              </div>
            </div>
          </div>
        </div>

        {/* Complete Ingredients List with Exact Grams */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Utensils className="w-4 h-4 text-[#22c55e]" />
              Exact Ingredients ({recipe.servingSize})
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Digital Gram Precision</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((ing, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#161A24] border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span className="text-zinc-200 font-medium">{ing.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                    {ing.quantityGrams}g {ing.unit ? `(${ing.unit})` : ''}
                  </span>
                  {(ing.estimatedPriceGBP !== undefined || ing.estimatedPriceINR !== undefined) && (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      £{(ing.estimatedPriceGBP !== undefined ? ing.estimatedPriceGBP : (ing.estimatedPriceINR ? ing.estimatedPriceINR * 0.015 : 0)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Cooking Instructions */}
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3 font-['Outfit']">
            <BookOpen className="w-4 h-4 text-[#22c55e]" />
            Step-by-Step Cooking Instructions
          </h3>
          <div className="space-y-3">
            {recipe.instructions.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161A24] border border-white/5"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#22c55e]/15 text-[#22c55e] font-bold text-xs shrink-0 font-mono">
                  {idx + 1}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature & Timing */}
        {recipe.temperatureTime && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
            <span className="font-bold text-amber-300">Cooking Temperature & Timing:</span>{' '}
            <span className="text-zinc-300">{recipe.temperatureTime}</span>
          </div>
        )}

        {/* Kitchen Equipment */}
        {recipe.equipment && recipe.equipment.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Kitchen Equipment Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-[#161A24] text-xs text-zinc-300 border border-white/5"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preparation Tips & Storage & Dairy-Free Substitutions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Prep Tips */}
          {recipe.preparationTips && (
            <div className="p-4 rounded-2xl bg-[#161A24] border border-white/5">
              <h4 className="text-xs font-bold uppercase text-[#22c55e] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Chef & Macro Tips
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                {recipe.preparationTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dairy-Free Substitution */}
          <div className="p-4 rounded-2xl bg-[#161A24] border border-emerald-500/20">
            <h4 className="text-xs font-bold uppercase text-emerald-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Dairy-Free Substitutions
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {recipe.substitutionOptions?.join(' ') ||
                'Strictly zero dairy. Substitute with firm tofu, scrambled egg whites, or soya granules.'}
            </p>
            {recipe.storageInstructions && (
              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                <span className="font-semibold text-zinc-400">Storage:</span> {recipe.storageInstructions}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
