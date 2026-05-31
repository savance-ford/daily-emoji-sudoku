import type { Metadata } from "next";
import LegalPageClient from "@/components/LegalPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for Emoji Sudoku.",
  alternates: { canonical: "https://emojisudoku.fun/privacy" },
};

export default function PrivacyPage() {
  return <LegalPageClient type="privacy" />;
}
