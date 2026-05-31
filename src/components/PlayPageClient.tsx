"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import GameScreen from "@/components/GameScreen";
import { getDailyPuzzle, PUZZLES_BY_DIFFICULTY } from "@/data/puzzles";
import type { Difficulty, Puzzle } from "@/data/puzzles";
import { useStats } from "@/components/ClientProviders";
import { trackEvent } from "@/utils/analytics";

export default function PlayPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { stats, refreshStats } = useStats();

  const mode = searchParams.get("mode");
  const difficulty = searchParams.get("difficulty") as Difficulty | null;
  const r = searchParams.get("r"); // changes on each "Play Another" to force a new puzzle

  // Pure computation — no side effects. Re-runs whenever mode, difficulty, or r changes.
  const { puzzle, isDaily } = useMemo<{ puzzle: Puzzle | null; isDaily: boolean }>(() => {
    if (mode === "daily") {
      return { puzzle: getDailyPuzzle(), isDaily: true };
    }
    if (difficulty && ["easy", "medium", "hard"].includes(difficulty)) {
      const pool = PUZZLES_BY_DIFFICULTY[difficulty];
      const p = pool[Math.floor(Math.random() * pool.length)];
      return { puzzle: p, isDaily: false };
    }
    return { puzzle: null, isDaily: false };
  }, [mode, difficulty, r]);

  // Side effects (analytics) are correctly placed in useEffect, not useMemo.
  useEffect(() => {
    if (!puzzle) return;
    if (isDaily) {
      trackEvent("daily_puzzle_started", { puzzleId: puzzle.id });
    } else {
      trackEvent("puzzle_started", { puzzleId: puzzle.id, difficulty: puzzle.difficulty });
    }
  }, [puzzle, isDaily]);

  if (!puzzle) {
    // Invalid params — redirect home.
    router.replace("/");
    return null;
  }

  const handleBack = () => {
    refreshStats();
    router.push(isDaily ? "/" : "/difficulty");
  };

  const handleHome = () => {
    refreshStats();
    router.push("/");
  };

  const handlePlayAnother = () => {
    if (isDaily) {
      router.push("/difficulty");
    } else {
      // Changing r causes useMemo to re-run and pick a new random puzzle.
      router.replace(`/play?difficulty=${puzzle.difficulty}&r=${Date.now()}`);
    }
  };

  return (
    <GameScreen
      key={`${isDaily ? "daily" : "practice"}-${puzzle.id}`}
      puzzle={puzzle}
      isDaily={isDaily}
      onBack={handleBack}
      onHome={handleHome}
      onPlayAnother={handlePlayAnother}
      currentStreak={stats.currentStreak}
      totalSolved={stats.totalSolved}
      onStatsUpdate={refreshStats}
    />
  );
}
