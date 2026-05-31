import type { Metadata } from "next";
import DifficultySelectorPageClient from "@/components/DifficultySelectorPageClient";

export const metadata: Metadata = {
  title: "Choose a Puzzle",
  description:
    "Choose an easy, medium, or hard Emoji Sudoku puzzle and play free online on mobile or desktop.",
  alternates: { canonical: "https://emojisudoku.fun/difficulty" },
};

export default function DifficultyPage() {
  return <DifficultySelectorPageClient />;
}
