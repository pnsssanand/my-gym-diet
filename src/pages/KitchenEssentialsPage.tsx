import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDiet } from '../context/DietContext';
import { GroceryCategorySection } from '../components/grocery/GroceryCategorySection';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { BringFromIndiaItem, PersonalShoppingItem, MonthlyGroceryItem } from '../types';
import {
  Package,
  Plane,
  ShoppingCart,
  Plus,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const KitchenEssentialsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    groceries,
    toggleGroceryPurchased,
    bringFromIndia,
    addBringFromIndiaItem,
    updateBringFromIndiaItem,
    deleteBringFromIndiaItem,
    toggleBringFromIndiaPurchased,
    personalShopping,
    addPersonalShoppingItem,
    updatePersonalShoppingItem,
    deletePersonalShoppingItem,
    togglePersonalShoppingCompleted,
  } = useDiet();

  // Determine active tab from URL or state
  let currentTab: 'grocery' | 'india' | 'shopping' = 'grocery';
  if (location.pathname.includes('/india')) currentTab = 'india';
  else if (location.pathname.includes('/shopping')) currentTab = 'shopping';

  // Sub-modals for Bring From India
  const [isBfiModalOpen, setIsBfiModalOpen] = useState(false);
  const [editingBfi, setEditingBfi] = useState<BringFromIndiaItem | null>(null);
  const [bfiName, setBfiName] = useState('');
  const [bfiQuantity, setBfiQuantity] = useState('');
  const [bfiNotes, setBfiNotes] = useState('');

  // Sub-modals for Personal Shopping
  const [isPsiModalOpen, setIsPsiModalOpen] = useState(false);
  const [editingPsi, setEditingPsi] = useState<PersonalShoppingItem | null>(null);
  const [psiName, setPsiName] = useState('');
  const [psiCategory, setPsiCategory] = useState('Equipment');
  const [psiQuantity, setPsiQuantity] = useState('1 unit');
  const [psiPriority, setPsiPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [psiNotes, setPsiNotes] = useState('');

  // Deletion modals
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'bfi' | 'psi' | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  // Group groceries by category
  const categories: Array<{ id: MonthlyGroceryItem['category']; label: string; icon: string }> = [
    { id: 'pulses', label: 'Pulses, Legumes & Soya (High Protein)', icon: '🌱' },
    { id: 'grains', label: 'Whole Grains & Oats', icon: '🌾' },
    { id: 'meat', label: 'Fresh Poultry & Eggs', icon: '🍗' },
    { id: 'seafood', label: 'Fish & Seafood', icon: '🐟' },
    { id: 'vegetables', label: 'Fresh Vegetables & Greens', icon: '🥬' },
    { id: 'fruits', label: 'Fruits, Nuts & Seeds', icon: '🥜' },
    { id: 'oils', label: 'Healthy Cooking Oils (No Ghee/Butter)', icon: '🫒' },
    { id: 'spices', label: 'Pure Spices & Masalas', icon: '🌶️' },
    { id: 'other', label: 'Other Kitchen Essentials', icon: '📦' },
  ];

  const totalGroceryPrice = groceries.reduce(
    (s, g) =>
      s + (g.estimatedPriceGBP !== undefined ? g.estimatedPriceGBP : (g.estimatedPriceINR ? g.estimatedPriceINR * 0.015 : 0)),
    0
  );
  const purchasedGroceryCount = groceries.filter((g) => g.purchased).length;
  const groceryProgressPct = groceries.length
    ? Math.round((purchasedGroceryCount / groceries.length) * 100)
    : 0;

  // Handlers for Bring from India
  const handleOpenBfiModal = (item?: BringFromIndiaItem) => {
    if (item) {
      setEditingBfi(item);
      setBfiName(item.name);
      setBfiQuantity(item.quantity);
      setBfiNotes(item.notes);
    } else {
      setEditingBfi(null);
      setBfiName('');
      setBfiQuantity('');
      setBfiNotes('');
    }
    setIsBfiModalOpen(true);
  };

  const handleSaveBfi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bfiName.trim()) return;

    if (editingBfi) {
      updateBringFromIndiaItem({
        ...editingBfi,
        name: bfiName.trim(),
        quantity: bfiQuantity.trim() || '1 pack',
        notes: bfiNotes.trim(),
      });
    } else {
      addBringFromIndiaItem({
        name: bfiName.trim(),
        quantity: bfiQuantity.trim() || '1 pack',
        notes: bfiNotes.trim(),
        purchased: false,
      });
    }
    setIsBfiModalOpen(false);
  };

  // Handlers for Personal Shopping
  const handleOpenPsiModal = (item?: PersonalShoppingItem) => {
    if (item) {
      setEditingPsi(item);
      setPsiName(item.name);
      setPsiCategory(item.category);
      setPsiQuantity(item.quantity);
      setPsiPriority(item.priority);
      setPsiNotes(item.notes);
    } else {
      setEditingPsi(null);
      setPsiName('');
      setPsiCategory('Equipment');
      setPsiQuantity('1 unit');
      setPsiPriority('high');
      setPsiNotes('');
    }
    setIsPsiModalOpen(true);
  };

  const handleSavePsi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!psiName.trim()) return;

    if (editingPsi) {
      updatePersonalShoppingItem({
        ...editingPsi,
        name: psiName.trim(),
        category: psiCategory,
        quantity: psiQuantity.trim(),
        priority: psiPriority,
        notes: psiNotes.trim(),
      });
    } else {
      addPersonalShoppingItem({
        name: psiName.trim(),
        category: psiCategory,
        quantity: psiQuantity.trim(),
        priority: psiPriority,
        notes: psiNotes.trim(),
        completed: false,
      });
    }
    setIsPsiModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (deleteType === 'bfi' && deleteId) {
      deleteBringFromIndiaItem(deleteId);
    } else if (deleteType === 'psi' && deleteId) {
      deletePersonalShoppingItem(deleteId);
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Calm Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">
            Kitchen Essentials
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monthly grocery requirements, items to bring from India, and personal shopping.
          </p>
        </div>

        {/* Clean Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#13151E] border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => navigate('/kitchen/grocery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'grocery'
                ? 'bg-white/10 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Monthly Grocery ({groceries.length})</span>
          </button>

          <button
            onClick={() => navigate('/kitchen/india')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'india'
                ? 'bg-white/10 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>From India ({bringFromIndia.length})</span>
          </button>

          <button
            onClick={() => navigate('/kitchen/shopping')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'shopping'
                ? 'bg-white/10 text-white font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Shopping ({personalShopping.length})</span>
          </button>
        </div>
      </div>

      {/* SECTION A: MONTHLY GROCERY REQUIREMENTS */}
      {currentTab === 'grocery' && (
        <div className="space-y-6">
          {/* Grocery Overview Card */}
          <div className="rounded-2xl bg-[#12141C] border border-white/5 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white font-['Outfit']">
                  Consolidated 30-Day Grocery Schedule
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold font-mono">
                  {purchasedGroceryCount} / {groceries.length} Purchased
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-lg">
                Automatically calculated from all 30 days of meals with exact gram weights.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 font-mono">
              <div className="text-right">
                <div className="text-[10px] text-zinc-400 uppercase">Estimated Total Cost</div>
                <div className="text-2xl font-extrabold text-emerald-400">
                  £{totalGroceryPrice.toFixed(2)}
                </div>
              </div>

              <div className="w-24 bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${groceryProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Categorized Grocery Sections */}
          <div className="space-y-6">
            {categories.map((cat) => {
              const items = groceries.filter((g) => g.category === cat.id);
              return (
                <GroceryCategorySection
                  key={cat.id}
                  category={cat.id}
                  title={`${cat.icon} ${cat.label}`}
                  icon={<Package className="w-4 h-4" />}
                  items={items}
                  onTogglePurchased={toggleGroceryPurchased}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION B: BRING FROM INDIA */}
      {currentTab === 'india' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Items to Bring From India
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Authentic Indian fitness staples, roasted chana sattu, black salt, and cast-iron cookware
              </p>
            </div>

            <button
              onClick={() => handleOpenBfiModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add India Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bringFromIndia.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                  item.purchased
                    ? 'bg-[#0E1017]/60 border-white/5 opacity-60'
                    : 'bg-[#12141C] border-white/5 hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => toggleBringFromIndiaPurchased(item.id)}
                      aria-label={item.purchased ? 'Mark unpurchased' : 'Mark purchased'}
                      className="text-zinc-500 hover:text-[#22c55e] transition-colors"
                    >
                      {item.purchased ? (
                        <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-500 hover:text-[#22c55e]" />
                      )}
                    </button>

                    <span className="text-xs font-mono font-bold text-zinc-200 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                      {item.quantity}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold font-['Outfit'] mb-1.5 ${
                      item.purchased ? 'line-through text-zinc-500' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </h3>

                  {item.notes && (
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1 pt-4 mt-4 border-t border-white/5">
                  <button
                    onClick={() => handleOpenBfiModal(item)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(item.id);
                      setDeleteType('bfi');
                      setIsConfirmDeleteOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION C: PERSONAL SHOPPING LIST */}
      {currentTab === 'shopping' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Personal Shopping List
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Kitchen scales, high-power blenders, gym straps, meal prep containers
              </p>
            </div>

            <button
              onClick={() => handleOpenPsiModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Shopping Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalShopping.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                  item.completed
                    ? 'bg-[#0E1017]/60 border-white/5 opacity-60'
                    : 'bg-[#12141C] border-white/5 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => togglePersonalShoppingCompleted(item.id)}
                      aria-label={item.completed ? 'Mark incomplete' : 'Mark completed'}
                      className="text-zinc-500 hover:text-[#22c55e] transition-colors"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-500 hover:text-[#22c55e]" />
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">
                        {item.category}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          item.priority === 'high'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : item.priority === 'medium'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`text-base font-bold font-['Outfit'] mb-1.5 ${
                      item.completed ? 'line-through text-zinc-500' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400 mb-2">Qty: {item.quantity}</div>

                  {item.notes && (
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1 pt-4 mt-4 border-t border-white/5">
                  <button
                    onClick={() => handleOpenPsiModal(item)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(item.id);
                      setDeleteType('psi');
                      setIsConfirmDeleteOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bring from India Modal */}
      <Modal
        isOpen={isBfiModalOpen}
        onClose={() => setIsBfiModalOpen(false)}
        title={editingBfi ? 'Edit Bring From India Item' : 'Add Item to Bring From India'}
      >
        <form onSubmit={handleSaveBfi} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Item Name *</label>
            <input
              type="text"
              required
              value={bfiName}
              onChange={(e) => setBfiName(e.target.value)}
              placeholder="e.g. Pure Roasted Chana Sattu"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Quantity</label>
            <input
              type="text"
              value={bfiQuantity}
              onChange={(e) => setBfiQuantity(e.target.value)}
              placeholder="e.g. 2 kg sealed packets"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Notes & Details</label>
            <textarea
              rows={3}
              value={bfiNotes}
              onChange={(e) => setBfiNotes(e.target.value)}
              placeholder="e.g. Ground roasted gram without barley or filler..."
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsBfiModalOpen(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs"
            >
              Save Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Personal Shopping Modal */}
      <Modal
        isOpen={isPsiModalOpen}
        onClose={() => setIsPsiModalOpen(false)}
        title={editingPsi ? 'Edit Shopping Item' : 'Add Personal Shopping Item'}
      >
        <form onSubmit={handleSavePsi} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Item Name *</label>
            <input
              type="text"
              required
              value={psiName}
              onChange={(e) => setPsiName(e.target.value)}
              placeholder="e.g. Digital Food Scale (1g precision)"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
              <select
                value={psiCategory}
                onChange={(e) => setPsiCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              >
                <option value="Equipment">Equipment</option>
                <option value="Appliances">Appliances</option>
                <option value="Storage">Storage</option>
                <option value="Fitness">Fitness Gear</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Quantity</label>
              <input
                type="text"
                value={psiQuantity}
                onChange={(e) => setPsiQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Priority</label>
              <select
                value={psiPriority}
                onChange={(e) => setPsiPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Notes</label>
            <textarea
              rows={3}
              value={psiNotes}
              onChange={(e) => setPsiNotes(e.target.value)}
              placeholder="Brand recommendations, specs, budget..."
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPsiModalOpen(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs"
            >
              Save Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteItem}
        title="Delete Item?"
        message="Are you sure you want to remove this item from your kitchen list?"
        confirmText="Delete Item"
      />
    </div>
  );
};
