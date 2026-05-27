// Daily Emoji Sudoku – Main App
// Manages lightweight client-side routing, screens, and global state (dark mode, stats).
// The legal pages are intentionally included in the app so ad networks and users can find them at stable URLs.

import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import DifficultySelector from "./components/DifficultySelector";
import GameScreen from "./components/GameScreen";
import SeoContent from "./components/SeoContent";
import Footer from "./components/Footer";
import LegalPage from "./components/LegalPage";
import MarketingPage from "./components/MarketingPage";
import type { Puzzle, Difficulty } from "./data/puzzles";
import { getDailyPuzzle, PUZZLES_BY_DIFFICULTY } from "./data/puzzles";
import { getStats, isDarkMode, setDarkMode, setLastDifficulty } from "./utils/storage";
import type { GameStats } from "./utils/storage";
import { trackEvent } from "./utils/analytics";

type Screen =
  | "home"
  | "difficulty"
  | "game"
  | "howTo"
  | "dailyLanding"
  | "easyLanding"
  | "privacy"
  | "terms"
  | "disclaimer";
type LegalScreen = "privacy" | "terms" | "disclaimer";

interface GameState {
  puzzle: Puzzle;
  isDaily: boolean;
}

const PATH_TO_SCREEN: Record<string, Screen> = {
  "/": "home",
  "/difficulty": "difficulty",
  "/how-to-play-emoji-sudoku": "howTo",
  "/daily-emoji-sudoku": "dailyLanding",
  "/easy-emoji-sudoku": "easyLanding",
  "/privacy": "privacy",
  "/privacy-policy": "privacy",
  "/terms": "terms",
  "/terms-of-use": "terms",
  "/disclaimer": "disclaimer",
};

const SCREEN_TO_PATH: Record<Exclude<Screen, "game">, string> = {
  home: "/",
  difficulty: "/difficulty",
  howTo: "/how-to-play-emoji-sudoku",
  dailyLanding: "/daily-emoji-sudoku",
  easyLanding: "/easy-emoji-sudoku",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
};

function screenFromPathname(pathname: string): Screen {
  return PATH_TO_SCREEN[pathname] ?? "home";
}

function updateDocumentMeta(screen: Screen) {
  const titles: Record<Screen, string> = {
    home: "Daily Emoji Sudoku - Free Online Emoji Sudoku Puzzle",
    difficulty: "Choose a Puzzle - Daily Emoji Sudoku",
    game: "Play Emoji Sudoku - Daily Emoji Sudoku",
    howTo: "How to Play Emoji Sudoku - Rules and Beginner Guide",
    dailyLanding: "Daily Emoji Sudoku - Play Today’s Free Puzzle",
    easyLanding: "Easy Emoji Sudoku - Beginner-Friendly Free Puzzle",
    privacy: "Privacy Policy - Emoji Sudoku",
    terms: "Terms of Use - Emoji Sudoku",
    disclaimer: "Disclaimer - Emoji Sudoku",
  };

  const descriptions: Record<Screen, string> = {
    home: "Play Daily Emoji Sudoku, a free online emoji puzzle game with daily puzzles, hints, streaks, and mobile-friendly Sudoku-style logic grids.",
    difficulty: "Choose an easy, medium, or hard Emoji Sudoku puzzle and play free online on mobile or desktop.",
    game: "Play a free Emoji Sudoku puzzle online. Fill the grid with emojis using Sudoku-style logic rules.",
    howTo: "Learn how to play Emoji Sudoku with simple rules, examples, and beginner tips for solving 4x4 emoji logic puzzles.",
    dailyLanding: "Play today’s Daily Emoji Sudoku puzzle, a quick free daily brain teaser with emojis, hints, and streak tracking.",
    easyLanding: "Play Easy Emoji Sudoku, a beginner-friendly free online Sudoku puzzle using emojis instead of numbers.",
    privacy: "Read the Privacy Policy for Emoji Sudoku.",
    terms: "Read the Terms of Use for Emoji Sudoku.",
    disclaimer: "Read the Disclaimer for Emoji Sudoku.",
  };

  document.title = titles[screen];

  const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = descriptions[screen];
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => screenFromPathname(window.location.pathname));
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [stats, setStats] = useState<GameStats>(getStats());
  const [darkMode, setDarkModeState] = useState<boolean>(isDarkMode);

  // Apply dark mode class to document root.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Keep document title in sync with the current screen.
  useEffect(() => {
    updateDocumentMeta(screen);
  }, [screen]);

  // Track app open once.
  useEffect(() => {
    trackEvent("app_opened");
  }, []);

  // Support browser back/forward for public legal pages and the difficulty screen.
  useEffect(() => {
    const onPopState = () => {
      const nextScreen = screenFromPathname(window.location.pathname);
      setScreen(nextScreen);
      if (nextScreen !== "game") {
        setGameState(null);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const refreshStats = useCallback(() => {
    setStats(getStats());
  }, []);

  const navigateToScreen = useCallback((nextScreen: Exclude<Screen, "game">) => {
    const nextPath = SCREEN_TO_PATH[nextScreen];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setScreen(nextScreen);
    if (nextScreen !== "difficulty") {
      setGameState(null);
    }
  }, []);

  const navigateLegal = useCallback((legalScreen: LegalScreen) => {
    navigateToScreen(legalScreen);
    trackEvent("legal_page_viewed", { page: legalScreen });
  }, [navigateToScreen]);

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
    navigateToScreen("difficulty");
  }, [navigateToScreen]);

  const handleSelectDifficulty = useCallback((difficulty: Difficulty) => {
    const pool = PUZZLES_BY_DIFFICULTY[difficulty];
    // Pick a random puzzle from the difficulty pool.
    const puzzle = pool[Math.floor(Math.random() * pool.length)];
    setGameState({ puzzle, isDaily: false });
    setScreen("game");
    setLastDifficulty(difficulty);
    trackEvent("puzzle_started", { puzzleId: puzzle.id, difficulty });
    trackEvent("difficulty_selected", { difficulty });
  }, []);

  const handleBackFromDifficulty = useCallback(() => {
    navigateToScreen("home");
  }, [navigateToScreen]);

  const handleBackFromGame = useCallback(() => {
    refreshStats();
    if (gameState?.isDaily) {
      navigateToScreen("home");
    } else {
      navigateToScreen("difficulty");
    }
  }, [gameState, refreshStats, navigateToScreen]);

  const handleGoHome = useCallback(() => {
    refreshStats();
    navigateToScreen("home");
  }, [refreshStats, navigateToScreen]);

  const handlePlayAnother = useCallback(() => {
    if (!gameState) return;
    if (gameState.isDaily) {
      // After daily, go to difficulty selector for more fun.
      navigateToScreen("difficulty");
    } else {
      // Same difficulty, new random puzzle.
      const difficulty = gameState.puzzle.difficulty;
      const pool = PUZZLES_BY_DIFFICULTY[difficulty];
      const next = pool[Math.floor(Math.random() * pool.length)];
      setGameState({ puzzle: next, isDaily: false });
      trackEvent("puzzle_started", { puzzleId: next.id, difficulty });
    }
  }, [gameState, navigateToScreen]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-300">
      <Header
        darkMode={darkMode}
        onToggleDark={handleToggleDark}
        onHome={handleGoHome}
      />

      <div className="flex flex-col min-h-[calc(100vh-56px)]">
        <div className="flex-1">
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

          {screen === "howTo" && (
            <MarketingPage
              type="howTo"
              onPlayDaily={handlePlayDaily}
              onSelectDifficulty={handleSelectDifficulty}
            />
          )}

          {screen === "dailyLanding" && (
            <MarketingPage
              type="daily"
              onPlayDaily={handlePlayDaily}
              onSelectDifficulty={handleSelectDifficulty}
            />
          )}

          {screen === "easyLanding" && (
            <MarketingPage
              type="easy"
              onPlayDaily={handlePlayDaily}
              onSelectDifficulty={handleSelectDifficulty}
            />
          )}

          {screen === "game" && gameState && (
            <GameScreen
              key={`${gameState.isDaily ? "daily" : "practice"}-${gameState.puzzle.id}`}
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

          {(screen === "privacy" || screen === "terms" || screen === "disclaimer") && (
            <LegalPage
              type={screen}
              onBack={handleGoHome}
              onNavigate={navigateLegal}
            />
          )}
        </div>

        <Footer onNavigateLegal={navigateLegal} />
      </div>
    </div>
  );
}
