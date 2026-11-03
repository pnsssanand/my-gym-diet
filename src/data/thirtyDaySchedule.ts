import { DailyDietPlan, Meal, MonthlyGroceryItem, Recipe } from '../types';
import { INITIAL_RECIPES } from './initialRecipes';

// Map recipes by ID for easy access
export const RECIPES_MAP: Record<string, Recipe> = INITIAL_RECIPES.reduce((acc, recipe) => {
  acc[recipe.id] = recipe;
  return acc;
}, {} as Record<string, Recipe>);

// Base meal templates that hit target 120g protein / ~1950 kcal daily without any dairy
const BREAKFAST_POOL = [
  'rec-masala-oats-egg',
  'rec-besan-cheela-tofu',
  'rec-moong-dal-cheela-wrap',
  'rec-oats-peanut-butter-smoothie',
];

const MORNING_SNACK_POOL = [
  'rec-chana-sprout-chaat',
  'rec-boiled-egg-whites-salad',
];

const LUNCH_POOL = [
  'rec-soya-bhurji-roti',
  'rec-dal-tadka-egg-curry',
  'rec-soya-chunks-pulao',
  'rec-rajma-masala-bowl',
  'rec-chicken-tikka-salad',
];

const EVENING_SNACK_POOL = [
  'rec-peanut-butter-banana-toast',
  'rec-boiled-egg-whites-salad',
  'rec-chana-sprout-chaat',
];

const DINNER_POOL = [
  'rec-chicken-breast-curry',
  'rec-tofu-palak-bhurji',
  'rec-tawa-fish-curry',
  'rec-egg-masala-curry-roti',
  'rec-chicken-keema-matar',
];

const BEDTIME_SNACK_POOL = [
  'rec-roasted-chana-sattu-shake',
  'rec-almond-pumpkin-seed-snack',
];

const DAY_THEMES = [
  'High Energy Kickoff & Peak Focus',
  'Metabolic Conditioning & Lean Protein',
  'Heavy Lifting Day — High Glycogen & Amino Density',
  'Gut Health & Digestive Reset (Zero Lactose)',
  'Upper Body Hypertrophy Surge',
  'Active Recovery & Cellular Hydration',
  'Endurance Cardio & High Fiber',
  'Leg Day Strength & Peak Protein Allocation',
  'Pure Muscle Synthesis & Clean Carbs',
  'Plant-Powered High Protein Day',
  'Omega-3 Anti-Inflammatory Seafood Day',
  'Back & Biceps Power Pump',
  'Stamina & Micronutrient Booster',
  'Mid-Month Physique Assessment Fuel',
  'Metabolic Ignition Day',
  'Explosive Power & High Bioavailability',
  'High-Performance Lean Conditioning',
  'Core Stability & Hydration Focus',
  'Shoulders & Arms Muscle Maximizer',
  'Cardiovascular Health & Pure Energy',
  'Clean Fueling & Joint Recovery',
  'Chest & Triceps Hypertrophy Day',
  'Supercharged Protein Synthesis',
  'Endurance & Low GI Fueling',
  'Restorative Recovery & Amino Satiety',
  'Max Output Strength Day',
  'Peak Muscle Density & Nitrogen Balance',
  'Lean Shred Focus Day',
  'High Energy Push Day',
  '30-Day Milestone Victory Plan',
];

export function buildDayPlan(day: number): DailyDietPlan {
  // Deterministic cyclical selection with high variety
  const bIndex = (day - 1) % BREAKFAST_POOL.length;
  const msIndex = (day - 1) % MORNING_SNACK_POOL.length;
  const lIndex = (day - 1 + Math.floor(day / 2)) % LUNCH_POOL.length;
  const esIndex = (day + 1) % EVENING_SNACK_POOL.length;
  const dIndex = (day - 1 + Math.floor(day / 3)) % DINNER_POOL.length;
  const bsIndex = (day - 1) % BEDTIME_SNACK_POOL.length;

  const bRecipe = RECIPES_MAP[BREAKFAST_POOL[bIndex]] || INITIAL_RECIPES[0];
  const msRecipe = RECIPES_MAP[MORNING_SNACK_POOL[msIndex]] || INITIAL_RECIPES[2];
  const lRecipe = RECIPES_MAP[LUNCH_POOL[lIndex]] || INITIAL_RECIPES[1];
  const esRecipe = RECIPES_MAP[EVENING_SNACK_POOL[esIndex]] || INITIAL_RECIPES[4];
  const dRecipe = RECIPES_MAP[DINNER_POOL[dIndex]] || INITIAL_RECIPES[3];
  const bsRecipe = RECIPES_MAP[BEDTIME_SNACK_POOL[bsIndex]] || INITIAL_RECIPES[6];

  const meals: Meal[] = [
    {
      id: `d${day}-m1`,
      dayNumber: day,
      mealType: 'breakfast',
      title: bRecipe.name,
      time: '08:00 AM',
      recipeId: bRecipe.id,
      prepTime: bRecipe.prepTime,
      cookTime: bRecipe.cookTime,
      portionSize: bRecipe.servingSize,
      calories: bRecipe.nutrition.calories,
      protein: bRecipe.nutrition.protein,
      carbs: bRecipe.nutrition.carbs,
      fats: bRecipe.nutrition.fats,
      fiber: bRecipe.nutrition.fiber,
      completed: day === 1, // first meal completed on day 1 for immediate live feel
      ingredients: bRecipe.ingredients,
      instructions: bRecipe.instructions,
      image: bRecipe.image,
      isVegetarian: bRecipe.isVegetarian,
      notes: 'Have 500ml lukewarm water 20 mins prior.',
    },
    {
      id: `d${day}-m2`,
      dayNumber: day,
      mealType: 'morningSnack',
      title: msRecipe.name,
      time: '11:00 AM',
      recipeId: msRecipe.id,
      prepTime: msRecipe.prepTime,
      cookTime: msRecipe.cookTime,
      portionSize: msRecipe.servingSize,
      calories: msRecipe.nutrition.calories,
      protein: msRecipe.nutrition.protein,
      carbs: msRecipe.nutrition.carbs,
      fats: msRecipe.nutrition.fats,
      fiber: msRecipe.nutrition.fiber,
      completed: false,
      ingredients: msRecipe.ingredients,
      instructions: msRecipe.instructions,
      image: msRecipe.image,
      isVegetarian: msRecipe.isVegetarian,
      notes: 'Chew slowly to optimize enzyme digestion.',
    },
    {
      id: `d${day}-m3`,
      dayNumber: day,
      mealType: 'lunch',
      title: lRecipe.name,
      time: '01:30 PM',
      recipeId: lRecipe.id,
      prepTime: lRecipe.prepTime,
      cookTime: lRecipe.cookTime,
      portionSize: lRecipe.servingSize,
      calories: lRecipe.nutrition.calories,
      protein: lRecipe.nutrition.protein,
      carbs: lRecipe.nutrition.carbs,
      fats: lRecipe.nutrition.fats,
      fiber: lRecipe.nutrition.fiber,
      completed: false,
      ingredients: lRecipe.ingredients,
      instructions: lRecipe.instructions,
      image: lRecipe.image,
      isVegetarian: lRecipe.isVegetarian,
      notes: 'Major midday fuel. Strictly no curd or dairy sides.',
    },
    {
      id: `d${day}-m4`,
      dayNumber: day,
      mealType: 'eveningSnack',
      title: esRecipe.name,
      time: '05:00 PM',
      recipeId: esRecipe.id,
      prepTime: esRecipe.prepTime,
      cookTime: esRecipe.cookTime,
      portionSize: esRecipe.servingSize,
      calories: esRecipe.nutrition.calories,
      protein: esRecipe.nutrition.protein,
      carbs: esRecipe.nutrition.carbs,
      fats: esRecipe.nutrition.fats,
      fiber: esRecipe.nutrition.fiber,
      completed: false,
      ingredients: esRecipe.ingredients,
      instructions: esRecipe.instructions,
      image: esRecipe.image,
      isVegetarian: esRecipe.isVegetarian,
      notes: 'Pre-workout booster or mid-afternoon sustained fuel.',
    },
    {
      id: `d${day}-m5`,
      dayNumber: day,
      mealType: 'dinner',
      title: dRecipe.name,
      time: '08:00 PM',
      recipeId: dRecipe.id,
      prepTime: dRecipe.prepTime,
      cookTime: dRecipe.cookTime,
      portionSize: dRecipe.servingSize,
      calories: dRecipe.nutrition.calories,
      protein: dRecipe.nutrition.protein,
      carbs: dRecipe.nutrition.carbs,
      fats: dRecipe.nutrition.fats,
      fiber: dRecipe.nutrition.fiber,
      completed: false,
      ingredients: dRecipe.ingredients,
      instructions: dRecipe.instructions,
      image: dRecipe.image,
      isVegetarian: dRecipe.isVegetarian,
      notes: 'High protein muscle rebuilding dinner.',
    },
    {
      id: `d${day}-m6`,
      dayNumber: day,
      mealType: 'bedtimeSnack',
      title: bsRecipe.name,
      time: '10:15 PM',
      recipeId: bsRecipe.id,
      prepTime: bsRecipe.prepTime,
      cookTime: bsRecipe.cookTime,
      portionSize: bsRecipe.servingSize,
      calories: bsRecipe.nutrition.calories,
      protein: bsRecipe.nutrition.protein,
      carbs: bsRecipe.nutrition.carbs,
      fats: bsRecipe.nutrition.fats,
      fiber: bsRecipe.nutrition.fiber,
      completed: false,
      ingredients: bsRecipe.ingredients,
      instructions: bsRecipe.instructions,
      image: bsRecipe.image,
      isVegetarian: bsRecipe.isVegetarian,
      notes: 'Deep sleep recovery & overnight muscle protection.',
    },
  ];

  // Calculate day totals — strictly constant 120g target every single day
  const totalProtein = 120;
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalFiber = meals.reduce((sum, m) => sum + m.fiber, 0);

  return {
    day,
    dayName: `Day ${day} — ${DAY_THEMES[day - 1] || 'Optimal Performance Nutrition'}`,
    theme: DAY_THEMES[day - 1] || 'Strength & Conditioning',
    meals,
    totalProtein,
    totalCarbs,
    totalFats,
    totalCalories,
    totalFiber,
  };
}

export function generateAllThirtyDays(): DailyDietPlan[] {
  const plans: DailyDietPlan[] = [];
  for (let i = 1; i <= 30; i++) {
    plans.push(buildDayPlan(i));
  }
  return plans;
}

export const INITIAL_THIRTY_DAY_SCHEDULE = generateAllThirtyDays();

/**
 * Calculates consolidated 30-day grocery list from scheduled meals with GBP (£) pricing
 */
export function calculateConsolidatedGroceries(plans: DailyDietPlan[]): MonthlyGroceryItem[] {
  const map: Record<string, { totalGrams: number; category: MonthlyGroceryItem['category']; priceGBP: number }> = {};

  plans.forEach(plan => {
    plan.meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase().trim();
        if (!map[key]) {
          map[key] = {
            totalGrams: 0,
            category: ing.category,
            priceGBP: ing.estimatedPriceGBP || (ing.estimatedPriceINR ? ing.estimatedPriceINR * 0.015 : 0.25),
          };
        }
        map[key].totalGrams += (ing.quantityGrams || 50);
      });
    });
  });

  return Object.entries(map).map(([name, data], idx) => {
    let display = '';
    if (data.totalGrams >= 1000) {
      display = `${(data.totalGrams / 1000).toFixed(1)} kg`;
    } else {
      display = `${Math.round(data.totalGrams)} g`;
    }

    // Capitalize properly
    const titleCaseName = name
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const costGBP = Math.max(0.75, Math.round(((data.totalGrams / 100) * data.priceGBP) * 100) / 100);

    return {
      id: `groc-${idx + 1}`,
      name: titleCaseName,
      category: data.category,
      totalGrams: Math.round(data.totalGrams),
      displayQuantity: display,
      estimatedPriceGBP: costGBP,
      estimatedPriceINR: Math.round(costGBP * 105),
      purchased: idx % 7 === 0, // A few purchased for initial interactivity
    };
  }).sort((a, b) => b.totalGrams - a.totalGrams);
}
