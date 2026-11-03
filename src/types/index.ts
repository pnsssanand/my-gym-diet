export type MealType = 'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner' | 'bedtimeSnack';

export interface Ingredient {
  name: string;
  quantityGrams: number;
  unit?: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'meat' | 'seafood' | 'spices' | 'oils' | 'other';
  notes?: string;
  estimatedPriceGBP?: number;
  estimatedPriceINR?: number;
}

export interface Meal {
  id: string;
  dayNumber: number; // 1 to 30
  mealType: MealType;
  title: string;
  time: string; // e.g. "08:00 AM"
  recipeId: string;
  prepTime: string; // e.g. "10 mins"
  cookTime: string; // e.g. "15 mins"
  portionSize: string; // e.g. "1 bowl (350g)"
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  fiber: number; // grams
  completed: boolean;
  ingredients: Ingredient[];
  instructions?: string[];
  image: string;
  isVegetarian: boolean;
  notes?: string;
}

export interface DailyDietPlan {
  day: number;
  dayName: string;
  theme: string;
  meals: Meal[];
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
  totalFiber: number;
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  prepTime: string;
  cookTime: string;
  servingSize: string;
  ingredients: Ingredient[];
  equipment: string[];
  instructions: string[];
  temperatureTime?: string;
  nutrition: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    calories: number;
  };
  preparationTips: string[];
  storageInstructions: string;
  substitutionOptions: string[];
  image: string;
  tags: string[];
  isVegetarian: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  photoURL?: string;
  age: number;
  weight: number; // in kg (e.g. 61)
  height: string; // e.g. "5'7\" (170 cm)"
  heightCm: number;
  dailyProteinTarget: number; // grams (default 120)
  dailyCarbsTarget: number;
  dailyFatsTarget: number;
  dailyCaloriesTarget: number;
  dietaryRestriction: string; // STRICTLY NO MILK OR DAIRY PRODUCTS
  fitnessGoal: string;
  dailyWaterTargetMl: number; // default calculated ~ 2440 ml
  createdAt?: string;
  updatedAt?: string;
}

export interface MonthlyGroceryItem {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'meat' | 'seafood' | 'spices' | 'oils' | 'other';
  totalGrams: number;
  displayQuantity: string;
  estimatedPriceGBP: number;
  estimatedPriceINR?: number;
  purchased: boolean;
}

export interface BringFromIndiaItem {
  id: string;
  name: string;
  quantity: string;
  notes: string;
  image?: string;
  purchased: boolean;
  createdAt: string;
}

export interface PersonalShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  priority: 'high' | 'medium' | 'low';
  notes: string;
  completed: boolean;
  createdAt: string;
}

export interface WaterLogEntry {
  id: string;
  time: string;
  amountMl: number;
}

export interface DailyWaterRecord {
  date: string; // YYYY-MM-DD
  totalMl: number;
  targetMl: number;
  entries: WaterLogEntry[];
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: 'Diet' | 'Workout' | 'Grocery' | 'Ideas' | 'General';
  pinned: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoItem {
  id: string;
  title: string;
  category: 'Gym' | 'Diet' | 'Grocery' | 'Personal' | 'Other';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
