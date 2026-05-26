import { BarChart3, CheckCircle2, Flame } from "lucide-react";
import type { GameStats } from "../utils/storage";
import StatsCards from "./StatsCards";
import AdPlaceholder from "./AdPlaceholder";

interface HomeScreenProps {
  stats: GameStats;
  onPlayDaily: () => void;
  onChooseDifficulty: () => void;
}

export default function HomeScreen({ stats, onPlayDaily, onChooseDifficulty }: HomeScreenProps) {
  return (
    <main className="flex flex-col items-center gap-8 px-4 py-8 max-w-lg mx-auto w-full">
      {/* Hero */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="text-6xl mb-1" role="img" aria-label="puzzle emoji">🧩</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
          Daily Emoji Sudoku
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          A fresh emoji logic puzzle every day.
        </p>

        {/* Today status badge */}
        {stats.todayCompleted && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold">
            <CheckCircle2 size={16} />
            Today's Puzzle Completed!
          </div>
        )}
        {!stats.todayCompleted && stats.currentStreak > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-semibold">
            <Flame size={16} />
            {stats.currentStreak} day streak — keep it going!
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={onPlayDaily}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-lg shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/50 transition-all"
          aria-label="Play today's daily puzzle"
        >
          <span className="text-2xl" role="img" aria-label="calendar">📅</span>
          Play Today's Puzzle
        </button>
        <button
          onClick={onChooseDifficulty}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 active:scale-95 text-slate-700 dark:text-slate-200 font-bold text-lg transition-all"
          aria-label="Choose puzzle difficulty"
        >
          <span className="text-2xl" role="img" aria-label="game">🎮</span>
          Choose Difficulty
        </button>
      </div>

      {/* Stats */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400">
          <BarChart3 size={16} />
          <span className="text-sm font-semibold uppercase tracking-wide">Your Stats</span>
        </div>
        <StatsCards stats={stats} />
      </div>

      {/* Top ad banner */}
      <AdPlaceholder variant="top-banner" className="w-full" />

      {/* Puzzle themes preview */}
      <div className="w-full">
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 mb-4 font-medium uppercase tracking-wide">
          Emoji Themes
        </p>
        <div className="grid grid-cols-5 gap-2">
          {[
            { name: "Food", emojis: ["🍕", "🍔", "🍟", "🌮"] },
            { name: "Animals", emojis: ["🐶", "🐱", "🐸", "🐵"] },
            { name: "Sports", emojis: ["⚽", "🏀", "🏈", "⚾"] },
            { name: "Space", emojis: ["🌙", "⭐", "🪐", "🚀"] },
            { name: "Ocean", emojis: ["🐠", "🐙", "🐬", "🐚"] },
          ].map((theme) => (
            <div
              key={theme.name}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
            >
              <div className="grid grid-cols-2 gap-0.5">
                {theme.emojis.map((e) => (
                  <span key={e} className="text-base leading-tight text-center" role="img" aria-hidden="true">
                    {e}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {theme.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
