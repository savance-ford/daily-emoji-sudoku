import type { Metadata } from "next";
import MarketingPageClient from "@/components/MarketingPageClient";

export const metadata: Metadata = {
  title: "Daily Emoji Sudoku - Play Today's Free Puzzle",
  description:
    "Play today's Daily Emoji Sudoku puzzle, a quick free daily brain teaser with emojis, hints, and streak tracking.",
  alternates: { canonical: "https://emojisudoku.fun/daily-emoji-sudoku" },
};

export default function DailyLandingPage() {
  return <MarketingPageClient type="daily" />;
}
