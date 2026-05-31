import type { Metadata } from "next";
import MarketingPageClient from "@/components/MarketingPageClient";

export const metadata: Metadata = {
  title: "Easy Emoji Sudoku - Beginner-Friendly Free Puzzle",
  description:
    "Play Easy Emoji Sudoku, a beginner-friendly free online Sudoku puzzle using emojis instead of numbers.",
  alternates: { canonical: "https://emojisudoku.fun/easy-emoji-sudoku" },
};

export default function EasyLandingPage() {
  return <MarketingPageClient type="easy" />;
}
