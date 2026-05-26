import type { EmojiGrid } from "../data/puzzles";

interface SudokuGridProps {
  board: EmojiGrid;
  givens: EmojiGrid;
  selectedCell: [number, number] | null;
  conflictCells: Set<string>;
  matchingCells: Set<string>;
  hintCell: [number, number] | null;
  disabled?: boolean;
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuGrid({
  board,
  givens,
  selectedCell,
  conflictCells,
  matchingCells,
  hintCell,
  disabled = false,
  onCellClick,
}: SudokuGridProps) {
  const size = board.length; // 4 for 4x4

  function getCellClasses(r: number, c: number): string {
    const key = `${r}-${c}`;
    const isGiven = givens[r][c] !== null;
    const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
    const isConflict = conflictCells.has(key);
    const isMatching = matchingCells.has(key) && !isSelected;
    const isHint = hintCell?.[0] === r && hintCell?.[1] === c;
    const isDisabled = disabled || isGiven;

    // Determine right/bottom border for box boundaries
    const boxBorderRight = (c + 1) % 2 === 0 && c < size - 1;
    const boxBorderBottom = (r + 1) % 2 === 0 && r < size - 1;

    let base =
      "relative flex items-center justify-center rounded-xl select-none transition-all duration-150 text-2xl min-[380px]:text-3xl sm:text-4xl font-medium border-2 ";

    // Box divider lines
    if (boxBorderRight) base += "mr-1 ";
    if (boxBorderBottom) base += "mb-1 ";

    if (isGiven) {
      base +=
        "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 cursor-default ";
    } else {
      base +=
        `${isDisabled ? "cursor-default opacity-90" : "cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500"} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 `;
    }

    if (isSelected) {
      base +=
        "!border-emerald-500 dark:!border-emerald-400 !bg-emerald-50 dark:!bg-emerald-900/30 scale-105 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/50 z-10 ";
    } else if (isConflict) {
      base +=
        "!border-rose-400 dark:!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20 animate-shake ";
    } else if (isHint) {
      base +=
        "!border-amber-400 dark:!border-amber-500 !bg-amber-50 dark:!bg-amber-900/20 ";
    } else if (isMatching) {
      base +=
        "!bg-emerald-50 dark:!bg-emerald-900/20 !border-emerald-200 dark:!border-emerald-700 ";
    }

    return base;
  }

  return (
    <div
      className="inline-grid gap-1.5 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      role="grid"
      aria-label="Sudoku grid"
    >
      {board.map((row, r) =>
        row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            className={`w-[clamp(3.3rem,18vw,5rem)] h-[clamp(3.3rem,18vw,5rem)] ${getCellClasses(r, c)}`}
            onClick={() => onCellClick(r, c)}
            disabled={disabled || givens[r][c] !== null}
            aria-label={`Cell row ${r + 1} column ${c + 1}${cell ? `, contains ${cell}` : ", empty"}${givens[r][c] !== null ? ", prefilled" : ""}`}
            aria-selected={selectedCell?.[0] === r && selectedCell?.[1] === c}
          >
            {cell && (
              <span
                className={`leading-none ${givens[r][c] !== null ? "opacity-90" : ""}`}
                aria-hidden="true"
              >
                {cell}
              </span>
            )}
            {/* Conflict indicator dot */}
            {conflictCells.has(`${r}-${c}`) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-400 rounded-full" aria-hidden="true" />
            )}
          </button>
        ))
      )}
    </div>
  );
}
