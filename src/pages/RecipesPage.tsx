import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RecipeDetailModal } from '../components/recipes/RecipeDetailModal';
import { RecipeEditModal } from '../components/recipes/RecipeEditModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { Recipe } from '../types';
import { Plus, Search } from 'lucide-react';

export const RecipesPage: React.FC = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useDiet();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState<string | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(search.toLowerCase())) ||
      recipe.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesType = filterType === 'all' || recipe.mealType === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenDetail = (recipe: Recipe) => {
    setViewingRecipe(recipe);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const handleDeletePrompt = (recipeId: string) => {
    setDeletingRecipeId(recipeId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingRecipeId) {
      deleteRecipe(deletingRecipeId);
      setDeletingRecipeId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">
            Recipes ({recipes.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Dairy-free, high-protein Indian recipes with exact gram precision.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingRecipe(null);
            setIsEditModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Recipe</span>
        </button>
      </div>

      {/* Clean Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12141C] border border-white/5 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'morningSnack', label: 'Snacks' },
            { id: 'lunch', label: 'Lunch' },
            { id: 'dinner', label: 'Dinner' },
            { id: 'bedtimeSnack', label: 'Bedtime' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12141C] border border-white/5">
          <p className="text-zinc-400 text-xs">No recipes found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
              onDelete={handleDeletePrompt}
            />
          ))}
        </div>
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={viewingRecipe}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleOpenEdit}
        onDelete={handleDeletePrompt}
      />

      {/* Recipe Add / Edit Modal */}
      <RecipeEditModal
        recipe={editingRecipe}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(saved) => {
          if (editingRecipe) {
            updateRecipe(saved);
          } else {
            addRecipe(saved);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Recipe?"
        message="Are you sure you want to remove this recipe from your personal library?"
        confirmText="Delete Recipe"
      />
    </div>
  );
};
