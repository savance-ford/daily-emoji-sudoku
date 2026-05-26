import type { Difficulty } from "../data/puzzles";

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DIFFICULTIES: { value: Difficulty; label: string; desc: string; emoji: string; color: string }[] = [
  {
    value: "easy",
    label: "Easy",
    desc: "Many cells filled in. Great for beginners.",
    emoji: "🌱",
    color:
      "border-emerald-200 bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40",
  },
  {
    value: "medium",
    label: "Medium",
    desc: "Balanced challenge. Requires some logic.",
    emoji: "🔥",
    color:
      "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:hover:bg-amber-900/40",
  },
  {
    value: "hard",
    label: "Hard",
    desc: "Minimal hints. For sharp minds.",
    emoji: "⚡",
    color:
      "border-rose-200 bg-rose-50 hover:border-rose-400 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-900/20 dark:hover:bg-rose-900/40",
  },
];

export default function DifficultySelector({ onSelect, onBack }: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-md mx-auto w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
          Choose Difficulty
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Pick your challenge level
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.value}
            onClick={() => onSelect(d.value)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all active:scale-95 ${d.color}`}
            aria-label={`Play ${d.label} puzzle`}
          >
            <span className="text-3xl" role="img" aria-label={d.label}>
              {d.emoji}
            </span>
            <div>
              <div className="font-bold text-slate-800 dark:text-white text-lg">
                {d.label}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {d.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-sm transition-colors mt-2"
        aria-label="Go back to home"
      >
        ← Back to Home
      </button>
    </div>
  );
}
