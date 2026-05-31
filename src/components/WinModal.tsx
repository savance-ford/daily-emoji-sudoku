"use client";

import { useEffect, useMemo, useRef } from "react";
import { Share2, Play, Home, X } from "lucide-react";
import type { Difficulty } from "../data/puzzles";
import AdPlaceholder from "./AdPlaceholder";

interface WinModalProps {
  difficulty: Difficulty;
  hintsUsed: number;
  isDaily: boolean;
  streak: number;
  totalSolved: number;
  puzzleTitle: string;
  onShare: () => void;
  onPlayAnother: () => void;
  onHome: () => void;
  onClose: () => void;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
  medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
  hard: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30",
};

export default function WinModal({
  difficulty,
  hintsUsed,
  isDaily,
  streak,
  totalSolved,
  puzzleTitle,
  onShare,
  onPlayAnother,
  onHome,
  onClose,
}: WinModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const confettiDots = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.08}s`,
        background: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"][i % 5],
      })),
    []
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Puzzle complete!"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Confetti dots (CSS-only celebration) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {confettiDots.map((dot) => (
          <div
            key={dot.id}
            className="confetti-dot"
            style={{
              left: dot.left,
              animationDelay: dot.animationDelay,
              background: dot.background,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 flex flex-col gap-5 animate-slide-up">
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Trophy */}
        <div className="text-center">
          <div className="text-6xl mb-2" role="img" aria-label="Trophy">🏆</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Puzzle Complete!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {puzzleTitle}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mx-auto ${DIFFICULTY_COLORS[difficulty]}`}>
              {DIFFICULTY_LABELS[difficulty]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Difficulty</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold text-amber-500">{hintsUsed}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Hint{hintsUsed !== 1 ? "s" : ""} used
            </span>
          </div>
          {isDaily ? (
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold text-orange-500">{streak}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Day streak
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold text-emerald-500">{totalSolved}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Total solved
              </span>
            </div>
          )}
        </div>

        {/* Ad placeholder (shows every few completions in production) */}
        <AdPlaceholder variant="completion" />

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onShare}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors active:scale-95"
            aria-label="Share your result"
          >
            <Share2 size={18} />
            Share Result
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onPlayAnother}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:border-emerald-300 dark:hover:border-emerald-700 transition-all active:scale-95"
              aria-label="Play another puzzle"
            >
              <Play size={16} />
              Play Again
            </button>
            <button
              onClick={onHome}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:border-slate-400 dark:hover:border-slate-500 transition-all active:scale-95"
              aria-label="Back to home"
            >
              <Home size={16} />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
