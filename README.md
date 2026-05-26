# Daily Emoji Sudoku

A mobile-first React + Vite puzzle game where players solve 4x4 Sudoku-style grids using emojis.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Notes from refactor

- Puzzle completion now requires the board to exactly match the puzzle solution.
- Saved localStorage progress is validated before loading.
- The win handler is guarded so one completed puzzle cannot be recorded multiple times during the same play session.
- Daily puzzle completions only count once per day.
- Hints now correct an empty or incorrect editable cell.
- Mobile grid sizing was adjusted to avoid overflow on narrow screens.
- The unused Supabase dependency was removed because the app does not use it yet.

## Future upgrades

- Add 6x6 and 9x9 puzzle modes.
- Replace ad placeholders with approved ad units.
- Add route-based SEO pages for difficulty and theme pages.
- Add a real Open Graph image before launch.
