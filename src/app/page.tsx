import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Daily Emoji Sudoku - Free Online Emoji Sudoku Puzzle",
  description:
    "Play Daily Emoji Sudoku, a free online emoji puzzle game with daily puzzles, hints, streaks, and mobile-friendly Sudoku-style logic grids.",
  alternates: { canonical: "https://emojisudoku.fun/" },
};

export default function HomePage() {
  return <HomePageClient />;
}
