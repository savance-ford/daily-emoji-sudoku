import { Lightbulb, Eraser, RotateCcw, CheckCircle2 } from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";

interface EmojiPickerProps {
  emojis: [string, string, string, string];
  selectedEmoji: string | null;
  onEmojiClick: (emoji: string) => void;
  onErase: () => void;
  onHint: () => void;
  onCheck: () => void;
  onReset: () => void;
  hintCount: number;
  hasSelectedCell: boolean;
  disabled?: boolean;
}

export default function EmojiPicker({
  emojis,
  selectedEmoji,
  onEmojiClick,
  onErase,
  onHint,
  onCheck,
  onReset,
  hintCount,
  hasSelectedCell,
  disabled = false,
}: EmojiPickerProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
      {/* Emoji tiles */}
      <div className="grid grid-cols-4 gap-3">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiClick(emoji)}
            disabled={disabled}
            className={`flex items-center justify-center h-16 rounded-2xl text-3xl border-2 transition-all active:scale-90 shadow-sm
              ${
                selectedEmoji === emoji
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 scale-105 shadow-emerald-200/50 dark:shadow-emerald-900/50"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 disabled:opacity-50 disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700"
              }
            `}
            aria-label={`Place ${emoji}`}
            aria-pressed={selectedEmoji === emoji}
          >
            <span role="img" aria-hidden="true">{emoji}</span>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={onErase}
          disabled={disabled || !hasSelectedCell}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:border-slate-400 dark:hover:border-slate-500 transition-all active:scale-95"
          aria-label="Erase selected cell"
        >
          <Eraser size={18} />
          <span className="text-xs font-medium">Erase</span>
        </button>

        <button
          onClick={onHint}
          disabled={disabled}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:border-amber-400 dark:hover:border-amber-600 disabled:opacity-50 transition-all active:scale-95"
          aria-label={`Use hint. ${hintCount} hints used so far.`}
        >
          <Lightbulb size={18} />
          <span className="text-xs font-medium">Hint{hintCount > 0 ? ` (${hintCount})` : ""}</span>
        </button>

        <button
          onClick={onCheck}
          disabled={disabled}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 hover:border-sky-400 dark:hover:border-sky-600 disabled:opacity-50 transition-all active:scale-95"
          aria-label="Check puzzle answers"
        >
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">Check</span>
        </button>

        <button
          onClick={onReset}
          disabled={disabled}
          className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-600 hover:text-rose-500 dark:hover:text-rose-400 disabled:opacity-50 transition-all active:scale-95"
          aria-label="Reset puzzle to starting state"
        >
          <RotateCcw size={18} />
          <span className="text-xs font-medium">Reset</span>
        </button>
      </div>

      {/* Rewarded ad placeholder for hints */}
      <AdPlaceholder variant="rewarded-hint" />
    </div>
  );
}
