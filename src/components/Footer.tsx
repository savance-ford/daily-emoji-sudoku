type LegalRoute = "privacy" | "terms" | "disclaimer";

interface FooterProps {
  onNavigateLegal: (route: LegalRoute) => void;
}

export default function Footer({ onNavigateLegal }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70">
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4 text-xs text-slate-500 dark:text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Puzzle pages">
          <a
            href="/how-to-play-emoji-sudoku"
            className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
          >
            How to Play
          </a>
          <a
            href="/daily-emoji-sudoku"
            className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
          >
            Daily Puzzle
          </a>
          <a
            href="/easy-emoji-sudoku"
            className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
          >
            Easy Puzzle
          </a>
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {year} Emoji Sudoku. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Legal links">
            <button
              type="button"
              onClick={() => onNavigateLegal("privacy")}
              className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigateLegal("terms")}
              className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => onNavigateLegal("disclaimer")}
              className="hover:text-emerald-600 dark:hover:text-emerald-300 underline-offset-4 hover:underline"
            >
              Disclaimer
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
