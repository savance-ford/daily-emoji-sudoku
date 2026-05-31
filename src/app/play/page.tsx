import type { Metadata } from "next";
import { Suspense } from "react";
import PlayPageClient from "@/components/PlayPageClient";

export const metadata: Metadata = {
  title: "Play Emoji Sudoku",
  description:
    "Play a free Emoji Sudoku puzzle online. Fill the grid with emojis using Sudoku-style logic rules.",
};

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh] text-slate-400 text-lg">
        Loading puzzle…
      </div>
    }>
      <PlayPageClient />
    </Suspense>
  );
}
