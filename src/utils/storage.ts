// LocalStorage utilities for Daily Emoji Sudoku
// Handles streaks, stats, puzzle progress, and settings.
// Future expansion: Replace with Supabase user accounts for cross-device sync.

import type { EmojiGrid } from "../data/puzzles";
import { getTodayKey } from "../data/puzzles";

const KEYS = {
  CURRENT_STREAK: "des_current_streak",
  BEST_STREAK: "des_best_streak",
  TOTAL_SOLVED: "des_total_solved",
  HINTS_USED: "des_hints_used",
  DAILY_COMPLETED: "des_daily_completed", // JSON object: { "YYYY-MM-DD": true }
  LAST_DAILY_DATE: "des_last_daily_date",
  LAST_DIFFICULTY: "des_last_difficulty",
  IN_PROGRESS_PREFIX: "des_progress_", // + puzzleId
  DARK_MODE: "des_dark_mode",
};

export interface GameStats {
  currentStreak: number;
  bestStreak: number;
  totalSolved: number;
  hintsUsed: number;
  todayCompleted: boolean;
}

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable – silently fail
  }
}

export function getStats(): GameStats {
  const dailyCompleted = getItem<Record<string, boolean>>(
    KEYS.DAILY_COMPLETED,
    {}
  );
  const todayKey = getTodayKey();
  return {
    currentStreak: getItem<number>(KEYS.CURRENT_STREAK, 0),
    bestStreak: getItem<number>(KEYS.BEST_STREAK, 0),
    totalSolved: getItem<number>(KEYS.TOTAL_SOLVED, 0),
    hintsUsed: getItem<number>(KEYS.HINTS_USED, 0),
    todayCompleted: !!dailyCompleted[todayKey],
  };
}

export function recordPuzzleSolved(isDaily: boolean): GameStats {
  const stats = getStats();
  let newStreak = stats.currentStreak;
  let newBest = stats.bestStreak;
  let newTotal = stats.totalSolved;
  let todayCompleted = stats.todayCompleted;

  if (isDaily) {
    const todayKey = getTodayKey();
    const dailyCompleted = getItem<Record<string, boolean>>(KEYS.DAILY_COMPLETED, {});

    // A daily puzzle should only count once per calendar day, even if the user
    // replays it or the win modal is triggered again after a refresh.
    if (!dailyCompleted[todayKey]) {
      newTotal += 1;
      dailyCompleted[todayKey] = true;
      todayCompleted = true;
      setItem(KEYS.DAILY_COMPLETED, dailyCompleted);

      const lastDate = getItem<string>(KEYS.LAST_DAILY_DATE, "");
      const yesterday = getYesterdayKey();

      newStreak = lastDate === yesterday ? stats.currentStreak + 1 : 1;
      setItem(KEYS.LAST_DAILY_DATE, todayKey);
      setItem(KEYS.CURRENT_STREAK, newStreak);

      newBest = Math.max(newStreak, stats.bestStreak);
      setItem(KEYS.BEST_STREAK, newBest);
      setItem(KEYS.TOTAL_SOLVED, newTotal);
    }
  } else {
    newTotal += 1;
    setItem(KEYS.TOTAL_SOLVED, newTotal);
  }

  return {
    currentStreak: newStreak,
    bestStreak: newBest,
    totalSolved: newTotal,
    hintsUsed: stats.hintsUsed,
    todayCompleted,
  };
}

export function recordHintUsed(): number {
  const current = getItem<number>(KEYS.HINTS_USED, 0);
  const updated = current + 1;
  setItem(KEYS.HINTS_USED, updated);
  return updated;
}

export function saveProgress(puzzleId: string, board: EmojiGrid): void {
  setItem(KEYS.IN_PROGRESS_PREFIX + puzzleId, board);
}

export function loadProgress(puzzleId: string): EmojiGrid | null {
  return getItem<EmojiGrid | null>(KEYS.IN_PROGRESS_PREFIX + puzzleId, null);
}

export function clearProgress(puzzleId: string): void {
  try {
    localStorage.removeItem(KEYS.IN_PROGRESS_PREFIX + puzzleId);
  } catch {
    // noop
  }
}

export function getLastDifficulty(): string {
  return getItem<string>(KEYS.LAST_DIFFICULTY, "easy");
}

export function setLastDifficulty(difficulty: string): void {
  setItem(KEYS.LAST_DIFFICULTY, difficulty);
}

export function isDarkMode(): boolean {
  return getItem<boolean>(KEYS.DARK_MODE, false);
}

export function setDarkMode(value: boolean): void {
  setItem(KEYS.DARK_MODE, value);
}

function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
