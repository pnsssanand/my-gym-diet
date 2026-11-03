import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoItem } from '../../types';
import { CheckCircle2, Circle, ChevronRight, CheckSquare } from 'lucide-react';

interface TodosPreviewProps {
  todos: TodoItem[];
  onToggleTodo: (todoId: string) => void;
}

export const TodosPreview: React.FC<TodosPreviewProps> = ({ todos, onToggleTodo }) => {
  const navigate = useNavigate();

  const previewTodos = todos.slice(0, 4);
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="rounded-2xl bg-[#12141C] border border-white/5 p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white font-['Outfit']">Today's Tasks</h3>
          <span className="text-[11px] font-mono text-zinc-400">
            ({completedCount}/{todos.length})
          </span>
        </div>

        <button
          onClick={() => navigate('/todos')}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <span>All Tasks</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Task Items */}
      <div className="space-y-2">
        {previewTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              todo.completed
                ? 'bg-[#0E1017]/60 border-white/5 opacity-55'
                : 'bg-[#161922] border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onToggleTodo(todo.id)}
                aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                className="shrink-0 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-zinc-500 hover:text-emerald-400" />
                )}
              </button>

              <span
                className={`text-xs truncate ${
                  todo.completed
                    ? 'line-through text-zinc-500 font-normal'
                    : 'text-zinc-200 font-medium'
                }`}
              >
                {todo.title}
              </span>
            </div>

            <span className="text-[10px] text-zinc-500 capitalize shrink-0 ml-2 font-mono">
              {todo.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
