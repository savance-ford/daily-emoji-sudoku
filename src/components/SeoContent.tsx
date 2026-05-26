import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Is Daily Emoji Sudoku free?",
    a: "Yes! Daily Emoji Sudoku is completely free to play. You can play today's daily puzzle and unlimited easy, medium, and hard puzzles at no cost.",
  },
  {
    q: "How is Emoji Sudoku different from regular Sudoku?",
    a: "Instead of filling a grid with numbers 1–9, you fill it with fun emojis. The logic rules are identical — each row, column, and box must contain every emoji exactly once. Emojis make it more visually approachable and fun for all ages.",
  },
  {
    q: "Can I play on my phone?",
    a: "Absolutely. Daily Emoji Sudoku is designed mobile-first. The grid and emoji picker are optimized for touch screens with large tap targets.",
  },
  {
    q: "Is there a new puzzle every day?",
    a: "Yes! A new daily puzzle is automatically selected each day. Your daily streak tracks how many consecutive days you complete the daily puzzle.",
  },
  {
    q: "Are there easy and hard puzzles?",
    a: "Yes. You can choose from Easy, Medium, or Hard difficulty. Easy puzzles have many cells pre-filled, while Hard puzzles require careful deduction from just a few starting emojis.",
  },
  {
    q: "Do I need to download anything?",
    a: "No download required. Daily Emoji Sudoku runs entirely in your browser. Just visit the site and start playing instantly on any device.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-3 py-4 text-left text-slate-700 dark:text-slate-200 font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        {open ? <ChevronUp size={18} className="flex-shrink-0" /> : <ChevronDown size={18} className="flex-shrink-0" />}
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function SeoContent() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-10 text-slate-700 dark:text-slate-300">
      {/* What Is Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          What Is Daily Emoji Sudoku?
        </h2>
        <p className="text-sm leading-relaxed">
          Daily Emoji Sudoku is a free online Sudoku-style logic puzzle game where you solve grids using emojis
          instead of numbers. Each puzzle is a 4×4 grid filled with four unique emojis — food, animals, sports,
          space, and more. It's the same satisfying logic challenge as classic sudoku online, but with a fresh,
          colorful twist that makes it perfect for casual players and mobile users alike.
          A new daily emoji sudoku puzzle drops every day, and you can track your solving streak and stats over time.
        </p>
      </div>

      {/* How to Play */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          How to Play Emoji Sudoku
        </h2>
        <ul className="text-sm leading-relaxed space-y-2 list-none">
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">1.</span>Tap any empty cell to select it.</li>
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">2.</span>Tap an emoji from the picker below the grid to place it.</li>
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">3.</span>Each <strong>row</strong> must contain every emoji exactly once.</li>
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">4.</span>Each <strong>column</strong> must contain every emoji exactly once.</li>
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">5.</span>Each <strong>2×2 box</strong> must contain every emoji exactly once.</li>
          <li className="flex gap-2"><span className="text-emerald-500 font-bold">6.</span>Use the Hint button when stuck. Use Erase to remove a wrong emoji. Press Check to validate your progress.</li>
        </ul>
      </div>

      {/* Why Play */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          Why Play Emoji Sudoku?
        </h2>
        <p className="text-sm leading-relaxed mb-3">
          Daily Emoji Sudoku is the perfect free online brain teaser for anyone who loves logic puzzles but wants
          something quicker and more casual than 9×9 sudoku. Here's why thousands of players make it part of their
          daily routine:
        </p>
        <ul className="text-sm leading-relaxed space-y-1.5 list-none">
          <li className="flex gap-2"><span>🧠</span><span><strong>Quick daily brain training</strong> — each puzzle takes just 2–5 minutes.</span></li>
          <li className="flex gap-2"><span>😄</span><span><strong>Fun for casual puzzle fans</strong> — emojis make it instantly recognizable.</span></li>
          <li className="flex gap-2"><span>🌱</span><span><strong>Easier to start than classic Sudoku</strong> — 4×4 grids are beginner-friendly.</span></li>
          <li className="flex gap-2"><span>📱</span><span><strong>Works on mobile and desktop</strong> — designed mobile-first, plays great everywhere.</span></li>
          <li className="flex gap-2"><span>🆓</span><span><strong>Completely free</strong> — no sign-up required, play instantly.</span></li>
        </ul>
      </div>

      {/* Tips */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          Emoji Sudoku Tips
        </h2>
        <ul className="text-sm leading-relaxed space-y-1.5 list-none">
          <li className="flex gap-2"><span>✅</span><span><strong>Start with the most-filled rows or columns</strong> — fewer missing emojis means easier deductions.</span></li>
          <li className="flex gap-2"><span>🔍</span><span><strong>Look for missing emojis</strong> — if a row has three emojis, the fourth position is forced.</span></li>
          <li className="flex gap-2"><span>📦</span><span><strong>Use box logic</strong> — check which emojis are missing from each 2×2 box.</span></li>
          <li className="flex gap-2"><span>🚫</span><span><strong>Avoid guessing if possible</strong> — each puzzle has exactly one valid solution deducible through logic.</span></li>
          <li className="flex gap-2"><span>💡</span><span><strong>Use hints sparingly</strong> — save them for when you're truly stuck to keep the satisfaction of solving high.</span></li>
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 px-4 divide-y divide-slate-100 dark:divide-slate-700">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
