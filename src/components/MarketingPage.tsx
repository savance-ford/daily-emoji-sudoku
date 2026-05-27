import type { ReactNode } from "react";
import type { Difficulty } from "../data/puzzles";

type MarketingPageType = "howTo" | "daily" | "easy";

interface MarketingPageProps {
  type: MarketingPageType;
  onPlayDaily: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const pageData = {
  howTo: {
    eyebrow: "Emoji Sudoku Rules",
    h1: "How to Play Emoji Sudoku",
    intro:
      "Emoji Sudoku uses the same logic as classic Sudoku, but the grid uses emojis instead of numbers. The goal is simple: fill every empty square without repeating emojis in any row, column, or 2×2 box.",
  },
  daily: {
    eyebrow: "Daily Brain Teaser",
    h1: "Daily Emoji Sudoku",
    intro:
      "Play a fresh Emoji Sudoku puzzle every day. The daily puzzle is designed to be quick, mobile-friendly, and satisfying enough to make part of your daily puzzle routine.",
  },
  easy: {
    eyebrow: "Beginner Puzzle",
    h1: "Easy Emoji Sudoku",
    intro:
      "Easy Emoji Sudoku is a beginner-friendly 4×4 logic puzzle with more starting emojis filled in. It is a great way to learn Sudoku-style thinking without a full 9×9 number grid.",
  },
} as const;

export default function MarketingPage({ type, onPlayDaily, onSelectDifficulty }: MarketingPageProps) {
  const page = pageData[type];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-slate-700 dark:text-slate-300">
      <section className="text-center mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-3">
          {page.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {page.h1}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {page.intro}
        </p>
      </section>

      {type === "howTo" && <HowToContent onPlayDaily={onPlayDaily} />}
      {type === "daily" && <DailyContent onPlayDaily={onPlayDaily} onSelectDifficulty={onSelectDifficulty} />}
      {type === "easy" && <EasyContent onSelectDifficulty={onSelectDifficulty} />}

      <RelatedLinks />
    </main>
  );
}

function PrimaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold shadow-lg shadow-emerald-200/60 dark:shadow-emerald-950/50 transition-all"
    >
      {children}
    </button>
  );
}

function ContentCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm mb-6">
      {children}
    </div>
  );
}

function HowToContent({ onPlayDaily }: { onPlayDaily: () => void }) {
  return (
    <>
      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Emoji Sudoku Rules</h2>
        <ol className="space-y-3 text-sm sm:text-base leading-relaxed">
          <li><strong>1. Pick an empty square.</strong> Tap or click an empty cell in the 4×4 grid.</li>
          <li><strong>2. Choose an emoji.</strong> Use the emoji picker below the puzzle to fill the selected square.</li>
          <li><strong>3. Complete each row.</strong> Every row must contain all four emojis exactly once.</li>
          <li><strong>4. Complete each column.</strong> Every column must also contain all four emojis exactly once.</li>
          <li><strong>5. Complete each 2×2 box.</strong> Each small box must contain every emoji once with no repeats.</li>
        </ol>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Example Emoji Sudoku Puzzle</h2>
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-4" aria-label="Example 4 by 4 Emoji Sudoku grid">
          {["🍕", "", "", "🌮", "", "🌮", "🍕", "", "🌮", "", "", "🍟", "", "🍟", "🌮", ""].map((cell, index) => (
            <div key={index} className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-700">
              {cell || <span className="text-slate-300 dark:text-slate-600">?</span>}
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Start by looking for rows, columns, or 2×2 boxes that already have several emojis filled in. If a row is missing only one emoji, that empty square is usually the easiest place to start.
        </p>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ready to Play?</h2>
        <p className="text-sm leading-relaxed mb-5">
          Try today’s free Emoji Sudoku puzzle and use the hint button if you get stuck. No download or sign-up required.
        </p>
        <PrimaryButton onClick={onPlayDaily}>Play Today’s Puzzle 🧩</PrimaryButton>
      </ContentCard>
    </>
  );
}

function DailyContent({ onPlayDaily, onSelectDifficulty }: { onPlayDaily: () => void; onSelectDifficulty: (difficulty: Difficulty) => void }) {
  return (
    <>
      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">A Fresh Emoji Puzzle Every Day</h2>
        <p className="text-sm sm:text-base leading-relaxed mb-4">
          The daily Emoji Sudoku puzzle gives you one quick challenge to solve each day. It is built for short puzzle sessions, streak tracking, and easy sharing after you complete the grid.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>✅ New daily puzzle selection</li>
          <li>🔥 Streak tracking for daily solves</li>
          <li>📱 Mobile-friendly 4×4 grid</li>
          <li>💡 Hint button when you need help</li>
        </ul>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Play Today’s Daily Emoji Sudoku</h2>
        <p className="text-sm leading-relaxed mb-5">
          Start with today’s puzzle, then try easy, medium, or hard practice puzzles if you want to keep playing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <PrimaryButton onClick={onPlayDaily}>Play Today’s Puzzle 📅</PrimaryButton>
          <button
            type="button"
            onClick={() => onSelectDifficulty("easy")}
            className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 active:scale-95 font-extrabold transition-all"
          >
            Try Easy Mode 😄
          </button>
        </div>
      </ContentCard>
    </>
  );
}

function EasyContent({ onSelectDifficulty }: { onSelectDifficulty: (difficulty: Difficulty) => void }) {
  return (
    <>
      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Why Start with Easy Emoji Sudoku?</h2>
        <p className="text-sm sm:text-base leading-relaxed mb-4">
          Easy Emoji Sudoku uses a small 4×4 grid and gives you more starting emojis than medium or hard puzzles. That makes it perfect for beginners, casual players, kids, and anyone who wants a quick logic puzzle online.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>🌱 Beginner-friendly Sudoku rules</li>
          <li>🧩 Four emojis instead of nine numbers</li>
          <li>⏱️ Fast puzzles that only take a few minutes</li>
          <li>📱 Easy to play on phone, tablet, or desktop</li>
        </ul>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Easy Emoji Sudoku Tips</h2>
        <ul className="space-y-3 text-sm sm:text-base leading-relaxed">
          <li><strong>Look for nearly complete rows.</strong> If a row already has three emojis, the missing one is your answer.</li>
          <li><strong>Check columns before guessing.</strong> A square must work in both its row and column.</li>
          <li><strong>Use the 2×2 boxes.</strong> Each box also needs every emoji once.</li>
          <li><strong>Erase mistakes quickly.</strong> If a row has duplicates, remove the emoji and try another option.</li>
        </ul>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Play an Easy Emoji Sudoku Puzzle</h2>
        <p className="text-sm leading-relaxed mb-5">
          Start with an easy puzzle first, then move up to medium and hard once the rules feel natural.
        </p>
        <PrimaryButton onClick={() => onSelectDifficulty("easy")}>Start Easy Puzzle 😄</PrimaryButton>
      </ContentCard>
    </>
  );
}

function RelatedLinks() {
  return (
    <section className="mt-10 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-3xl p-5 sm:p-7">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">More Emoji Sudoku Pages</h2>
      <div className="grid sm:grid-cols-3 gap-3 text-sm font-bold">
        <a className="p-3 rounded-2xl bg-white dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors" href="/how-to-play-emoji-sudoku">How to Play</a>
        <a className="p-3 rounded-2xl bg-white dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors" href="/daily-emoji-sudoku">Daily Emoji Sudoku</a>
        <a className="p-3 rounded-2xl bg-white dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors" href="/easy-emoji-sudoku">Easy Emoji Sudoku</a>
      </div>
    </section>
  );
}
