"use client";

import { Flame, Trophy, CheckCircle2, Lightbulb } from "lucide-react";
import type { GameStats } from "../utils/storage";

interface StatsCardsProps {
  stats: GameStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      icon: <Flame size={22} className="text-orange-500" />,
      label: "Current Streak",
      value: stats.currentStreak,
      suffix: stats.currentStreak === 1 ? "day" : "days",
      bg: "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30",
    },
    {
      icon: <Trophy size={22} className="text-amber-500" />,
      label: "Best Streak",
      value: stats.bestStreak,
      suffix: stats.bestStreak === 1 ? "day" : "days",
      bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30",
    },
    {
      icon: <CheckCircle2 size={22} className="text-emerald-500" />,
      label: "Puzzles Solved",
      value: stats.totalSolved,
      suffix: "",
      bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30",
    },
    {
      icon: <Lightbulb size={22} className="text-sky-500" />,
      label: "Hints Used",
      value: stats.hintsUsed,
      suffix: "",
      bg: "bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`flex flex-col items-center gap-1 p-4 rounded-2xl border ${card.bg} transition-all`}
        >
          {card.icon}
          <span className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">
            {card.value}
          </span>
          {card.suffix && (
            <span className="text-xs text-slate-500 dark:text-slate-400">{card.suffix}</span>
          )}
          <span className="text-xs text-slate-500 dark:text-slate-400 text-center leading-tight">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}
