import type { Metadata } from "next";
import MarketingPageClient from "@/components/MarketingPageClient";

export const metadata: Metadata = {
  title: "How to Play Emoji Sudoku - Rules and Beginner Guide",
  description:
    "Learn how to play Emoji Sudoku with simple rules, examples, and beginner tips for solving 4x4 emoji logic puzzles.",
  alternates: { canonical: "https://emojisudoku.fun/how-to-play-emoji-sudoku" },
};

export default function HowToPlayPage() {
  return <MarketingPageClient type="howTo" />;
}
