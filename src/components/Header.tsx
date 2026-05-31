"use client";

import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  onHome: () => void;
}

export default function Header({ darkMode, onToggleDark, onHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          aria-label="Go to home"
        >
          <span className="text-2xl" role="img" aria-label="puzzle">🧩</span>
          <span className="hidden sm:inline">Daily Emoji Sudoku</span>
          <span className="sm:hidden font-bold text-base">DES</span>
        </button>

        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
