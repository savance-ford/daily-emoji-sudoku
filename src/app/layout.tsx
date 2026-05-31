import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientProviders from "@/components/ClientProviders";
import "@/index.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Daily Emoji Sudoku - Free Online Emoji Sudoku Puzzle",
    template: "%s | Daily Emoji Sudoku",
  },
  description:
    "Play Daily Emoji Sudoku, a free online emoji puzzle game with daily puzzles, hints, streaks, and mobile-friendly Sudoku-style logic grids.",
  keywords: [
    "emoji sudoku",
    "daily emoji sudoku",
    "free sudoku game",
    "sudoku online",
    "emoji puzzle game",
    "daily puzzle game",
    "logic puzzle online",
  ],
  metadataBase: new URL("https://emojisudoku.fun"),
  openGraph: {
    title: "Daily Emoji Sudoku - Free Online Emoji Sudoku Puzzle",
    description:
      "Play Daily Emoji Sudoku, a free online emoji puzzle game where you solve Sudoku-style logic grids with fun emoji themes.",
    type: "website",
    url: "https://emojisudoku.fun/",
  },
  twitter: { card: "summary" },
  alternates: { canonical: "https://emojisudoku.fun/" },
  other: { "msvalidate.01": "C2BDC132BFD93C38136172D8F89BB1E5" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} antialiased`}>
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wxb8r86nhs");`}
        </Script>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
