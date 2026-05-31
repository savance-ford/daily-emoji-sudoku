import type { Metadata } from "next";
import LegalPageClient from "@/components/LegalPageClient";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Read the Disclaimer for Emoji Sudoku.",
  alternates: { canonical: "https://emojisudoku.fun/disclaimer" },
};

export default function DisclaimerPage() {
  return <LegalPageClient type="disclaimer" />;
}
