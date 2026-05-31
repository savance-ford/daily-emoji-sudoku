"use client";

import { useRouter } from "next/navigation";
import DifficultySelector from "@/components/DifficultySelector";
import type { Difficulty } from "@/data/puzzles";
import { setLastDifficulty } from "@/utils/storage";
import { trackEvent } from "@/utils/analytics";

export default function DifficultySelectorPageClient() {
  const router = useRouter();

  const handleSelect = (difficulty: Difficulty) => {
    setLastDifficulty(difficulty);
    trackEvent("difficulty_selected", { difficulty });
    router.push(`/play?difficulty=${difficulty}`);
  };

  return (
    <DifficultySelector
      onSelect={handleSelect}
      onBack={() => router.push("/")}
    />
  );
}
