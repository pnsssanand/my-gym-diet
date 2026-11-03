import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  UserProfile,
  DailyDietPlan,
  Recipe,
  MonthlyGroceryItem,
  BringFromIndiaItem,
  PersonalShoppingItem,
  DailyWaterRecord,
  NoteItem,
  TodoItem,
} from '../types';
import { INITIAL_USER_PROFILE } from '../data/initialProfile';
import { INITIAL_RECIPES } from '../data/initialRecipes';
import {
  INITIAL_THIRTY_DAY_SCHEDULE,
  calculateConsolidatedGroceries,
} from '../data/thirtyDaySchedule';
import {
  INITIAL_BRING_FROM_INDIA_ITEMS,
  INITIAL_PERSONAL_SHOPPING_ITEMS,
} from '../data/initialKitchenEssentials';
import { INITIAL_NOTES } from '../data/initialNotes';
import { INITIAL_TODOS } from '../data/initialTodos';

// Helper for local storage keying per user
const getKey = (uid: string, entity: string) => `mgd_${uid}_${entity}`;

export const StorageService = {
  // USER PROFILE
  async getUserProfile(uid: string): Promise<UserProfile> {
    if (db && uid !== INITIAL_USER_PROFILE.uid) {
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'profile', 'data'));
        if (snap.exists()) {
          return snap.data() as UserProfile;
        }
      } catch (e) {
        console.warn('Firestore fetch failed for profile, using cache:', e);
      }
    }

    const cached = localStorage.getItem(getKey(uid, 'profile'));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return { ...INITIAL_USER_PROFILE, uid };
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    localStorage.setItem(getKey(profile.uid, 'profile'), JSON.stringify(profile));
    if (db) {
      try {
        await setDoc(doc(db, 'users', profile.uid, 'profile', 'data'), profile, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for profile:', e);
      }
    }
  },

  // 30-DAY SCHEDULE
  async getSchedule(uid: string): Promise<DailyDietPlan[]> {
    if (db && uid !== INITIAL_USER_PROFILE.uid) {
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'schedule', '30days'));
        if (snap.exists()) {
          const data = snap.data();
          if (data?.plans) return data.plans as DailyDietPlan[];
        }
      } catch (e) {
        console.warn('Firestore fetch failed for schedule:', e);
      }
    }

    const cached = localStorage.getItem(getKey(uid, 'schedule'));
    if (cached) {
      try {
        const plans = JSON.parse(cached) as DailyDietPlan[];
        return plans.map((p) => ({
          ...p,
          totalProtein: 120, // Strictly constant 120g daily target
          meals: p.meals.map((m) => {
            const recipe = INITIAL_RECIPES.find((ir) => ir.id === m.recipeId);
            return {
              ...m,
              protein: recipe ? recipe.nutrition.protein : m.protein,
              image: recipe ? recipe.image : m.image,
            };
          }),
        }));
      } catch {
        // fallback
      }
    }
    return INITIAL_THIRTY_DAY_SCHEDULE;
  },

  async saveSchedule(uid: string, plans: DailyDietPlan[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'schedule'), JSON.stringify(plans));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'schedule', '30days'), { plans }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for schedule:', e);
      }
    }
  },

  // RECIPES
  async getRecipes(uid: string): Promise<Recipe[]> {
    if (db && uid !== INITIAL_USER_PROFILE.uid) {
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'recipes', 'all'));
        if (snap.exists()) {
          const data = snap.data();
          if (data?.recipes) return data.recipes as Recipe[];
        }
      } catch (e) {
        console.warn('Firestore fetch failed for recipes:', e);
      }
    }

    const cached = localStorage.getItem(getKey(uid, 'recipes'));
    if (cached) {
      try {
        const list = JSON.parse(cached) as Recipe[];
        return list.map((r) => {
          const fresh = INITIAL_RECIPES.find((ir) => ir.id === r.id);
          return fresh
            ? {
                ...r,
                image: fresh.image,
                nutrition: { ...r.nutrition, protein: fresh.nutrition.protein },
              }
            : r;
        });
      } catch {
        // fallback
      }
    }
    return INITIAL_RECIPES;
  },

  async saveRecipes(uid: string, recipes: Recipe[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'recipes'), JSON.stringify(recipes));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'recipes', 'all'), { recipes }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for recipes:', e);
      }
    }
  },

  // GROCERY & KITCHEN ESSENTIALS
  async getGroceries(uid: string, currentPlans?: DailyDietPlan[]): Promise<MonthlyGroceryItem[]> {
    const cached = localStorage.getItem(getKey(uid, 'groceries'));
    if (cached) {
      try {
        const items = JSON.parse(cached) as MonthlyGroceryItem[];
        return items.map((i) => ({
          ...i,
          estimatedPriceGBP:
            i.estimatedPriceGBP ||
            (i.estimatedPriceINR ? Math.round(i.estimatedPriceINR * 0.015 * 100) / 100 : 1.5),
        }));
      } catch {
        // fallback
      }
    }
    return calculateConsolidatedGroceries(currentPlans || INITIAL_THIRTY_DAY_SCHEDULE);
  },

  async saveGroceries(uid: string, groceries: MonthlyGroceryItem[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'groceries'), JSON.stringify(groceries));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'kitchen', 'groceries'), { items: groceries }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for groceries:', e);
      }
    }
  },

  async getBringFromIndia(uid: string): Promise<BringFromIndiaItem[]> {
    const cached = localStorage.getItem(getKey(uid, 'bring_from_india'));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return INITIAL_BRING_FROM_INDIA_ITEMS;
  },

  async saveBringFromIndia(uid: string, items: BringFromIndiaItem[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'bring_from_india'), JSON.stringify(items));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'kitchen', 'bring_india'), { items }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for bring from india:', e);
      }
    }
  },

  async getPersonalShopping(uid: string): Promise<PersonalShoppingItem[]> {
    const cached = localStorage.getItem(getKey(uid, 'personal_shopping'));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return INITIAL_PERSONAL_SHOPPING_ITEMS;
  },

  async savePersonalShopping(uid: string, items: PersonalShoppingItem[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'personal_shopping'), JSON.stringify(items));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'kitchen', 'personal_shopping'), { items }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for personal shopping:', e);
      }
    }
  },

  // WATER TRACKING
  async getWaterRecord(uid: string, date: string, targetMl: number): Promise<DailyWaterRecord> {
    const cached = localStorage.getItem(getKey(uid, `water_${date}`));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return {
      date,
      totalMl: 1250, // default partially logged for demonstration
      targetMl,
      entries: [
        { id: 'w1', time: '07:30 AM', amountMl: 500 },
        { id: 'w2', time: '10:00 AM', amountMl: 250 },
        { id: 'w3', time: '12:30 PM', amountMl: 500 },
      ],
    };
  },

  async saveWaterRecord(uid: string, record: DailyWaterRecord): Promise<void> {
    localStorage.setItem(getKey(uid, `water_${record.date}`), JSON.stringify(record));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'water', record.date), record, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for water:', e);
      }
    }
  },

  // NOTES
  async getNotes(uid: string): Promise<NoteItem[]> {
    const cached = localStorage.getItem(getKey(uid, 'notes'));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return INITIAL_NOTES;
  },

  async saveNotes(uid: string, notes: NoteItem[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'notes'), JSON.stringify(notes));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'notes', 'all'), { notes }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for notes:', e);
      }
    }
  },

  // TO-DO TASKS
  async getTodos(uid: string): Promise<TodoItem[]> {
    const cached = localStorage.getItem(getKey(uid, 'todos'));
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return INITIAL_TODOS;
  },

  async saveTodos(uid: string, todos: TodoItem[]): Promise<void> {
    localStorage.setItem(getKey(uid, 'todos'), JSON.stringify(todos));
    if (db) {
      try {
        await setDoc(doc(db, 'users', uid, 'todos', 'all'), { todos }, { merge: true });
      } catch (e) {
        console.warn('Firestore write failed for todos:', e);
      }
    }
  },
};
