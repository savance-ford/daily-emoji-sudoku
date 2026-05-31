"use client";

import { useRouter } from "next/navigation";
import LegalPage from "@/components/LegalPage";

type LegalPageType = "privacy" | "terms" | "disclaimer";

interface Props {
  type: LegalPageType;
}

export default function LegalPageClient({ type }: Props) {
  const router = useRouter();

  return (
    <LegalPage
      type={type}
      onBack={() => router.push("/")}
      onNavigate={(t) => router.push(`/${t}`)}
    />
  );
}
