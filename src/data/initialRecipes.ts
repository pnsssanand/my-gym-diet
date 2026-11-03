import { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-masala-oats-egg',
    name: 'Desi Masala Oats with Boiled Eggs',
    mealType: 'breakfast',
    prepTime: '8 mins',
    cookTime: '12 mins',
    servingSize: '1 large bowl (380g)',
    ingredients: [
      { name: 'Rolled Oats', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.25, estimatedPriceINR: 15 },
      { name: 'Whole Egg', quantityGrams: 55, unit: '1 whole', category: 'meat', estimatedPriceGBP: 0.25, estimatedPriceINR: 7 },
      { name: 'Egg Whites', quantityGrams: 100, unit: '3 whites', category: 'meat', estimatedPriceGBP: 0.6, estimatedPriceINR: 21 },
      { name: 'Onion (finely chopped)', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Tomato (diced)', quantityGrams: 50, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Green Chili & Coriander', quantityGrams: 10, category: 'vegetables', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
      { name: 'Mustard Oil / Olive Oil', quantityGrams: 5, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Turmeric, Cumin & Garam Masala', quantityGrams: 4, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Medium saucepan', 'Egg boiling pot', 'Chef knife', 'Stirring spatula'],
    instructions: [
      'Boil 1 whole egg and 3 additional eggs in a pot of water with a pinch of salt for 9 minutes for firm hard-boiled texture. Cool, peel, separate 3 whites, and set whole egg and whites aside.',
      'Heat 5g mustard oil in a saucepan. Crackle cumin seeds and add chopped green chilies and onions. Sauté until translucent.',
      'Add diced tomatoes, turmeric, salt, and garam masala. Sauté for 2 minutes until tomatoes soften into a fragrant masala base.',
      'Add 50g rolled oats and 250ml water. Simmer on medium heat for 4-5 minutes, stirring occasionally until thick and savory.',
      'Pour masala oats into a serving bowl. Top with sliced hard-boiled whole egg and 3 egg whites. Garnish with fresh chopped coriander and a dash of black pepper.'
    ],
    temperatureTime: 'Boil eggs at 100°C for 9 mins; simmer oats on medium heat (approx 90°C) for 5 mins',
    nutrition: {
      protein: 25,
      carbs: 38,
      fats: 9,
      fiber: 6,
      calories: 345,
    },
    preparationTips: [
      'Pre-boil your eggs the night before and store them unpeeled in the fridge to cut morning prep time to just 6 minutes.',
      'Never substitute water with milk to maintain strict dairy-free compliance.'
    ],
    storageInstructions: 'Best consumed hot immediately. Boiled eggs can be stored refrigerated for up to 3 days.',
    substitutionOptions: [
      'If strictly non-egg day, replace eggs with 80g pan-seared scrambled firm tofu seasoned with kala namak (black salt).'
    ],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    tags: ['High Protein', 'Dairy Free', 'Quick Breakfast', 'Indian Spiced'],
    isVegetarian: false,
  },
  {
    id: 'rec-soya-bhurji-roti',
    name: 'High-Protein Soya Bhurji with 2 Rotis',
    mealType: 'lunch',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servingSize: '1 bowl bhurji + 2 phulkas',
    ingredients: [
      { name: 'Soya Chunks / Granules (dry)', quantityGrams: 50, category: 'pulses', estimatedPriceGBP: 0.35, estimatedPriceINR: 12 },
      { name: 'Whole Wheat Atta (for 2 rotis)', quantityGrams: 60, category: 'grains', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Onion (chopped)', quantityGrams: 50, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Tomato (pureed or diced)', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Green Bell Pepper / Capsicum', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Mustard / Sunflower Oil (strictly no ghee)', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Ginger-Garlic Paste', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Indian Spices (Cumin, Coriander, Turmeric, Pav Bhaji Masala)', quantityGrams: 6, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Non-stick Kadhai / Pan', 'Rolling pin & board (Chakla Belan)', 'Tawa for phulkas', 'Deep mixing bowl'],
    instructions: [
      'Boil 50g soya granules in 400ml water with 1/2 tsp salt for 5 minutes. Drain thoroughly in a colander, rinse with cold water, and squeeze out all excess water firmly.',
      'Heat 6g oil in a pan. Add cumin seeds and ginger-garlic paste, sauté for 30 seconds until raw aroma dissipates.',
      'Add onions and diced capsicum. Cook on medium flame until golden brown (approx 4 minutes).',
      'Add tomatoes, turmeric, red chili powder, coriander powder, and 1 tsp pav bhaji masala. Cook until oil separates slightly.',
      'Toss in the squeezed soya granules. Mix vigorously so spices coat every granule evenly. Cover and cook on low heat for 5 minutes. Finish with coriander and lemon juice.',
      'Knead whole wheat atta with water (no oil or milk). Roll into 2 thin phulkas and roast on hot dry tawa until puffed. Serve without applying ghee or butter.'
    ],
    temperatureTime: 'Cook bhurji at medium flame (180°C), puff rotis on high heat directly over flame',
    nutrition: {
      protein: 35,
      carbs: 52,
      fats: 8,
      fiber: 14,
      calories: 420,
    },
    preparationTips: [
      'Squeezing the soya granules thoroughly is the key secret to eliminating the raw beany taste and absorbing the spicy tadka.',
      'Soya granules deliver a staggering 52% protein density naturally.'
    ],
    storageInstructions: 'Bhurji stays fresh in airtight glass container for 48 hours in the refrigerator.',
    substitutionOptions: [
      'Can substitute soya granules with 160g firm organic tofu crumbled with fingers.'
    ],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    tags: ['Ultra High Protein', '100% Vegan', 'Dairy Free', 'Affordable Fitness'],
    isVegetarian: true,
  },
  {
    id: 'rec-chana-sprout-chaat',
    name: 'Zesty Kala Chana & Sprouted Moong Chaat',
    mealType: 'morningSnack',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servingSize: '1 medium bowl (250g)',
    ingredients: [
      { name: 'Boiled Kala Chana (Black Chickpeas)', quantityGrams: 80, category: 'pulses', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: 'Sprouted Green Moong Beans', quantityGrams: 60, category: 'pulses', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: 'Cucumber (finely diced)', quantityGrams: 50, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Tomato (deseeded and diced)', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Roasted Cumin Powder & Chaat Masala', quantityGrams: 4, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
      { name: 'Fresh Lemon Juice', quantityGrams: 10, category: 'fruits', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Fresh Mint & Green Chilies', quantityGrams: 8, category: 'vegetables', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Large salad mixing bowl', 'Citrus squeezer', 'Vegetable chopper'],
    instructions: [
      'In a large mixing bowl, combine 80g boiled black chickpeas (soft yet holding shape) and 60g raw sprouted green moong beans.',
      'Add finely diced crisp cucumber, tomatoes, and chopped green chili.',
      'Season with freshly roasted cumin powder, black salt, and authentic tangy chaat masala.',
      'Squeeze half a fresh lemon generously over the mixture.',
      'Toss thoroughly with two spoons until the spices coat all legumes evenly. Garnish with chopped fresh mint leaves.'
    ],
    temperatureTime: 'Served chilled or room temperature',
    nutrition: {
      protein: 15,
      carbs: 34,
      fats: 2,
      fiber: 11,
      calories: 215,
    },
    preparationTips: [
      'Pressure cook a 500g batch of black chana on Sunday with salt and water. Portion them into airtight containers for easy snacks throughout the week.',
      'Sprouting increases bioavailability of vitamin C and makes digestion easier.'
    ],
    storageInstructions: 'Keep dry ingredients mixed; add lemon juice and salt only right before eating to prevent sogginess.',
    substitutionOptions: [
      'You can add 15g roasted peanuts for extra healthy fats and crunch.'
    ],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    tags: ['Digestive Fiber', 'Zero Dairy', 'Clean Energy', 'Vegetarian'],
    isVegetarian: true,
  },
  {
    id: 'rec-chicken-breast-curry',
    name: 'Homestyle Dairy-Free Chicken Breast Curry with Basmati Rice',
    mealType: 'dinner',
    prepTime: '12 mins',
    cookTime: '20 mins',
    servingSize: 'Curry + 150g cooked rice',
    ingredients: [
      { name: 'Boneless Skinless Chicken Breast', quantityGrams: 160, category: 'meat', estimatedPriceGBP: 1.5, estimatedPriceINR: 65 },
      { name: 'Basmati Rice (raw)', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: 'Onion (finely sliced)', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Tomato (blended into puree)', quantityGrams: 80, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Mustard / Cold-Pressed Sesame Oil', quantityGrams: 7, category: 'oils', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Ginger-Garlic-Chili Paste', quantityGrams: 12, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Garam Masala, Coriander, Kashmiri Chili Powder', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Coriander leaves', quantityGrams: 10, category: 'vegetables', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Heavy-bottom pressure cooker / deep pan', 'Rice pot', 'Cutting board'],
    instructions: [
      'Dice 160g chicken breast into bite-sized 1-inch cubes. Marinate with 1/2 tsp turmeric, 1 tsp lemon juice, salt, and ginger-garlic paste for 10 minutes.',
      'In a deep pan, heat 7g mustard oil. Add whole spices (1 bay leaf, 2 cloves, 1 green cardamom) and sliced onions. Brown onions over medium heat for 6-7 minutes.',
      'Pour in the blended tomato puree, Kashmiri chili powder, coriander powder, and salt. Sauté until tomato moisture reduces and aroma develops (no dairy or cream used).',
      'Add marinated chicken cubes. Sear on high heat for 3 minutes to lock in juices.',
      'Add 150ml warm water, cover with lid, and simmer on gentle heat for 10-12 minutes until chicken is tender and succulent.',
      'Simultaneously boil 50g basmati rice in salted water until fluffy. Drain starch.',
      'Sprinkle garam masala and chopped fresh coriander over the hot curry. Serve alongside steamed fragrant basmati rice.'
    ],
    temperatureTime: 'Sear chicken on high (200°C), then simmer at 95°C for 12 minutes',
    nutrition: {
      protein: 22,
      carbs: 45,
      fats: 9,
      fiber: 4,
      calories: 415,
    },
    preparationTips: [
      'Do not overcook breast pieces; chicken breast turns dry if boiled beyond 12-14 minutes on low heat.',
      'Using tomato and onion reduction creates natural thick gravy without needing any heavy cream, curd, or cashew paste.'
    ],
    storageInstructions: 'Curry tastes even richer the next day as spices penetrate. Store in glass container up to 3 days.',
    substitutionOptions: [
      'Fish lovers can substitute with 170g white fish fillets (cook for only 6 minutes).',
      'Vegetarians can substitute with 150g firm tofu cubes or 55g dry soya chunks.'
    ],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80',
    tags: ['38g Protein', 'Lean Muscle', 'Dairy Free', 'Authentic Indian'],
    isVegetarian: false,
  },
  {
    id: 'rec-peanut-butter-banana-toast',
    name: 'Whole Grain Toast with 100% Natural Peanut Butter',
    mealType: 'eveningSnack',
    prepTime: '4 mins',
    cookTime: '2 mins',
    servingSize: '2 toasts',
    ingredients: [
      { name: '100% Whole Wheat Bread (Dairy-Free)', quantityGrams: 60, unit: '2 slices', category: 'grains', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: '100% Roasted Natural Peanut Butter (Unsweetened)', quantityGrams: 32, unit: '2 tbsp', category: 'pulses', estimatedPriceGBP: 0.45, estimatedPriceINR: 18 },
      { name: 'Banana (thinly sliced)', quantityGrams: 60, category: 'fruits', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Chia Seeds', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Cinnamon Powder', quantityGrams: 2, category: 'spices', estimatedPriceGBP: 0.05, estimatedPriceINR: 1 },
    ],
    equipment: ['Bread toaster or dry skillet'],
    instructions: [
      'Toast 2 slices of whole wheat bread until crisp and golden brown.',
      'Evenly spread 16g of pure 100% roasted peanut butter (only roasted peanuts, zero milk solids, zero hydrogenated oil) over each warm slice.',
      'Arrange freshly sliced banana rounds evenly on top.',
      'Sprinkle raw chia seeds and a pinch of ground cinnamon for antioxidant boost and blood sugar stabilization.'
    ],
    temperatureTime: 'Toast at medium setting (approx 160°C) for 2 minutes',
    nutrition: {
      protein: 15,
      carbs: 46,
      fats: 16,
      fiber: 8,
      calories: 380,
    },
    preparationTips: [
      'Always inspect the bread ingredient list to ensure no milk solids or whey powder are added by commercial bakeries.',
      'Single-ingredient peanut butter (100% peanuts) has zero added sugars or palm oil.'
    ],
    storageInstructions: 'Assemble and eat immediately while toast is warm and crisp.',
    substitutionOptions: [
      'Substitute peanut butter with roasted almond butter or sunflower seed butter if allergic to peanuts.'
    ],
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=700&q=80',
    tags: ['Pre-Workout Energy', 'Healthy Fats', '100% Plant Based', 'Dairy Free'],
    isVegetarian: true,
  },
  {
    id: 'rec-tofu-palak-bhurji',
    name: 'Scrambled Palak Tofu with 2 Whole Wheat Phulkas',
    mealType: 'dinner',
    prepTime: '10 mins',
    cookTime: '12 mins',
    servingSize: '1 bowl palak tofu + 2 phulkas',
    ingredients: [
      { name: 'Firm Organic Tofu', quantityGrams: 160, category: 'pulses', estimatedPriceGBP: 0.8, estimatedPriceINR: 40 },
      { name: 'Fresh Spinach / Palak (washed & chopped)', quantityGrams: 120, category: 'vegetables', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Whole Wheat Flour', quantityGrams: 60, category: 'grains', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Onion & Garlic', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Olive / Mustard Oil', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Turmeric, Cumin, Garam Masala', quantityGrams: 5, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
    ],
    equipment: ['Non-stick skillet', 'Tawa', 'Chef knife'],
    instructions: [
      'Press 160g firm tofu in a kitchen towel to remove surface moisture, then crumble coarsely using your hands.',
      'Wash fresh spinach thoroughly and finely shred with a chef knife.',
      'Heat 6g oil in a skillet. Splutter cumin seeds and add finely minced garlic and chopped onion. Sauté until fragrant and light brown.',
      'Add the shredded spinach and cook for 3 minutes until wilted down.',
      'Add turmeric, red chili powder, coriander powder, and crumbled tofu. Stir-fry briskly on high flame for 4 minutes so the tofu absorbs the garlic-spinach flavors.',
      'Serve hot alongside 2 fresh whole wheat phulkas without ghee.'
    ],
    temperatureTime: 'Stir fry on medium-high (190°C) for 6 minutes',
    nutrition: {
      protein: 22,
      carbs: 48,
      fats: 11,
      fiber: 9,
      calories: 395,
    },
    preparationTips: [
      'This dish gives the beloved comfort of Palak Paneer without a single drop of dairy, with higher iron and fewer saturated fats.',
      'Add a pinch of nutritional yeast or black salt for an extra umami depth.'
    ],
    storageInstructions: 'Refrigerate in a covered container for up to 48 hours.',
    substitutionOptions: [
      'Can be made with 140g boiled shredded chicken breast instead of tofu for non-vegetarian days.'
    ],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    tags: ['Dairy-Free Palak Paneer Alternative', 'Iron Rich', 'Vegan Protein'],
    isVegetarian: true,
  },
  {
    id: 'rec-roasted-chana-sattu-shake',
    name: 'Bihari Chana Sattu Lemon Mint Power Drink',
    mealType: 'bedtimeSnack',
    prepTime: '3 mins',
    cookTime: '0 mins',
    servingSize: '1 tall glass (350ml)',
    ingredients: [
      { name: 'Pure Roasted Chana Sattu (Gram Flour)', quantityGrams: 40, category: 'pulses', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: 'Chilled Filtered Water', quantityGrams: 300, unit: '300ml', category: 'other', estimatedPriceGBP: 0.08, estimatedPriceINR: 0 },
      { name: 'Roasted Cumin Powder (Bhuna Jeera)', quantityGrams: 3, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
      { name: 'Kala Namak (Black Salt)', quantityGrams: 2, category: 'spices', estimatedPriceGBP: 0.05, estimatedPriceINR: 1 },
      { name: 'Fresh Lemon Juice', quantityGrams: 10, category: 'fruits', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Fresh Mint Leaves (crushed)', quantityGrams: 5, category: 'vegetables', estimatedPriceGBP: 0.05, estimatedPriceINR: 1 },
    ],
    equipment: ['Cocktail shaker or tall glass with whisk / spoon'],
    instructions: [
      'Add 40g roasted chana sattu powder into a shaker or deep mug.',
      'Pour 100ml water first and whisk thoroughly to create a lump-free smooth paste.',
      'Pour in the remaining 200ml chilled water while stirring continuously.',
      'Add roasted cumin powder, black salt, freshly squeezed lemon juice, and crushed mint.',
      'Stir vigorously and serve chilled. An ancient, natural, 100% dairy-free protein drink that cools the stomach.'
    ],
    temperatureTime: 'Served chilled (4°C - 8°C)',
    nutrition: {
      protein: 8,
      carbs: 26,
      fats: 2.5,
      fiber: 6.5,
      calories: 170,
    },
    preparationTips: [
      'Referred to as the "Original Indian Whey", roasted chana sattu provides clean plant protein and gentle nocturnal digestion.',
      'Ensure you buy pure 100% chana sattu without added barley or fillers.'
    ],
    storageInstructions: 'Drink immediately after preparation so the sattu does not settle at the bottom.',
    substitutionOptions: [
      'Can be made warm in winter with a pinch of black pepper and ginger.'
    ],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    tags: ['Digestive Cooling', 'Traditional Sattu', 'Zero Lactose', 'Bedtime Fuel'],
    isVegetarian: true,
  },
  {
    id: 'rec-dal-tadka-egg-curry',
    name: 'Yellow Moong Dal Tadka with 2 Boiled Eggs & Jeera Rice',
    mealType: 'lunch',
    prepTime: '10 mins',
    cookTime: '18 mins',
    servingSize: '1 bowl dal + 2 eggs + 130g rice',
    ingredients: [
      { name: 'Yellow Moong Dal (dry)', quantityGrams: 50, category: 'pulses', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Eggs (Whole)', quantityGrams: 110, unit: '2 eggs', category: 'meat', estimatedPriceGBP: 0.35, estimatedPriceINR: 14 },
      { name: 'White / Brown Basmati Rice (raw)', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Mustard / Sunflower Oil (strictly no ghee)', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Garlic & Cumin Seeds (Jeera)', quantityGrams: 10, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Tomato & Onion', quantityGrams: 70, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Turmeric, Hing (Asafoetida) & Salt', quantityGrams: 4, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Pressure cooker', 'Tadka pan', 'Saucepan'],
    instructions: [
      'Rinse 50g yellow moong dal. Pressure cook with 200ml water, 1/2 tsp turmeric, and salt for 3 whistles until soft and creamy.',
      'Boil 2 whole eggs in water for 9 minutes. Cool, peel, and cut into halves.',
      'Cook 50g basmati rice with cumin seeds in water until tender.',
      'In a tadka pan, heat 6g vegetable oil (zero ghee). Add cumin seeds, a pinch of hing, crushed garlic, and sliced green chilies. Fry until garlic turns golden brown.',
      'Pour sizzling garlic tadka directly into the cooked dal. Cover immediately with a lid to trap the smoky aromatics.',
      'Serve hot dal poured over jeera rice with the boiled egg halves seasoned with black pepper.'
    ],
    temperatureTime: 'Pressure cook dal at high; sizzle tadka at 180°C for 2 mins',
    nutrition: {
      protein: 35,
      carbs: 58,
      fats: 12,
      fiber: 8,
      calories: 450,
    },
    preparationTips: [
      'Moong dal is the easiest legume to digest and does not cause bloating.',
      'The aromatic garlic tadka in oil gives authentic dhaba flavor without needing butter or ghee.'
    ],
    storageInstructions: 'Dal thickens over time; simply add 50ml warm water when reheating.',
    substitutionOptions: [
      'Vegetarian alternative: Replace the 2 eggs with 75g pan-roasted tofu seasoned with chaat masala.'
    ],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
    tags: ['Complete Amino Acid Profile', 'Dhaba Style', 'Dairy Free Tadka'],
    isVegetarian: false,
  },
  {
    id: 'rec-soya-chunks-pulao',
    name: 'High-Protein Soya Chunks & Peas Brown Rice Pulao',
    mealType: 'lunch',
    prepTime: '12 mins',
    cookTime: '20 mins',
    servingSize: '1 large bowl (380g)',
    ingredients: [
      { name: 'Soya Chunks (dry big chunks)', quantityGrams: 45, category: 'pulses', estimatedPriceGBP: 0.22, estimatedPriceINR: 11 },
      { name: 'Brown Rice / Long Grain Rice (raw)', quantityGrams: 55, category: 'grains', estimatedPriceGBP: 0.25, estimatedPriceINR: 10 },
      { name: 'Green Peas (fresh or frozen)', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Sliced Onions & Carrots', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Whole Biryani Spices (Bay leaf, Cloves, Star Anise)', quantityGrams: 4, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Mustard Oil / Refined Oil', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Mint & Coriander leaves', quantityGrams: 10, category: 'vegetables', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Pressure cooker or rice cooker', 'Strainer', 'Cutting board'],
    instructions: [
      'Soak 45g soya chunks in hot salted water for 10 minutes. Squeeze out excess water firmly.',
      'Heat 6g oil in a pressure cooker. Add whole spices and sliced onions. Sauté until onions are caramelised.',
      'Toss in squeezed soya chunks, green peas, diced carrots, ginger paste, and mint. Sauté for 3 minutes.',
      'Add 55g washed brown rice and 150ml water. Season with salt and garam masala.',
      'Close cooker lid and cook for 3 whistles on medium flame (or 1 whistle if using soaked white basmati).',
      'Let steam release naturally. Fluff gently with a fork and serve with onion-cucumber tomato salad with lemon.'
    ],
    temperatureTime: 'Cook under pressure for 15 minutes',
    nutrition: {
      protein: 35,
      carbs: 62,
      fats: 6,
      fiber: 12,
      calories: 410,
    },
    preparationTips: [
      'Brown rice provides low GI sustained energy and high fiber.',
      'Soya chunks soak up all the whole spice aromas like miniature sponges.'
    ],
    storageInstructions: 'Keeps well for meal prepping up to 3 days in the fridge.',
    substitutionOptions: [
      'Can add 100g diced chicken breast for a combined poultry-soya macro powerhouse.'
    ],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    tags: ['Meal Prep King', 'High Fiber', 'Vegan Beast', 'Dairy Free'],
    isVegetarian: true,
  },
  {
    id: 'rec-tawa-fish-curry',
    name: 'Spicy Pan-Seared Tilapia Fish Masala with Rice',
    mealType: 'dinner',
    prepTime: '10 mins',
    cookTime: '14 mins',
    servingSize: '1 fillet (170g) + 130g cooked rice',
    ingredients: [
      { name: 'Fresh Tilapia or Rohu Fish Fillet', quantityGrams: 170, category: 'seafood', estimatedPriceGBP: 1.85, estimatedPriceINR: 85 },
      { name: 'Basmati Rice (raw)', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Mustard Oil (Kachi Ghani)', quantityGrams: 7, category: 'oils', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Fish Fry Masala (Turmeric, Red Chili, Carom seeds/Ajwain)', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Lemon Juice & Garlic Paste', quantityGrams: 10, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Sliced Onion & Cucumber for side', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Cast iron tawa or skillet', 'Fish spatula', 'Small marinade bowl'],
    instructions: [
      'Pat dry 170g fish fillet. Make 2-3 diagonal shallow slits on both sides.',
      'Mix garlic paste, lemon juice, turmeric, Kashmiri red chili, crushed ajwain (carom seeds), and salt into a thick marinade paste.',
      'Rub marinade thoroughly all over the fish fillet, working into the slits. Rest for 10 minutes.',
      'Heat 7g mustard oil on a cast iron tawa until smoking hot, then reduce to medium.',
      'Place the marinated fish. Sear undisturbed for 4-5 minutes until the bottom crust is golden and crisp.',
      'Flip gently with a fish spatula and sear the other side for 3-4 minutes until cooked through and flaky.',
      'Serve sizzling hot with steamed rice, lemon wedges, and crisp sliced onions.'
    ],
    temperatureTime: 'Pan sear at 190°C for 4 mins per side',
    nutrition: {
      protein: 22,
      carbs: 42,
      fats: 9,
      fiber: 2,
      calories: 390,
    },
    preparationTips: [
      'Mustard oil and carom seeds (ajwain) enhance fish digestion and provide authentic coastal Indian flavor.',
      'High in Omega-3 fatty acids for joint health and recovery after gym workouts.'
    ],
    storageInstructions: 'Best eaten fresh right off the skillet. Cooked fish can be kept refrigerated for 24 hours.',
    substitutionOptions: [
      'Can be substituted with salmon fillet or kingfish (surmai).',
      'Vegetarian alternative: 160g firm tofu cut in steaks and marinated with same spices.'
    ],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
    tags: ['Omega-3 Rich', '36g Pure Protein', 'Dairy Free', 'Gym Recovery'],
    isVegetarian: false,
  },
  {
    id: 'rec-rajma-masala-bowl',
    name: 'Delhi Style Rajma (Kidney Beans) Masala with Steamed Rice',
    mealType: 'lunch',
    prepTime: '10 mins',
    cookTime: '25 mins',
    servingSize: '1 bowl rajma + 140g cooked rice',
    ingredients: [
      { name: 'Red Kidney Beans / Rajma (dry)', quantityGrams: 65, category: 'pulses', estimatedPriceGBP: 0.35, estimatedPriceINR: 12 },
      { name: 'Basmati Rice (raw)', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Onion & Garlic (finely chopped)', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Tomato Puree (strictly fresh tomatoes)', quantityGrams: 80, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Mustard / Sunflower Oil', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Rajma Masala & Ginger Julienned', quantityGrams: 10, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Pressure cooker', 'Ladle for mashing', 'Rice pot'],
    instructions: [
      'Soak 65g rajma overnight for 8 hours. Pressure cook with 2.5 cups water and 1 tsp salt for 6-7 whistles until completely tender and melt-in-the-mouth soft.',
      'In a separate pan, heat 6g oil. Add cumin seeds and chopped onions, cook until rich dark golden brown.',
      'Add fresh tomato puree, ginger-garlic paste, coriander powder, cumin, red chili, and authentic rajma masala. Cook until oil leaves masala.',
      'Pour boiled rajma along with its cooking liquor into the masala.',
      'Lightly mash 20% of the beans against the wall of the pot with your ladle—this thickens the gravy naturally without needing dairy or cream.',
      'Simmer for 10 minutes on low flame until flavors marry into a thick velvety curry. Garnish with ginger juliennes and fresh coriander.',
      'Serve over steamed rice with sliced raw onions.'
    ],
    temperatureTime: 'Simmer gravy at 90°C for 10 minutes',
    nutrition: {
      protein: 35,
      carbs: 68,
      fats: 7,
      fiber: 16,
      calories: 415,
    },
    preparationTips: [
      'Mashing a portion of the beans creates restaurant-quality thickness with 0% dairy or cream.',
      'Super rich in potassium and complex carbohydrates for workout endurance.'
    ],
    storageInstructions: 'Rajma tastes significantly better after 12-24 hours in the fridge.',
    substitutionOptions: [
      'Pair with 2 boiled egg whites to boost total protein to 27g if non-veg is preferred.'
    ],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    tags: ['Comfort Food', 'High Fiber', 'Vegan Protein', 'Dairy Free'],
    isVegetarian: true,
  },
  {
    id: 'rec-besan-cheela-tofu',
    name: 'Protein Besan Cheela Stuffed with Spiced Crumbled Tofu',
    mealType: 'breakfast',
    prepTime: '8 mins',
    cookTime: '10 mins',
    servingSize: '2 stuffed cheelas',
    ingredients: [
      { name: 'Besan (Bengal Gram Flour)', quantityGrams: 55, category: 'pulses', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Firm Tofu (crumbled for stuffing)', quantityGrams: 80, category: 'pulses', estimatedPriceGBP: 0.5, estimatedPriceINR: 20 },
      { name: 'Onion, Tomato, Green Chili (finely chopped)', quantityGrams: 50, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
      { name: 'Ajwain (Carom seeds) & Turmeric', quantityGrams: 4, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
      { name: 'Mustard / Olive Oil for brushing', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Fresh Coriander & Mint Chutney', quantityGrams: 20, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Non-stick tawa / crepe pan', 'Batter whisk', 'Flat spatula'],
    instructions: [
      'In a bowl, whisk 55g besan with water, carom seeds (ajwain), turmeric, a pinch of red chili, and salt into a smooth, pourable pancake batter.',
      'In another bowl, mix 80g crumbled tofu with chopped onions, green chilies, coriander, and chaat masala for the stuffing.',
      'Heat a non-stick tawa. Brush lightly with 3g oil. Pour half the besan batter and spread in concentric circles into a thin crepe.',
      'Cook for 2 minutes on medium heat until edges lift. Flip and cook other side for 1 minute.',
      'Flip back, place half of the crumbled spiced tofu down the center, fold over like a dosa or wrap, and toast for 30 seconds until crisp.',
      'Repeat for the second cheela. Serve hot with homemade dairy-free mint-coriander green chutney.'
    ],
    temperatureTime: 'Cook on medium-high tawa (180°C)',
    nutrition: {
      protein: 25,
      carbs: 36,
      fats: 10,
      fiber: 8,
      calories: 330,
    },
    preparationTips: [
      'Ajwain (carom seeds) is essential in besan batter to prevent gas or heaviness.',
      'Provides a savory crepe alternative to paneer cheela with 0% dairy.'
    ],
    storageInstructions: 'Eat hot and crisp off the tawa.',
    substitutionOptions: [
      'Can stuff with shredded boiled chicken breast or egg bhurji instead of tofu.'
    ],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    tags: ['Gluten-Free Flour', 'Plant Power', 'Crispy Breakfast', 'Dairy Free'],
    isVegetarian: true,
  },
  {
    id: 'rec-chicken-tikka-salad',
    name: 'Tawa Chicken Tikka Salad with Tangy Lemon Mustard Dressing',
    mealType: 'lunch',
    prepTime: '10 mins',
    cookTime: '12 mins',
    servingSize: '1 large bowl (350g)',
    ingredients: [
      { name: 'Chicken Breast (cut into chunks)', quantityGrams: 160, category: 'meat', estimatedPriceGBP: 1.5, estimatedPriceINR: 65 },
      { name: 'Romaine Lettuce or Shredded Cabbage', quantityGrams: 80, category: 'vegetables', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Bell Peppers (Red & Yellow)', quantityGrams: 50, category: 'vegetables', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Cucumber & Cherry Tomatoes', quantityGrams: 60, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Mustard Oil (for marinade - zero yogurt!)', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Lemon Juice, Kashmiri Chili, Garlic Paste, Chaat Masala', quantityGrams: 12, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Cast iron grill pan / tawa', 'Salad bowl', 'Tongs'],
    instructions: [
      'Make dairy-free tikka marinade: Whisk 6g mustard oil, 1 tbsp lemon juice, Kashmiri red chili powder, ginger-garlic paste, roasted kasuri methi, and black salt (strictly NO hung curd or yogurt).',
      'Coat 160g chicken chunks with marinade. Rest for 10 minutes.',
      'Heat grill pan on high. Place chicken pieces and grill for 5-6 minutes, turning once until charred edges form and internal temperature reaches 75°C.',
      'In a salad bowl, arrange crisp shredded greens, sliced bell peppers, cucumbers, and tomatoes.',
      'Slice warm grilled chicken tikka and lay across the salad.',
      'Drizzle pan drippings and a squeeze of fresh lemon over the salad. Dust with chaat masala.'
    ],
    temperatureTime: 'Grill at 210°C for 6 minutes',
    nutrition: {
      protein: 35,
      carbs: 14,
      fats: 8,
      fiber: 5,
      calories: 285,
    },
    preparationTips: [
      'Using mustard oil and lemon juice replicates authentic tandoori tanginess without curd.',
      'Incredible low-carb, ultra-high protein lunch for body composition.'
    ],
    storageInstructions: 'Pack grilled chicken and vegetables in separate compartments for on-the-go gym lunches.',
    substitutionOptions: [
      'Vegetarians can use 160g firm pressed tofu cubes grilled with identical spices.'
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    tags: ['Ultra High Protein', 'Low Carb', 'Dairy-Free Tikka', 'Gym Ready'],
    isVegetarian: false,
  },
  {
    id: 'rec-boiled-egg-whites-salad',
    name: 'Spiced Boiled Egg Whites Chaat with Roasted Cumin',
    mealType: 'eveningSnack',
    prepTime: '6 mins',
    cookTime: '9 mins',
    servingSize: '1 bowl (4 egg whites + 1 whole)',
    ingredients: [
      { name: 'Egg Whites (hard boiled)', quantityGrams: 130, unit: '4 whites', category: 'meat', estimatedPriceGBP: 0.7, estimatedPriceINR: 28 },
      { name: 'Whole Egg (hard boiled)', quantityGrams: 50, unit: '1 whole', category: 'meat', estimatedPriceGBP: 0.25, estimatedPriceINR: 7 },
      { name: 'Finely Chopped Onion & Green Chili', quantityGrams: 30, category: 'vegetables', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Diced Tomatoes', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Kala Namak, Black Pepper & Bhuna Jeera', quantityGrams: 3, category: 'spices', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
      { name: 'Lemon Juice', quantityGrams: 6, category: 'fruits', estimatedPriceGBP: 0.08, estimatedPriceINR: 2 },
    ],
    equipment: ['Egg boiler', 'Chopping board'],
    instructions: [
      'Boil 5 eggs for 9 minutes. Cool in iced water, peel.',
      'Discard 4 yolks (or save for family), keeping 4 firm egg whites and 1 whole egg.',
      'Chop egg whites and whole egg into bite-sized cubes.',
      'Toss in a bowl with chopped onions, tomatoes, and green chilies.',
      'Season with black pepper, kala namak (black salt), and roasted jeera powder.',
      'Finish with fresh lemon juice and fresh coriander. Stir and enjoy immediately.'
    ],
    temperatureTime: 'Boil eggs at 100°C for 9 mins',
    nutrition: {
      protein: 15,
      carbs: 6,
      fats: 5,
      fiber: 2,
      calories: 155,
    },
    preparationTips: [
      'One whole egg is included because egg yolk contains choline, vitamin D, and lutein, while remaining 4 whites keep fat minimal.',
      'Zero cooking oil required.'
    ],
    storageInstructions: 'Eat within 15 minutes of chopping for optimal fresh texture.',
    substitutionOptions: [
      'Vegan swap: 120g boiled white chickpeas or 120g cubed firm tofu.'
    ],
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=700&q=80',
    tags: ['21g Protein', 'Lean Snack', 'Zero Fat', 'Post-Workout'],
    isVegetarian: false,
  },
  {
    id: 'rec-almond-pumpkin-seed-snack',
    name: 'Dry Roasted Almonds & Pumpkin Seeds Trail Mix',
    mealType: 'bedtimeSnack',
    prepTime: '2 mins',
    cookTime: '0 mins',
    servingSize: '1 handful (35g)',
    ingredients: [
      { name: 'Raw California / Mamra Almonds', quantityGrams: 20, category: 'fruits', estimatedPriceGBP: 0.45, estimatedPriceINR: 18 },
      { name: 'Raw Green Pumpkin Seeds (Pepitas)', quantityGrams: 15, category: 'fruits', estimatedPriceGBP: 0.35, estimatedPriceINR: 14 },
      { name: 'Himalayan Pink Salt & Black Pepper', quantityGrams: 1, category: 'spices', estimatedPriceGBP: 0.05, estimatedPriceINR: 1 },
    ],
    equipment: ['Dry skillet (if roasting) or airtight jar'],
    instructions: [
      'Lightly dry-toast almonds and pumpkin seeds on a warm skillet without any butter or oil for 3 minutes until aromatic and slightly popping.',
      'Sprinkle with a whisper of pink Himalayan salt and fresh cracked black pepper.',
      'Enjoy as a crunchy, micronutrient-dense bedtime snack.'
    ],
    temperatureTime: 'Dry toast at 150°C for 3 minutes',
    nutrition: {
      protein: 8,
      carbs: 7,
      fats: 17,
      fiber: 4.5,
      calories: 205,
    },
    preparationTips: [
      'Pumpkin seeds are one of nature\'s richest sources of magnesium and zinc, promoting deep muscle recovery and sound sleep.',
      'Healthy monounsaturated fats keep overnight catabolism at bay without insulin spikes.'
    ],
    storageInstructions: 'Store in an airtight glass jar at room temperature for up to 30 days.',
    substitutionOptions: [
      'Can swap almonds with walnuts for boosted ALA Omega-3 fats.'
    ],
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=700&q=80',
    tags: ['Magnesium Sleep Fuel', 'Healthy Fats', 'Zero Dairy', 'Bedtime Snack'],
    isVegetarian: true,
  },
  {
    id: 'rec-egg-masala-curry-roti',
    name: 'Spicy Dhaba Style Egg Curry with 2 Phulkas',
    mealType: 'dinner',
    prepTime: '10 mins',
    cookTime: '18 mins',
    servingSize: '2 eggs in gravy + 2 rotis',
    ingredients: [
      { name: 'Eggs (Whole, Boiled)', quantityGrams: 110, unit: '2 eggs', category: 'meat', estimatedPriceGBP: 0.35, estimatedPriceINR: 14 },
      { name: 'Egg Whites (Boiled)', quantityGrams: 65, unit: '2 whites', category: 'meat', estimatedPriceGBP: 0.35, estimatedPriceINR: 14 },
      { name: 'Whole Wheat Atta', quantityGrams: 60, category: 'grains', estimatedPriceGBP: 0.15, estimatedPriceINR: 6 },
      { name: 'Onion & Fresh Tomato Gravy', quantityGrams: 120, category: 'vegetables', estimatedPriceGBP: 0.2, estimatedPriceINR: 9 },
      { name: 'Mustard Oil (zero ghee)', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Ginger, Garlic, Kashmiri Mirch, Garam Masala', quantityGrams: 12, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Kadhai', 'Tawa', 'Chef knife'],
    instructions: [
      'Prick boiled eggs with a fork and lightly pan-sear in 2g oil with turmeric for 2 minutes to create a golden blistered skin.',
      'In the same kadhai, sauté chopped onions until caramelized brown.',
      'Add ginger-garlic paste and fresh tomato puree with spices. Cook until thick gravy forms without dairy.',
      'Add 120ml water, bring to boil, and slip in seared eggs and boiled whites. Simmer for 5 minutes.',
      'Serve hot with 2 whole wheat phulkas without ghee.'
    ],
    temperatureTime: 'Simmer gravy at 95°C for 5 minutes',
    nutrition: {
      protein: 22,
      carbs: 48,
      fats: 12,
      fiber: 8,
      calories: 410,
    },
    preparationTips: [
      'Pan-searing the boiled eggs creates a textured skin that absorbs the masala sauce deeply.',
      'Rich in selenium and high-biological-value protein.'
    ],
    storageInstructions: 'Can be stored in the fridge for up to 48 hours.',
    substitutionOptions: ['Replace eggs with 160g firm spiced tofu cubes.'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
    tags: ['Dhaba Favorite', 'High Protein', 'Dairy Free', 'Muscle Fuel'],
    isVegetarian: false,
  },
  {
    id: 'rec-chicken-keema-matar',
    name: 'Lean Chicken Keema Matar with Brown Rice',
    mealType: 'dinner',
    prepTime: '12 mins',
    cookTime: '20 mins',
    servingSize: '1 bowl keema + 140g brown rice',
    ingredients: [
      { name: 'Minced Chicken Breast (Keema)', quantityGrams: 170, category: 'meat', estimatedPriceGBP: 1.65, estimatedPriceINR: 70 },
      { name: 'Green Peas (Matar)', quantityGrams: 40, category: 'vegetables', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
      { name: 'Brown Rice (raw)', quantityGrams: 50, category: 'grains', estimatedPriceGBP: 0.2, estimatedPriceINR: 9 },
      { name: 'Onions, Tomatoes, Green Chilies', quantityGrams: 100, category: 'vegetables', estimatedPriceGBP: 0.25, estimatedPriceINR: 7 },
      { name: 'Cold Pressed Sunflower Oil', quantityGrams: 6, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Keema Spices (Cloves, Cardamom, Kasuri Methi)', quantityGrams: 10, category: 'spices', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Heavy skillet', 'Rice cooker'],
    instructions: [
      'Heat oil in skillet. Add whole spices, minced onions, and sauté until deep golden.',
      'Add ginger garlic paste, green chilies, and tomato puree. Cook for 4 minutes until moisture evaporates.',
      'Add minced lean chicken breast and green peas. Break lumps quickly with spatula on high heat.',
      'Add 100ml water, cover, and cook on low heat for 12 minutes until chicken keema is tender and juicy.',
      'Finish with crushed kasuri methi and fresh lemon juice. Serve over steamed brown rice.'
    ],
    temperatureTime: 'Cook on medium-low (160°C) for 12 mins',
    nutrition: {
      protein: 22,
      carbs: 49,
      fats: 9,
      fiber: 7,
      calories: 440,
    },
    preparationTips: [
      'Using pure breast mince ensures practically zero saturated animal fats while maximizing protein yield.',
      'No butter or cream needed—peas and tomato reduction lend rich body.'
    ],
    storageInstructions: 'Refrigerate for up to 3 days in an airtight container.',
    substitutionOptions: ['Vegetarians can substitute with 55g minced soya granules.'],
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=700&q=80',
    tags: ['41g Protein Monster', 'Lean Bulk', 'Dairy Free'],
    isVegetarian: false,
  },
  {
    id: 'rec-moong-dal-cheela-wrap',
    name: 'Green Moong Dal Cheela Roll with Onion Salad',
    mealType: 'breakfast',
    prepTime: '10 mins',
    cookTime: '10 mins',
    servingSize: '2 savory crepes',
    ingredients: [
      { name: 'Split Yellow / Green Moong Dal (soaked & ground)', quantityGrams: 60, category: 'pulses', estimatedPriceGBP: 0.2, estimatedPriceINR: 9 },
      { name: 'Tofu (grated for filling)', quantityGrams: 60, category: 'pulses', estimatedPriceGBP: 0.25, estimatedPriceINR: 15 },
      { name: 'Ginger, Green Chili, Cumin', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Mustard Oil for greasing', quantityGrams: 5, category: 'oils', estimatedPriceGBP: 0.1, estimatedPriceINR: 3 },
      { name: 'Coriander Chutney (homemade dairy free)', quantityGrams: 20, category: 'vegetables', estimatedPriceGBP: 0.12, estimatedPriceINR: 4 },
    ],
    equipment: ['Mixer grinder', 'Dosa tawa', 'Turner'],
    instructions: [
      'Blend soaked moong dal with ginger, green chili, a pinch of hing, and salt with 50ml water into a smooth dosa-like batter.',
      'Grease hot tawa with a few drops of oil. Pour a ladle of batter and swirl into a thin pancake.',
      'Cook for 2 minutes until underside turns golden and crisp. Flip and cook for 1 minute.',
      'Sprinkle grated tofu seasoned with chaat masala in the center, roll tightly into a wrap.',
      'Serve warm with dairy-free mint coriander chutney.'
    ],
    temperatureTime: 'Roast on tawa at 180°C',
    nutrition: {
      protein: 25,
      carbs: 38,
      fats: 7,
      fiber: 7,
      calories: 310,
    },
    preparationTips: [
      'Soak moong dal overnight or for 3 hours in warm water for the smoothest batter.',
      'Light on the gut, zero gluten, zero dairy.'
    ],
    storageInstructions: 'Batter can be refrigerated in a sealed bottle for up to 3 days.',
    substitutionOptions: ['Can roll in 2 boiled egg whites instead of tofu.'],
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80',
    tags: ['Ayurvedic Friendly', 'Pure Plant Protein', 'Dairy Free'],
    isVegetarian: true,
  },
  {
    id: 'rec-oats-peanut-butter-smoothie',
    name: 'Chocolate Banana PB Oats Power Shake (Dairy Free)',
    mealType: 'breakfast',
    prepTime: '5 mins',
    cookTime: '0 mins',
    servingSize: '1 large shaker bottle (450ml)',
    ingredients: [
      { name: 'Rolled Oats (powdered)', quantityGrams: 45, category: 'grains', estimatedPriceGBP: 0.35, estimatedPriceINR: 14 },
      { name: '100% Pure Peanut Butter', quantityGrams: 30, category: 'pulses', estimatedPriceGBP: 0.4, estimatedPriceINR: 16 },
      { name: 'Ripe Banana', quantityGrams: 80, category: 'fruits', estimatedPriceGBP: 0.25, estimatedPriceINR: 7 },
      { name: 'Soy Milk (Unsweetened) / Filtered Water', quantityGrams: 250, unit: '250ml', category: 'other', estimatedPriceGBP: 0.5, estimatedPriceINR: 20 },
      { name: 'Raw Cocoa Powder (100% unsweetened)', quantityGrams: 10, category: 'spices', estimatedPriceGBP: 0.2, estimatedPriceINR: 8 },
      { name: 'Chia Seeds', quantityGrams: 8, category: 'spices', estimatedPriceGBP: 0.15, estimatedPriceINR: 5 },
    ],
    equipment: ['High-speed blender', 'Measuring scale'],
    instructions: [
      'Add rolled oats into dry blender jar and pulse into a fine flour.',
      'Add banana, 30g pure roasted peanut butter, 10g cocoa powder, chia seeds, and 250ml unsweetened soy milk or cold water.',
      'Add 3 ice cubes and blend on high speed for 60 seconds until thick, velvety, and frothy.',
      'Pour into shaker and drink. Completely free from whey protein and dairy milk!'
    ],
    temperatureTime: 'Chilled blend (4°C)',
    nutrition: {
      protein: 25,
      carbs: 56,
      fats: 16,
      fiber: 10,
      calories: 450,
    },
    preparationTips: [
      'Unsweetened soy milk contains 7g of complete plant protein per 200ml, matching dairy milk without lactose or allergen.',
      'Gives steady carb release for intense morning workouts.'
    ],
    storageInstructions: 'Best consumed within 20 minutes of blending.',
    substitutionOptions: ['Can use almond milk or oat milk if soy sensitive.'],
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80',
    tags: ['Whey-Free Shake', 'Pre-Gym Fuel', 'Dairy Free', 'Vegan'],
    isVegetarian: true,
  }
];
