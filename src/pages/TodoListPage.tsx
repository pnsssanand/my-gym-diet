import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { TodoItem } from '../types';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import {
  CheckSquare,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Edit3,
  Trash2,
} from 'lucide-react';

export const TodoListPage: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodoCompleted } = useDiet();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TodoItem['category']>('Gym');
  const [priority, setPriority] = useState<TodoItem['priority']>('high');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  // Delete modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const categories: Array<TodoItem['category']> = [
    'Gym',
    'Diet',
    'Grocery',
    'Personal',
    'Other',
  ];

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  const filteredTodos = todos.filter((t) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'pending'
        ? !t.completed
        : t.completed;

    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesTab && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingTodo(null);
    setTitle('');
    setCategory('Gym');
    setPriority('high');
    setDueDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (todo: TodoItem) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setCategory(todo.category);
    setPriority(todo.priority);
    setDueDate(todo.dueDate);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo) {
      updateTodo({
        ...editingTodo,
        title: title.trim(),
        category,
        priority,
        dueDate,
      });
    } else {
      addTodo({
        title: title.trim(),
        category,
        priority,
        dueDate,
        completed: false,
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteTodo(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Calm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">
            Tasks ({todos.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {completedCount} completed • {pendingCount} pending
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Clean Tabs & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#12141C] border border-white/5 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTodos.length === 0 ? (
          <div className="rounded-2xl p-12 text-center bg-[#12141C] border border-white/5">
            <p className="text-zinc-400 text-xs">No tasks found matching your filter.</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`rounded-xl p-3 sm:p-3.5 border transition-all flex items-center justify-between gap-4 ${
                todo.completed
                  ? 'bg-[#0E1017]/60 border-white/5 opacity-55'
                  : 'bg-[#12141C] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => toggleTodoCompleted(todo.id)}
                  aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="shrink-0 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500 hover:text-emerald-400" />
                  )}
                </button>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5 text-[11px] font-mono text-zinc-400">
                    <span className="capitalize font-medium text-zinc-300">
                      {todo.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-zinc-500" /> Due {todo.dueDate}
                    </span>
                  </div>

                  <span
                    className={`text-sm truncate ${
                      todo.completed ? 'line-through text-zinc-500 font-normal' : 'text-white font-medium'
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
              </div>

              {/* Priority & Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5">
                  {todo.priority}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(todo)}
                    title="Edit Task"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingId(todo.id);
                      setIsConfirmDeleteOpen(true);
                    }}
                    title="Delete Task"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTodo ? 'Edit Task' : 'Add Task'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Incline Dumbbell Bench 24kg x 8"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs"
            >
              {editingTodo ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task?"
        message="Are you sure you want to delete this task?"
        confirmText="Delete Task"
      />
    </div>
  );
};
