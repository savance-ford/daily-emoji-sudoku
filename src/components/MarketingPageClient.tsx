"use client";

import { useRouter } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import type { Difficulty } from "@/data/puzzles";

type MarketingPageType = "howTo" | "daily" | "easy";

interface Props {
  type: MarketingPageType;
}

export default function MarketingPageClient({ type }: Props) {
  const router = useRouter();

  const handlePlayDaily = () => router.push("/play?mode=daily");
  const handleSelectDifficulty = (difficulty: Difficulty) =>
    router.push(`/play?difficulty=${difficulty}`);

  return (
    <MarketingPage
      type={type}
      onPlayDaily={handlePlayDaily}
      onSelectDifficulty={handleSelectDifficulty}
    />
  );
}
