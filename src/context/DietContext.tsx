import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DailyDietPlan,
  Meal,
  Recipe,
  MonthlyGroceryItem,
  BringFromIndiaItem,
  PersonalShoppingItem,
  DailyWaterRecord,
  NoteItem,
  TodoItem,
} from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from './AuthContext';
import {
  buildDayPlan,
  calculateConsolidatedGroceries,
} from '../data/thirtyDaySchedule';

interface DietContextType {
  schedule: DailyDietPlan[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  currentDayPlan: DailyDietPlan | undefined;
  recipes: Recipe[];
  groceries: MonthlyGroceryItem[];
  bringFromIndia: BringFromIndiaItem[];
  personalShopping: PersonalShoppingItem[];
  waterRecord: DailyWaterRecord;
  notes: NoteItem[];
  todos: TodoItem[];
  loading: boolean;

  // Meal Schedule CRUD
  toggleMealCompleted: (day: number, mealId: string) => void;
  updateMeal: (day: number, meal: Meal) => void;
  addMealToDay: (day: number, meal: Meal) => void;
  deleteMealFromDay: (day: number, mealId: string) => void;
  regenerateDayPlan: (day: number) => void;

  // Recipe CRUD
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;

  // Kitchen Essentials CRUD
  toggleGroceryPurchased: (itemId: string) => void;
  addBringFromIndiaItem: (item: Omit<BringFromIndiaItem, 'id' | 'createdAt'>) => void;
  updateBringFromIndiaItem: (item: BringFromIndiaItem) => void;
  deleteBringFromIndiaItem: (itemId: string) => void;
  toggleBringFromIndiaPurchased: (itemId: string) => void;
  addPersonalShoppingItem: (item: Omit<PersonalShoppingItem, 'id' | 'createdAt'>) => void;
  updatePersonalShoppingItem: (item: PersonalShoppingItem) => void;
  deletePersonalShoppingItem: (itemId: string) => void;
  togglePersonalShoppingCompleted: (itemId: string) => void;

  // Water Tracker
  addWater: (amountMl: number) => void;
  resetWater: () => void;
  setWaterTarget: (targetMl: number) => void;

  // Notes CRUD
  addNote: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: NoteItem) => void;
  deleteNote: (noteId: string) => void;
  togglePinNote: (noteId: string) => void;

  // Todos CRUD
  addTodo: (todo: Omit<TodoItem, 'id' | 'createdAt'>) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  toggleTodoCompleted: (todoId: string) => void;

  // Reset to default
  resetAllData: () => Promise<void>;
}

const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const uid = profile.uid;

  const [schedule, setSchedule] = useState<DailyDietPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [groceries, setGroceries] = useState<MonthlyGroceryItem[]>([]);
  const [bringFromIndia, setBringFromIndia] = useState<BringFromIndiaItem[]>([]);
  const [personalShopping, setPersonalShopping] = useState<PersonalShoppingItem[]>([]);
  const [waterRecord, setWaterRecord] = useState<DailyWaterRecord>({
    date: new Date().toISOString().split('T')[0],
    totalMl: 1250,
    targetMl: profile.dailyWaterTargetMl || 2600,
    entries: [],
  });
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load all user data
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const [
          loadedSchedule,
          loadedRecipes,
          loadedBFI,
          loadedPSI,
          loadedWater,
          loadedNotes,
          loadedTodos,
        ] = await Promise.all([
          StorageService.getSchedule(uid),
          StorageService.getRecipes(uid),
          StorageService.getBringFromIndia(uid),
          StorageService.getPersonalShopping(uid),
          StorageService.getWaterRecord(uid, todayStr, profile.dailyWaterTargetMl || 2600),
          StorageService.getNotes(uid),
          StorageService.getTodos(uid),
        ]);

        if (mounted) {
          setSchedule(loadedSchedule);
          setRecipes(loadedRecipes);
          setBringFromIndia(loadedBFI);
          setPersonalShopping(loadedPSI);
          setWaterRecord(loadedWater);
          setNotes(loadedNotes);
          setTodos(loadedTodos);

          // Calculate consolidated groceries from the schedule
          const computedGroceries = calculateConsolidatedGroceries(loadedSchedule);
          setGroceries(computedGroceries);
          StorageService.saveGroceries(uid, computedGroceries);
        }
      } catch (err) {
        console.error('Error loading diet data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, [uid, profile.dailyWaterTargetMl]);

  // Sync groceries whenever schedule changes
  const updateScheduleAndGroceries = (newSchedule: DailyDietPlan[]) => {
    setSchedule(newSchedule);
    StorageService.saveSchedule(uid, newSchedule);
    const newGroceries = calculateConsolidatedGroceries(newSchedule);
    setGroceries(newGroceries);
    StorageService.saveGroceries(uid, newGroceries);
  };

  // Helper to recompute day totals
  const recalculateDay = (plan: DailyDietPlan): DailyDietPlan => {
    return {
      ...plan,
      totalProtein: plan.meals.reduce((s, m) => s + m.protein, 0),
      totalCarbs: plan.meals.reduce((s, m) => s + m.carbs, 0),
      totalFats: plan.meals.reduce((s, m) => s + m.fats, 0),
      totalCalories: plan.meals.reduce((s, m) => s + m.calories, 0),
      totalFiber: plan.meals.reduce((s, m) => s + m.fiber, 0),
    };
  };

  const currentDayPlan = schedule.find((p) => p.day === selectedDay) || schedule[0];

  // MEAL SCHEDULE CRUD
  const toggleMealCompleted = (day: number, mealId: string) => {
    const next = schedule.map((p) => {
      if (p.day !== day) return p;
      return {
        ...p,
        meals: p.meals.map((m) => (m.id === mealId ? { ...m, completed: !m.completed } : m)),
      };
    });
    setSchedule(next);
    StorageService.saveSchedule(uid, next);
  };

  const updateMeal = (day: number, updatedMeal: Meal) => {
    const next = schedule.map((p) => {
      if (p.day !== day) return p;
      const updatedMeals = p.meals.map((m) => (m.id === updatedMeal.id ? updatedMeal : m));
      return recalculateDay({ ...p, meals: updatedMeals });
    });
    updateScheduleAndGroceries(next);
  };

  const addMealToDay = (day: number, newMeal: Meal) => {
    const next = schedule.map((p) => {
      if (p.day !== day) return p;
      const updatedMeals = [...p.meals, newMeal];
      return recalculateDay({ ...p, meals: updatedMeals });
    });
    updateScheduleAndGroceries(next);
  };

  const deleteMealFromDay = (day: number, mealId: string) => {
    const next = schedule.map((p) => {
      if (p.day !== day) return p;
      const updatedMeals = p.meals.filter((m) => m.id !== mealId);
      return recalculateDay({ ...p, meals: updatedMeals });
    });
    updateScheduleAndGroceries(next);
  };

  const regenerateDayPlan = (day: number) => {
    const freshDay = buildDayPlan(day);
    const next = schedule.map((p) => (p.day === day ? freshDay : p));
    updateScheduleAndGroceries(next);
  };

  // RECIPE CRUD
  const addRecipe = (recipe: Recipe) => {
    const next = [recipe, ...recipes];
    setRecipes(next);
    StorageService.saveRecipes(uid, next);
  };

  const updateRecipe = (updated: Recipe) => {
    const next = recipes.map((r) => (r.id === updated.id ? updated : r));
    setRecipes(next);
    StorageService.saveRecipes(uid, next);
  };

  const deleteRecipe = (recipeId: string) => {
    const next = recipes.filter((r) => r.id !== recipeId);
    setRecipes(next);
    StorageService.saveRecipes(uid, next);
  };

  // KITCHEN ESSENTIALS
  const toggleGroceryPurchased = (itemId: string) => {
    const next = groceries.map((g) => (g.id === itemId ? { ...g, purchased: !g.purchased } : g));
    setGroceries(next);
    StorageService.saveGroceries(uid, next);
  };

  const addBringFromIndiaItem = (item: Omit<BringFromIndiaItem, 'id' | 'createdAt'>) => {
    const newItem: BringFromIndiaItem = {
      ...item,
      id: `bfi-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newItem, ...bringFromIndia];
    setBringFromIndia(next);
    StorageService.saveBringFromIndia(uid, next);
  };

  const updateBringFromIndiaItem = (item: BringFromIndiaItem) => {
    const next = bringFromIndia.map((i) => (i.id === item.id ? item : i));
    setBringFromIndia(next);
    StorageService.saveBringFromIndia(uid, next);
  };

  const deleteBringFromIndiaItem = (itemId: string) => {
    const next = bringFromIndia.filter((i) => i.id !== itemId);
    setBringFromIndia(next);
    StorageService.saveBringFromIndia(uid, next);
  };

  const toggleBringFromIndiaPurchased = (itemId: string) => {
    const next = bringFromIndia.map((i) =>
      i.id === itemId ? { ...i, purchased: !i.purchased } : i
    );
    setBringFromIndia(next);
    StorageService.saveBringFromIndia(uid, next);
  };

  const addPersonalShoppingItem = (item: Omit<PersonalShoppingItem, 'id' | 'createdAt'>) => {
    const newItem: PersonalShoppingItem = {
      ...item,
      id: `psi-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newItem, ...personalShopping];
    setPersonalShopping(next);
    StorageService.savePersonalShopping(uid, next);
  };

  const updatePersonalShoppingItem = (item: PersonalShoppingItem) => {
    const next = personalShopping.map((i) => (i.id === item.id ? item : i));
    setPersonalShopping(next);
    StorageService.savePersonalShopping(uid, next);
  };

  const deletePersonalShoppingItem = (itemId: string) => {
    const next = personalShopping.filter((i) => i.id !== itemId);
    setPersonalShopping(next);
    StorageService.savePersonalShopping(uid, next);
  };

  const togglePersonalShoppingCompleted = (itemId: string) => {
    const next = personalShopping.map((i) =>
      i.id === itemId ? { ...i, completed: !i.completed } : i
    );
    setPersonalShopping(next);
    StorageService.savePersonalShopping(uid, next);
  };

  // WATER TRACKER
  const addWater = (amountMl: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const next: DailyWaterRecord = {
      ...waterRecord,
      totalMl: waterRecord.totalMl + amountMl,
      entries: [
        { id: `w-${Date.now()}`, time: timeStr, amountMl },
        ...waterRecord.entries,
      ],
    };
    setWaterRecord(next);
    StorageService.saveWaterRecord(uid, next);
  };

  const resetWater = () => {
    const next: DailyWaterRecord = {
      ...waterRecord,
      totalMl: 0,
      entries: [],
    };
    setWaterRecord(next);
    StorageService.saveWaterRecord(uid, next);
  };

  const setWaterTarget = (targetMl: number) => {
    const next = { ...waterRecord, targetMl };
    setWaterRecord(next);
    StorageService.saveWaterRecord(uid, next);
  };

  // NOTES
  const addNote = (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: NoteItem = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const next = [newNote, ...notes];
    setNotes(next);
    StorageService.saveNotes(uid, next);
  };

  const updateNote = (note: NoteItem) => {
    const next = notes.map((n) => (n.id === note.id ? { ...note, updatedAt: new Date().toISOString() } : n));
    setNotes(next);
    StorageService.saveNotes(uid, next);
  };

  const deleteNote = (noteId: string) => {
    const next = notes.filter((n) => n.id !== noteId);
    setNotes(next);
    StorageService.saveNotes(uid, next);
  };

  const togglePinNote = (noteId: string) => {
    const next = notes.map((n) => (n.id === noteId ? { ...n, pinned: !n.pinned } : n));
    setNotes(next);
    StorageService.saveNotes(uid, next);
  };

  // TODOS
  const addTodo = (todo: Omit<TodoItem, 'id' | 'createdAt'>) => {
    const newTodo: TodoItem = {
      ...todo,
      id: `todo-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newTodo, ...todos];
    setTodos(next);
    StorageService.saveTodos(uid, next);
  };

  const updateTodo = (todo: TodoItem) => {
    const next = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(next);
    StorageService.saveTodos(uid, next);
  };

  const deleteTodo = (todoId: string) => {
    const next = todos.filter((t) => t.id !== todoId);
    setTodos(next);
    StorageService.saveTodos(uid, next);
  };

  const toggleTodoCompleted = (todoId: string) => {
    const next = todos.map((t) => (t.id === todoId ? { ...t, completed: !t.completed } : t));
    setTodos(next);
    StorageService.saveTodos(uid, next);
  };

  const resetAllData = async () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <DietContext.Provider
      value={{
        schedule,
        selectedDay,
        setSelectedDay,
        currentDayPlan,
        recipes,
        groceries,
        bringFromIndia,
        personalShopping,
        waterRecord,
        notes,
        todos,
        loading,
        toggleMealCompleted,
        updateMeal,
        addMealToDay,
        deleteMealFromDay,
        regenerateDayPlan,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleGroceryPurchased,
        addBringFromIndiaItem,
        updateBringFromIndiaItem,
        deleteBringFromIndiaItem,
        toggleBringFromIndiaPurchased,
        addPersonalShoppingItem,
        updatePersonalShoppingItem,
        deletePersonalShoppingItem,
        togglePersonalShoppingCompleted,
        addWater,
        resetWater,
        setWaterTarget,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodoCompleted,
        resetAllData,
      }}
    >
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => {
  const context = useContext(DietContext);
  if (!context) throw new Error('useDiet must be used within a DietProvider');
  return context;
};
