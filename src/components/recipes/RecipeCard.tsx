import React from 'react';
import { Recipe } from '../../types';
import { Clock, Dumbbell, Flame, Utensils, Edit3, Trash2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#12141C] border border-white/5 hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Dish Photo with Protein Tag */}
        <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => onView(recipe)}>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />

          {/* Meal Type Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
              {recipe.mealType}
            </span>
          </div>

          {/* Protein Tag */}
          <div className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded-lg bg-emerald-500 text-black font-extrabold text-xs font-mono shadow-sm flex items-center gap-1">
            <Dumbbell className="w-3 h-3" />
            <span>{recipe.nutrition.protein}g</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2">
          <h3
            onClick={() => onView(recipe)}
            className="text-base font-semibold text-white group-hover:text-emerald-400 cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {recipe.name}
          </h3>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              {recipe.prepTime}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              {recipe.nutrition.calories} kcal
            </span>
          </div>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {recipe.instructions?.[0] || 'Dairy-free, nutrient-dense recipe for muscle hypertrophy.'}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-white/5">
        <button
          onClick={() => onView(recipe)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/15 text-zinc-300 hover:text-emerald-400 text-xs font-medium transition-colors"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>View Recipe</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(recipe)}
            title="Edit Recipe"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            title="Delete Recipe"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
