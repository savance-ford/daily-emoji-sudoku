"use client";

// Ad Placeholder component for Daily Emoji Sudoku
// Replace the inner content with real ad code when ready.
// Future expansion: Google AdSense, H5 game ads, rewarded ads.

type AdVariant =
  | "top-banner"
  | "bottom-banner"
  | "sidebar"
  | "completion"
  | "rewarded-hint";

interface AdPlaceholderProps {
  variant: AdVariant;
  className?: string;
}

const VARIANT_STYLES: Record<AdVariant, string> = {
  "top-banner":
    "w-full h-14 flex items-center justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg",
  "bottom-banner":
    "w-full h-14 flex items-center justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg",
  sidebar:
    "hidden lg:flex w-36 h-60 flex-col items-center justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl",
  completion:
    "w-full h-16 flex items-center justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg",
  "rewarded-hint":
    "w-full h-10 flex items-center justify-center text-xs text-slate-400 bg-amber-50 dark:bg-slate-800 dark:text-slate-500 border border-dashed border-amber-200 dark:border-slate-700 rounded-lg",
};

const VARIANT_LABELS: Record<AdVariant, string> = {
  "top-banner": "Advertisement (Top Banner)",
  "bottom-banner": "Advertisement (Bottom Banner)",
  sidebar: "Ad (Sidebar)",
  completion: "Advertisement",
  "rewarded-hint": "Watch an ad to reveal a hint cell",
};

//@ts-ignore - This component is a placeholder and will be implemented with real ad code in the future. 
// For now, it returns null to hide ad placeholders.
export default function AdPlaceholder({ variant, className = "" }: AdPlaceholderProps) {
  // return (
  //   // Future: Replace this div with actual ad code
  //   <div
  //     className={`${VARIANT_STYLES[variant]} ${className}`}
  //     role="complementary"
  //     aria-label="Advertisement placeholder"
  //   >
  //     <span>{VARIANT_LABELS[variant]}</span>
  //   </div>
  // );
  return null; // Hide ad placeholders for now
}
