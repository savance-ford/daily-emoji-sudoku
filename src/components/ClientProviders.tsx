"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStats, isDarkMode, setDarkMode } from "@/utils/storage";
import { trackEvent } from "@/utils/analytics";
import type { GameStats } from "@/utils/storage";
import { useRouter } from "next/navigation";

// ─── Dark Mode Context ──────────────────────────────────────────────────────

interface DarkModeContextValue {
  darkMode: boolean;
  toggleDark: () => void;
}

export const DarkModeContext = createContext<DarkModeContextValue>({
  darkMode: false,
  toggleDark: () => {},
});

export function useDarkMode() {
  return useContext(DarkModeContext);
}

// ─── Stats Context ──────────────────────────────────────────────────────────

interface StatsContextValue {
  stats: GameStats;
  refreshStats: () => void;
}

export const StatsContext = createContext<StatsContextValue>({
  stats: {
    currentStreak: 0,
    bestStreak: 0,
    totalSolved: 0,
    hintsUsed: 0,
    todayCompleted: false,
  },
  refreshStats: () => {},
});

export function useStats() {
  return useContext(StatsContext);
}

// ─── Provider Component ─────────────────────────────────────────────────────

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [darkMode, setDarkModeState] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    currentStreak: 0,
    bestStreak: 0,
    totalSolved: 0,
    hintsUsed: 0,
    todayCompleted: false,
  });

  // Initialise dark mode + stats from localStorage on the client.
  useEffect(() => {
    setDarkModeState(isDarkMode());
    setStats(getStats());
    trackEvent("app_opened");
  }, []);

  // Sync dark class on <html>.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = useCallback(() => {
    const next = !darkMode;
    setDarkModeState(next);
    setDarkMode(next);
    trackEvent("dark_mode_toggled", { enabled: next });
  }, [darkMode]);

  const refreshStats = useCallback(() => {
    setStats(getStats());
  }, []);

  const handleGoHome = useCallback(() => {
    refreshStats();
    router.push("/");
  }, [refreshStats, router]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDark }}>
      <StatsContext.Provider value={{ stats, refreshStats }}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-300">
          <Header darkMode={darkMode} onToggleDark={toggleDark} onHome={handleGoHome} />
          <div className="flex flex-col min-h-[calc(100vh-56px)]">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </StatsContext.Provider>
    </DarkModeContext.Provider>
  );
}
