import { UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  uid: 'user_anand_pinisetty_001',
  email: 'anand.pinisetty@gymdiet.app',
  displayName: 'Anand Pinisetty',
  username: 'anand_pinisetty',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  age: 21,
  weight: 61,
  height: '5\'7" (170 cm)',
  heightCm: 170,
  dailyProteinTarget: 120, // 120g target strictly respected
  dailyCarbsTarget: 220,
  dailyFatsTarget: 48,
  dailyCaloriesTarget: 1950,
  dietaryRestriction: 'STRICTLY NO MILK OR DAIRY PRODUCTS (Lactose & Casein Free)',
  fitnessGoal: 'Hypertrophy & Lean Muscle Mass (Target 65kg)',
  dailyWaterTargetMl: 2600, // 61kg * 42.6ml ≈ 2600ml
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: new Date().toISOString(),
};
