import type { MetadataRoute } from "next";

const BASE = "https://emojisudoku.fun";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/how-to-play-emoji-sudoku` },
    { url: `${BASE}/daily-emoji-sudoku` },
    { url: `${BASE}/easy-emoji-sudoku` },
    { url: `${BASE}/privacy` },
    { url: `${BASE}/terms` },
    { url: `${BASE}/disclaimer` },
  ];
}
