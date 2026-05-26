// Sudoku logic utilities for Daily Emoji Sudoku.
// Handles validation, conflict detection, hints, and board state.
// Future expansion: extend these functions for 6x6 and 9x9 grids.

import type { EmojiGrid } from "../data/puzzles";

// Returns a set of cell keys like "row-col" that are involved in row, column,
// or 2x2 box conflicts. Empty cells are ignored.
export function getConflictCells(board: EmojiGrid): Set<string> {
  const conflicts = new Set<string>();
  const size = board.length;
  const boxSize = Math.sqrt(size);

  if (!Number.isInteger(boxSize)) return conflicts;

  // Check rows.
  for (let r = 0; r < size; r++) {
    const seen = new Map<string, number[]>();
    for (let c = 0; c < size; c++) {
      const val = board[r]?.[c];
      if (!val) continue;
      if (!seen.has(val)) seen.set(val, []);
      seen.get(val)!.push(c);
    }
    for (const cols of seen.values()) {
      if (cols.length > 1) cols.forEach((c) => conflicts.add(`${r}-${c}`));
    }
  }

  // Check columns.
  for (let c = 0; c < size; c++) {
    const seen = new Map<string, number[]>();
    for (let r = 0; r < size; r++) {
      const val = board[r]?.[c];
      if (!val) continue;
      if (!seen.has(val)) seen.set(val, []);
      seen.get(val)!.push(r);
    }
    for (const rows of seen.values()) {
      if (rows.length > 1) rows.forEach((r) => conflicts.add(`${r}-${c}`));
    }
  }

  // Check square boxes. For the MVP this is 2x2 boxes in a 4x4 grid.
  for (let boxRow = 0; boxRow < boxSize; boxRow++) {
    for (let boxCol = 0; boxCol < boxSize; boxCol++) {
      const seen = new Map<string, string[]>();
      for (let r = boxRow * boxSize; r < (boxRow + 1) * boxSize; r++) {
        for (let c = boxCol * boxSize; c < (boxCol + 1) * boxSize; c++) {
          const val = board[r]?.[c];
          if (!val) continue;
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push(`${r}-${c}`);
        }
      }
      for (const cells of seen.values()) {
        if (cells.length > 1) cells.forEach((key) => conflicts.add(key));
      }
    }
  }

  return conflicts;
}

// Returns true if every cell is filled.
export function isBoardFilled(board: EmojiGrid): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

// Returns true when the board is fully filled and exactly matches the puzzle solution.
// This is stricter than "no conflicts" and prevents alternate complete grids from
// being accepted for puzzles with limited givens.
export function isBoardSolved(board: EmojiGrid, solution: EmojiGrid): boolean {
  if (!isBoardFilled(board)) return false;
  if (!hasSameShape(board, solution)) return false;

  return board.every((row, r) => row.every((cell, c) => cell === solution[r][c]));
}

// Keeps this helper for UI messaging where we only need to know if the board is a
// valid filled Sudoku grid, not whether it is the intended puzzle solution.
export function isBoardConflictFree(board: EmojiGrid): boolean {
  return isBoardFilled(board) && getConflictCells(board).size === 0;
}

// Returns cells that match the given emoji for highlighting same-value cells.
export function getMatchingCells(board: EmojiGrid, emoji: string): Set<string> {
  const matches = new Set<string>();
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === emoji) matches.add(`${r}-${c}`);
    });
  });
  return matches;
}

// Finds one editable cell that is either empty or incorrect and can be revealed
// from the solution. Returns [row, col] or null if no hint is available.
export function getHintCell(
  board: EmojiGrid,
  solution: EmojiGrid,
  givens: EmojiGrid
): [number, number] | null {
  const candidates: [number, number][] = [];

  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      const isEditable = givens[r]?.[c] === null;
      const needsHelp = cell !== solution[r]?.[c];
      if (isEditable && needsHelp) candidates.push([r, c]);
    });
  });

  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// Deep-clones a 2D grid.
export function cloneGrid(grid: EmojiGrid): EmojiGrid {
  return grid.map((row) => [...row]);
}

// Counts the number of filled cells.
export function countFilled(board: EmojiGrid): number {
  return board.flat().filter((cell) => cell !== null).length;
}

// Returns cells that are incorrectly filled compared to the solution.
export function getIncorrectCells(
  board: EmojiGrid,
  solution: EmojiGrid,
  givens: EmojiGrid
): Set<string> {
  const incorrect = new Set<string>();
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (givens[r]?.[c] !== null) return;
      if (cell !== null && cell !== solution[r]?.[c]) incorrect.add(`${r}-${c}`);
    });
  });
  return incorrect;
}

// Verifies a saved board from localStorage before loading it into the game. This
// prevents old/corrupt saved data from crashing the grid or making givens editable.
export function isValidProgressGrid(
  board: EmojiGrid | null,
  givens: EmojiGrid,
  allowedEmojis: readonly string[]
): board is EmojiGrid {
  if (!board || !hasSameShape(board, givens)) return false;
  const allowed = new Set<string>(allowedEmojis);

  for (let r = 0; r < givens.length; r++) {
    for (let c = 0; c < givens[r].length; c++) {
      const given = givens[r][c];
      const saved = board[r][c];

      if (given !== null && saved !== given) return false;
      if (saved !== null && !allowed.has(saved)) return false;
    }
  }

  return true;
}

function hasSameShape(a: EmojiGrid, b: EmojiGrid): boolean {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  return a.every((row, r) => Array.isArray(row) && Array.isArray(b[r]) && row.length === b[r].length);
}
