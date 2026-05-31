import type { Metadata } from "next";
import LegalPageClient from "@/components/LegalPageClient";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Terms of Use for Emoji Sudoku.",
  alternates: { canonical: "https://emojisudoku.fun/terms" },
};

export default function TermsPage() {
  return <LegalPageClient type="terms" />;
}
