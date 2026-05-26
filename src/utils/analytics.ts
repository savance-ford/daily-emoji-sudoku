// Analytics placeholder for Daily Emoji Sudoku
// Currently logs events to the console.
// Future expansion: Replace console.log with Google Analytics, Mixpanel, or similar.

type EventName =
  | "daily_puzzle_started"
  | "puzzle_started"
  | "emoji_placed"
  | "puzzle_checked"
  | "puzzle_completed"
  | "hint_used"
  | "share_clicked"
  | "difficulty_selected"
  | "dark_mode_toggled"
  | "app_opened";

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: EventName, props?: EventProperties): void {
  // Future: send to analytics service
  // e.g., gtag('event', name, props) or mixpanel.track(name, props)
  if (import.meta.env.DEV) {
    console.log("[Analytics]", name, props ?? "");
  }
}
