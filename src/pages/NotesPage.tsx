import React, { useState } from 'react';
import { useDiet } from '../context/DietContext';
import { NoteItem } from '../types';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import {
  StickyNote,
  Plus,
  Pin,
  Search,
  Edit3,
  Trash2,
  Calendar,
} from 'lucide-react';

export const NotesPage: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, togglePinNote } = useDiet();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoteItem['category']>('Diet');
  const [tags, setTags] = useState('');

  // Delete modal
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const categories: Array<NoteItem['category']> = [
    'Diet',
    'Workout',
    'Grocery',
    'Ideas',
    'General',
  ];

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Sort pinned notes to the very top
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleOpenAdd = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setCategory('Diet');
    setTags('Dairy-Free, Target');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note: NoteItem) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setTags(note.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingNote) {
      updateNote({
        ...editingNote,
        title: title.trim(),
        content: content.trim(),
        category,
        tags: parsedTags,
      });
    } else {
      addNote({
        title: title.trim(),
        content: content.trim(),
        category,
        pinned: false,
        tags: parsedTags,
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingNoteId) {
      deleteNote(deletingNoteId);
      setDeletingNoteId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Calm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">
            Notes ({notes.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Pin nutrition notes, progressive overload numbers, and grocery tips.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Clean Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search notes by keyword or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12141C] border border-white/5 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white/10 text-white font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {sortedNotes.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-[#12141C] border border-white/5">
          <p className="text-zinc-400 text-xs">No notes found. Create your first note above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                note.pinned
                  ? 'border-emerald-500/30 bg-[#141B18]'
                  : 'border-white/5 bg-[#12141C] hover:border-white/10'
              }`}
            >
              <div>
                {/* Note Top Bar: Category & Pin */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
                    {note.category}
                  </span>

                  <button
                    onClick={() => togglePinNote(note.id)}
                    title={note.pinned ? 'Unpin note' : 'Pin to top'}
                    className={`p-1 rounded-md transition-colors ${
                      note.pinned
                        ? 'text-emerald-400 bg-emerald-500/15'
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Note Title */}
                <h3 className="text-base font-semibold text-white font-['Outfit'] mb-1.5 leading-snug">
                  {note.title}
                </h3>

                {/* Content */}
                <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed mb-3">
                  {note.content}
                </p>

                {/* Tags */}
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded-md font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp & Actions */}
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-600" />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(note)}
                    title="Edit Note"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingNoteId(note.id);
                      setIsConfirmDeleteOpen(true);
                    }}
                    title="Delete Note"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Edit / Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNote ? 'Edit Note' : 'Create Note'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Soya Chunks Digestibility Routine"
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
              <label className="block text-xs font-semibold text-zinc-400 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="High Protein, Recovery, Sattu"
                className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Content *</label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter details, weights, notes..."
              className="w-full px-3 py-2 rounded-xl bg-[#161A24] border border-white/10 text-white text-xs leading-relaxed"
            />
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
              {editingNote ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Note?"
        message="Are you sure you want to delete this note?"
        confirmText="Delete Note"
      />
    </div>
  );
};
