"use client";

import { useRouter } from "next/navigation";
import HomeScreen from "@/components/HomeScreen";
import SeoContent from "@/components/SeoContent";
import { useStats } from "@/components/ClientProviders";

export default function HomePageClient() {
  const router = useRouter();
  const { stats } = useStats();

  return (
    <>
      <HomeScreen
        stats={stats}
        onPlayDaily={() => router.push("/play?mode=daily")}
        onChooseDifficulty={() => router.push("/difficulty")}
      />
      <SeoContent />
    </>
  );
}
