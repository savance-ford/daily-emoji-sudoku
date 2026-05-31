"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { EmojiGrid, Puzzle } from "../data/puzzles";
import {
  cloneGrid,
  getConflictCells,
  getHintCell,
  getIncorrectCells,
  getMatchingCells,
  isBoardFilled,
  isBoardSolved,
  isValidProgressGrid,
} from "../utils/sudoku";
import {
  clearProgress,
  loadProgress,
  recordHintUsed,
  recordPuzzleSolved,
  saveProgress,
} from "../utils/storage";
import { trackEvent } from "../utils/analytics";
import SudokuGrid from "./SudokuGrid";
import EmojiPicker from "./EmojiPicker";
import WinModal from "./WinModal";
import AdPlaceholder from "./AdPlaceholder";

interface GameScreenProps {
  puzzle: Puzzle;
  isDaily: boolean;
  onBack: () => void;
  onHome: () => void;
  onPlayAnother: () => void;
  currentStreak: number;
  totalSolved: number;
  onStatsUpdate: () => void;
}

type CheckState = "idle" | "incomplete" | "incorrect" | "correct";

function getInitialBoard(puzzle: Puzzle): EmojiGrid {
  const saved = loadProgress(puzzle.id);
  if (isValidProgressGrid(saved, puzzle.givens, puzzle.emojis)) {
    return cloneGrid(saved);
  }

  if (saved) clearProgress(puzzle.id);
  return cloneGrid(puzzle.givens);
}

export default function GameScreen({
  puzzle,
  isDaily,
  onBack,
  onHome,
  onPlayAnother,
  currentStreak,
  totalSolved,
  onStatsUpdate,
}: GameScreenProps) {
  const [board, setBoard] = useState<EmojiGrid>(() => getInitialBoard(puzzle));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [checkState, setCheckState] = useState<CheckState>("idle");
  const [hintCell, setHintCell] = useState<[number, number] | null>(null);
  const [hintCount, setHintCount] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [localStreak, setLocalStreak] = useState(currentStreak);
  const [localTotal, setLocalTotal] = useState(totalSolved);
  const [shareCopied, setShareCopied] = useState(false);
  const [markedMistakes, setMarkedMistakes] = useState<Set<string>>(new Set());
  const solvedRef = useRef(false);

  const duplicateConflictCells = useMemo(() => getConflictCells(board), [board]);
  const displayConflictCells = useMemo(
    () => new Set([...duplicateConflictCells, ...markedMistakes]),
    [duplicateConflictCells, markedMistakes]
  );

  const matchingCells = useMemo(() => {
    if (!selectedCell) return new Set<string>();
    const emoji = board[selectedCell[0]][selectedCell[1]];
    return emoji ? getMatchingCells(board, emoji) : new Set<string>();
  }, [board, selectedCell]);

  const handleWin = useCallback(
    (hints: number) => {
      if (solvedRef.current) return;

      solvedRef.current = true;
      setPuzzleSolved(true);
      setCheckState("correct");
      setMarkedMistakes(new Set());

      const updated = recordPuzzleSolved(isDaily);
      setLocalStreak(updated.currentStreak);
      setLocalTotal(updated.totalSolved);
      clearProgress(puzzle.id);
      setShowWin(true);
      onStatsUpdate();
      trackEvent("puzzle_completed", {
        puzzleId: puzzle.id,
        difficulty: puzzle.difficulty,
        hintsUsed: hints,
        isDaily,
      });
    },
    [isDaily, onStatsUpdate, puzzle.difficulty, puzzle.id]
  );

  // Auto-save progress whenever the board changes, but do not resave solved boards.
  useEffect(() => {
    if (!puzzleSolved) saveProgress(puzzle.id, board);
  }, [board, puzzle.id, puzzleSolved]);

  // Auto-detect a real win only when the board exactly matches this puzzle's solution.
  useEffect(() => {
    if (puzzleSolved) return;
    if (isBoardSolved(board, puzzle.solution)) handleWin(hintCount);
  }, [board, handleWin, hintCount, puzzle.solution, puzzleSolved]);

  // Clear hint highlight after a short moment.
  useEffect(() => {
    if (!hintCell) return;
    const t = window.setTimeout(() => setHintCell(null), 2000);
    return () => window.clearTimeout(t);
  }, [hintCell]);

  // Clear temporary check messages after a short moment.
  useEffect(() => {
    if (checkState === "idle" || checkState === "correct") return;
    const t = window.setTimeout(() => setCheckState("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [checkState]);

  const clearTransientFeedback = useCallback(() => {
    setCheckState("idle");
    setMarkedMistakes(new Set());
  }, []);

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (puzzleSolved || puzzle.givens[r][c] !== null) return;
      setSelectedCell([r, c]);
      clearTransientFeedback();
    },
    [clearTransientFeedback, puzzle.givens, puzzleSolved]
  );

  const handleEmojiClick = useCallback(
    (emoji: string) => {
      if (puzzleSolved) return;
      clearTransientFeedback();
      if (!selectedCell) {
        setSelectedEmoji(emoji);
        return;
      }

      const [r, c] = selectedCell;
      if (puzzle.givens[r][c] !== null) return;

      setBoard((prev) => {
        const next = cloneGrid(prev);
        next[r][c] = emoji;
        trackEvent("emoji_placed", { emoji, row: r, col: c });
        return next;
      });
      setSelectedEmoji(null);
    },
    [clearTransientFeedback, puzzle.givens, puzzleSolved, selectedCell]
  );

  const handleErase = useCallback(() => {
    if (puzzleSolved || !selectedCell) return;
    const [r, c] = selectedCell;
    if (puzzle.givens[r][c] !== null) return;

    clearTransientFeedback();
    setBoard((prev) => {
      const next = cloneGrid(prev);
      next[r][c] = null;
      return next;
    });
  }, [clearTransientFeedback, puzzle.givens, puzzleSolved, selectedCell]);

  const handleHint = useCallback(() => {
    if (puzzleSolved) return;

    const cell = getHintCell(board, puzzle.solution, puzzle.givens);
    if (!cell) {
      if (isBoardSolved(board, puzzle.solution)) handleWin(hintCount);
      return;
    }

    const [r, c] = cell;
    setBoard((prev) => {
      const next = cloneGrid(prev);
      next[r][c] = puzzle.solution[r][c];
      return next;
    });
    setHintCell(cell);
    setSelectedCell(cell);
    setSelectedEmoji(puzzle.solution[r][c]);
    setMarkedMistakes(new Set());
    setCheckState("idle");

    setHintCount((previous) => {
      const nextCount = previous + 1;
      recordHintUsed();
      trackEvent("hint_used", { puzzleId: puzzle.id, hintNumber: nextCount });
      return nextCount;
    });
  }, [board, handleWin, hintCount, puzzle.givens, puzzle.id, puzzle.solution, puzzleSolved]);

  const handleCheck = useCallback(() => {
    if (puzzleSolved) return;

    trackEvent("puzzle_checked", { puzzleId: puzzle.id });

    if (isBoardSolved(board, puzzle.solution)) {
      handleWin(hintCount);
      return;
    }

    const wrongCells = getIncorrectCells(board, puzzle.solution, puzzle.givens);
    setMarkedMistakes(wrongCells);

    if (duplicateConflictCells.size > 0 || wrongCells.size > 0) {
      setCheckState("incorrect");
      return;
    }

    setCheckState(isBoardFilled(board) ? "incorrect" : "incomplete");
  }, [board, duplicateConflictCells.size, handleWin, hintCount, puzzle.givens, puzzle.id, puzzle.solution, puzzleSolved]);

  const handleReset = useCallback(() => {
    if (puzzleSolved) return;
    setBoard(cloneGrid(puzzle.givens));
    setSelectedCell(null);
    setSelectedEmoji(null);
    setCheckState("idle");
    setHintCell(null);
    setMarkedMistakes(new Set());
    setHintCount(0);
    clearProgress(puzzle.id);
  }, [puzzle.givens, puzzle.id, puzzleSolved]);

  const handleShare = useCallback(async () => {
    trackEvent("share_clicked", { puzzleId: puzzle.id });
    const siteUrl = window.location.origin || window.location.href;
    const text = `Daily Emoji Sudoku 🧩\nSolved ${isDaily ? "today's daily puzzle" : `a ${puzzle.difficulty} puzzle`}!\n${isDaily ? `Streak: ${localStreak} day${localStreak !== 1 ? "s" : ""}\n` : ""}Hints used: ${hintCount}\nPlay: ${siteUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({ text, title: "Daily Emoji Sudoku" });
        return;
      } catch {
        // User cancelled share; fall back silently.
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 2000);
    } catch {
      setShareCopied(false);
    }
  }, [hintCount, isDaily, localStreak, puzzle.difficulty, puzzle.id]);

  const difficultyColors: Record<string, string> = {
    easy: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
    medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
    hard: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30",
  };

  const checkMessages: Record<CheckState, string> = {
    idle: "",
    incomplete: "Keep going — not quite there yet.",
    incorrect: "Some cells need another look.",
    correct: "Correct!",
  };

  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-8 max-w-lg mx-auto w-full">
      <AdPlaceholder variant="top-banner" className="w-full" />

      <div className="w-full flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-sm"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <span className="font-bold text-slate-800 dark:text-white text-base leading-tight">
            {puzzle.title}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColors[puzzle.difficulty]}`}
            >
              {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {puzzle.emojiSetName}
            </span>
          </div>
        </div>

        {isDaily ? (
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <span role="img" aria-label="daily">📅</span>
            Daily
          </div>
        ) : (
          <div className="w-14" aria-hidden="true" />
        )}
      </div>

      <div className="flex items-start gap-4 w-full justify-center">
        <div className="flex flex-col items-center gap-3">
          <SudokuGrid
            board={board}
            givens={puzzle.givens}
            selectedCell={selectedCell}
            conflictCells={displayConflictCells}
            matchingCells={matchingCells}
            hintCell={hintCell}
            disabled={puzzleSolved}
            onCellClick={handleCellClick}
          />

          {checkState !== "idle" && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${checkState === "correct"
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : checkState === "incomplete"
                    ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
                    : "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 animate-shake"
                }
              `}
              role="status"
              aria-live="polite"
            >
              {checkState === "correct" && <CheckCircle2 size={16} />}
              {checkMessages[checkState]}
            </div>
          )}
        </div>

        <AdPlaceholder variant="sidebar" className="self-center" />
      </div>

      <div className="w-full max-w-sm">
        <EmojiPicker
          emojis={puzzle.emojis}
          selectedEmoji={selectedEmoji}
          onEmojiClick={handleEmojiClick}
          onErase={handleErase}
          onHint={handleHint}
          onCheck={handleCheck}
          onReset={handleReset}
          hintCount={hintCount}
          hasSelectedCell={!!selectedCell}
          disabled={puzzleSolved}
        />
      </div>

      <AdPlaceholder variant="bottom-banner" className="w-full" />

      {shareCopied && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          Result copied to clipboard!
        </div>
      )}

      {showWin && (
        <WinModal
          difficulty={puzzle.difficulty}
          hintsUsed={hintCount}
          isDaily={isDaily}
          streak={localStreak}
          totalSolved={localTotal}
          puzzleTitle={puzzle.title}
          onShare={handleShare}
          onPlayAnother={() => {
            setShowWin(false);
            onPlayAnother();
          }}
          onHome={() => {
            setShowWin(false);
            onHome();
          }}
          onClose={() => setShowWin(false)}
        />
      )}
    </main>
  );
}
