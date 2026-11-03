import { NoteItem } from '../types';

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Anand\'s Golden Dairy-Free Rules for 120g Protein',
    content: '1. Soya chunks have 52g protein per 100g. Just 50g yields 26g clean protein!\n2. 4 boiled egg whites + 1 whole egg = 21g protein with optimal bio-availability.\n3. 160g chicken breast raw = ~38g pure protein.\n4. Sattu bedtime drink provides 11g slow digesting plant protein and cools the gut.\n5. Never consume whey concentrate or milk tea. Substitute with black coffee or warm water with lemon.',
    category: 'Diet',
    pinned: true,
    tags: ['Protein Guidelines', 'Dairy-Free', 'High Priority'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-2',
    title: 'Weekly Meal Prep Strategy (Sundays & Wednesdays)',
    content: '- Sunday afternoon: Boil 400g black chana, pressure cook 4 portions of brown rice, and pre-boil 10 eggs.\n- Wednesday evening: Cut and marinate 500g chicken breast in lemon juice and garlic; store in glass meal prep containers.\n- Squeeze soya chunks in cold water 3 times thoroughly to eliminate all beany smell before tossing in spices.',
    category: 'Diet',
    pinned: true,
    tags: ['Meal Prep', 'Time Saver', 'Routine'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-3',
    title: 'Progressive Overload Targets (Weight: 61kg -> 65kg)',
    content: '- Incline Dumbbell Bench Press: 20kg dumbbells x 8 reps -> target 24kg x 8 reps.\n- Barbell Back Squat: 70kg x 6 reps -> target 85kg x 6 reps.\n- Barbell Deadlift: 90kg x 5 reps -> target 110kg.\n- Weighted Pull-ups: Bodyweight (61kg) + 5kg plate x 5 reps.\n- Sleep target: Minimum 7.5 hours per night for muscle protein synthesis.',
    category: 'Workout',
    pinned: false,
    tags: ['Lifting', 'Hypertrophy', 'Goals'],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-4',
    title: 'Hydration Strategy During Heavy Training',
    content: 'Drink 500ml water upon waking. Sip 750ml with a pinch of Himalayan pink salt and lemon during lifting session. Avoid chugging cold water right after hot meals to aid enzyme breakdown.',
    category: 'General',
    pinned: false,
    tags: ['Water', 'Electrolytes'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
