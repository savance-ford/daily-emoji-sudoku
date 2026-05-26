// Daily Emoji Sudoku – Main App
// Manages top-level routing between screens and global state (dark mode, stats).
// Future expansion: Add React Router for deep linking to specific puzzles.

import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import DifficultySelector from "./components/DifficultySelector";
import GameScreen from "./components/GameScreen";
import SeoContent from "./components/SeoContent";
import type { Puzzle, Difficulty } from "./data/puzzles";
import { getDailyPuzzle, PUZZLES_BY_DIFFICULTY } from "./data/puzzles";
import { getStats, isDarkMode, setDarkMode, setLastDifficulty } from "./utils/storage";
import type { GameStats } from "./utils/storage";
import { trackEvent } from "./utils/analytics";

type Screen = "home" | "difficulty" | "game";

interface GameState {
  puzzle: Puzzle;
  isDaily: boolean;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [stats, setStats] = useState<GameStats>(getStats());
  const [darkMode, setDarkModeState] = useState<boolean>(isDarkMode);

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Track app open
  useEffect(() => {
    trackEvent("app_opened");
  }, []);

  const refreshStats = useCallback(() => {
    setStats(getStats());
  }, []);

  const handleToggleDark = useCallback(() => {
    const next = !darkMode;
    setDarkModeState(next);
    setDarkMode(next);
    trackEvent("dark_mode_toggled", { enabled: next });
  }, [darkMode]);

  const handlePlayDaily = useCallback(() => {
    const puzzle = getDailyPuzzle();
    setGameState({ puzzle, isDaily: true });
    setScreen("game");
    trackEvent("daily_puzzle_started", { puzzleId: puzzle.id });
  }, []);

  const handleChooseDifficulty = useCallback(() => {
    setScreen("difficulty");
  }, []);

  const handleSelectDifficulty = useCallback((difficulty: Difficulty) => {
    const pool = PUZZLES_BY_DIFFICULTY[difficulty];
    // Pick a random puzzle from the difficulty pool
    const puzzle = pool[Math.floor(Math.random() * pool.length)];
    setGameState({ puzzle, isDaily: false });
    setScreen("game");
    setLastDifficulty(difficulty);
    trackEvent("puzzle_started", { puzzleId: puzzle.id, difficulty });
    trackEvent("difficulty_selected", { difficulty });
  }, []);

  const handleBackFromDifficulty = useCallback(() => {
    setScreen("home");
  }, []);

  const handleBackFromGame = useCallback(() => {
    refreshStats();
    if (gameState?.isDaily) {
      setScreen("home");
    } else {
      setScreen("difficulty");
    }
  }, [gameState, refreshStats]);

  const handleGoHome = useCallback(() => {
    refreshStats();
    setScreen("home");
    setGameState(null);
  }, [refreshStats]);

  const handlePlayAnother = useCallback(() => {
    if (!gameState) return;
    if (gameState.isDaily) {
      // After daily, go to difficulty selector for more fun
      setScreen("difficulty");
      setGameState(null);
    } else {
      // Same difficulty, new random puzzle
      const difficulty = gameState.puzzle.difficulty;
      const pool = PUZZLES_BY_DIFFICULTY[difficulty];
      const next = pool[Math.floor(Math.random() * pool.length)];
      setGameState({ puzzle: next, isDaily: false });
      trackEvent("puzzle_started", { puzzleId: next.id, difficulty });
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-300">
      <Header
        darkMode={darkMode}
        onToggleDark={handleToggleDark}
        onHome={handleGoHome}
      />

      <div className="flex flex-col min-h-[calc(100vh-56px)]">
        {screen === "home" && (
          <>
            <HomeScreen
              stats={stats}
              onPlayDaily={handlePlayDaily}
              onChooseDifficulty={handleChooseDifficulty}
            />
            <SeoContent />
          </>
        )}

        {screen === "difficulty" && (
          <DifficultySelector
            onSelect={handleSelectDifficulty}
            onBack={handleBackFromDifficulty}
          />
        )}

        {screen === "game" && gameState && (
          <GameScreen
            key={gameState.puzzle.id}
            puzzle={gameState.puzzle}
            isDaily={gameState.isDaily}
            onBack={handleBackFromGame}
            onHome={handleGoHome}
            onPlayAnother={handlePlayAnother}
            currentStreak={stats.currentStreak}
            totalSolved={stats.totalSolved}
            onStatsUpdate={refreshStats}
          />
        )}
      </div>
    </div>
  );
}
