// Daily Emoji Sudoku - Puzzle Data
// Each puzzle is a valid 4x4 Sudoku with emojis instead of numbers.
// Rules: Each row, column, and 2x2 box contains every emoji exactly once.
//
// ALL givens are derived directly from the solution — no mismatch possible.
// Hard puzzles use 5 givens to ensure a unique solution.
//
// Future expansion: Add 6x6 and 9x9 puzzle packs here.

export type Difficulty = "easy" | "medium" | "hard";

export type EmojiCell = string | null;
export type EmojiGrid = EmojiCell[][];

export interface Puzzle {
  id: string;
  title: string;
  difficulty: Difficulty;
  emojiSetName: string;
  emojis: [string, string, string, string];
  givens: EmojiGrid;
  solution: EmojiGrid;
}

// Helper: build a givens grid by masking a solved grid.
// positions is an array of [row, col] pairs to KEEP (all others become null).
function mask(solution: EmojiGrid, positions: [number, number][]): EmojiGrid {
  const grid: EmojiGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  for (const [r, c] of positions) {
    grid[r][c] = solution[r][c];
  }
  return grid;
}

// ─────────────────────────────────────────────────────────────
// VALID 4x4 SUDOKU SOLUTIONS — verified by hand
// Notation: A=emoji[0], B=emoji[1], C=emoji[2], D=emoji[3]
//
// Pattern P1 (used by most food/animal themes):
//   A B C D
//   C D A B
//   B A D C
//   D C B A
//
// Pattern P2 (alternate):
//   A B C D
//   C D A B
//   D C B A
//   B A D C
//
// Pattern P3:
//   A B C D
//   D C B A
//   B A D C
//   C D A B
//
// Pattern P4:
//   A B C D
//   D C B A
//   C D A B
//   B A D C
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────
// EASY PUZZLES (10) — 8 givens each (half-filled)
// ─────────────────────────────────────────────

const easyPuzzles: Puzzle[] = [
  // easy-001 — Food (P1)
  {
    id: "easy-001",
    title: "Fast Food Frenzy",
    difficulty: "easy",
    emojiSetName: "Food",
    emojis: ["🍕", "🍔", "🍟", "🌮"],
    solution: [
      ["🍕", "🍔", "🍟", "🌮"],
      ["🍟", "🌮", "🍕", "🍔"],
      ["🍔", "🍕", "🌮", "🍟"],
      ["🌮", "🍟", "🍔", "🍕"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,2],[1,3],
        [2,0],[2,3],
        [3,1],[3,2],
      ]);
    },
  },
  // easy-002 — Animals (P1)
  {
    id: "easy-002",
    title: "Animal Kingdom",
    difficulty: "easy",
    emojiSetName: "Animals",
    emojis: ["🐶", "🐱", "🐸", "🐵"],
    solution: [
      ["🐶", "🐱", "🐸", "🐵"],
      ["🐸", "🐵", "🐶", "🐱"],
      ["🐱", "🐶", "🐵", "🐸"],
      ["🐵", "🐸", "🐱", "🐶"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,2],[0,3],
        [1,1],[1,2],
        [2,0],[2,3],
        [3,0],[3,2],
      ]);
    },
  },
  // easy-003 — Sports (P2)
  {
    id: "easy-003",
    title: "Game Day",
    difficulty: "easy",
    emojiSetName: "Sports",
    emojis: ["⚽", "🏀", "🏈", "⚾"],
    solution: [
      ["⚽", "🏀", "🏈", "⚾"],
      ["🏈", "⚾", "⚽", "🏀"],
      ["⚾", "🏈", "🏀", "⚽"],
      ["🏀", "⚽", "⚾", "🏈"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,0],[1,3],
        [2,1],[2,2],
        [3,2],[3,3],
      ]);
    },
  },
  // easy-004 — Fruit (P1)
  {
    id: "easy-004",
    title: "Fruit Basket",
    difficulty: "easy",
    emojiSetName: "Fruit",
    emojis: ["🍎", "🍌", "🍇", "🍓"],
    solution: [
      ["🍎", "🍌", "🍇", "🍓"],
      ["🍇", "🍓", "🍎", "🍌"],
      ["🍌", "🍎", "🍓", "🍇"],
      ["🍓", "🍇", "🍌", "🍎"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,2],[0,3],
        [1,0],[1,1],
        [2,1],[2,3],
        [3,2],[3,3],
      ]);
    },
  },
  // easy-005 — Space (P3)
  {
    id: "easy-005",
    title: "Cosmic Journey",
    difficulty: "easy",
    emojiSetName: "Space",
    emojis: ["🌙", "⭐", "🪐", "🚀"],
    solution: [
      ["🌙", "⭐", "🪐", "🚀"],
      ["🚀", "🪐", "⭐", "🌙"],
      ["⭐", "🌙", "🚀", "🪐"],
      ["🪐", "🚀", "🌙", "⭐"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,2],[1,3],
        [2,0],[2,2],
        [3,0],[3,1],
      ]);
    },
  },
  // easy-006 — Weather (P4)
  {
    id: "easy-006",
    title: "Weather Watch",
    difficulty: "easy",
    emojiSetName: "Weather",
    emojis: ["☀️", "🌧️", "❄️", "🌈"],
    solution: [
      ["☀️", "🌧️", "❄️", "🌈"],
      ["🌈", "❄️", "☀️", "🌧️"],
      ["❄️", "🌈", "🌧️", "☀️"],
      ["🌧️", "☀️", "🌈", "❄️"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,0],[1,2],
        [2,1],[2,3],
        [3,2],[3,3],
      ]);
    },
  },
  // easy-007 — Halloween (P1)
  {
    id: "easy-007",
    title: "Spooky Night",
    difficulty: "easy",
    emojiSetName: "Halloween",
    emojis: ["🎃", "👻", "🦇", "🍬"],
    solution: [
      ["🎃", "👻", "🦇", "🍬"],
      ["🦇", "🍬", "🎃", "👻"],
      ["👻", "🎃", "🍬", "🦇"],
      ["🍬", "🦇", "👻", "🎃"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,2],[0,3],
        [1,0],[1,1],
        [2,2],[2,3],
        [3,1],[3,2],
      ]);
    },
  },
  // easy-008 — Ocean (P2)
  {
    id: "easy-008",
    title: "Under the Sea",
    difficulty: "easy",
    emojiSetName: "Ocean",
    emojis: ["🐠", "🐙", "🐬", "🐚"],
    solution: [
      ["🐠", "🐙", "🐬", "🐚"],
      ["🐬", "🐚", "🐠", "🐙"],
      ["🐚", "🐬", "🐙", "🐠"],
      ["🐙", "🐠", "🐚", "🐬"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,1],[1,2],
        [2,0],[2,2],
        [3,0],[3,3],
      ]);
    },
  },
  // easy-009 — Nature (P3)
  {
    id: "easy-009",
    title: "Nature Walk",
    difficulty: "easy",
    emojiSetName: "Nature",
    emojis: ["🌲", "🌸", "🍄", "🐝"],
    solution: [
      ["🌲", "🌸", "🍄", "🐝"],
      ["🐝", "🍄", "🌸", "🌲"],
      ["🌸", "🌲", "🐝", "🍄"],
      ["🍄", "🐝", "🌲", "🌸"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,2],[0,3],
        [1,0],[1,1],
        [2,1],[2,3],
        [3,2],[3,3],
      ]);
    },
  },
  // easy-010 — Holiday (P4)
  {
    id: "easy-010",
    title: "Holiday Cheer",
    difficulty: "easy",
    emojiSetName: "Holiday",
    emojis: ["🎁", "🎄", "⛄", "🔔"],
    solution: [
      ["🎁", "🎄", "⛄", "🔔"],
      ["🔔", "⛄", "🎁", "🎄"],
      ["⛄", "🔔", "🎄", "🎁"],
      ["🎄", "🎁", "🔔", "⛄"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,1],[0,3],
        [1,1],[1,3],
        [2,0],[2,2],
        [3,1],[3,2],
      ]);
    },
  },
];

// ─────────────────────────────────────────────
// MEDIUM PUZZLES (10) — 6 givens each
// ─────────────────────────────────────────────

const mediumPuzzles: Puzzle[] = [
  // medium-001 — Food (P1)
  {
    id: "medium-001",
    title: "Taco Tuesday",
    difficulty: "medium",
    emojiSetName: "Food",
    emojis: ["🍕", "🍔", "🍟", "🌮"],
    solution: [
      ["🍕", "🍔", "🍟", "🌮"],
      ["🍟", "🌮", "🍕", "🍔"],
      ["🍔", "🍕", "🌮", "🍟"],
      ["🌮", "🍟", "🍔", "🍕"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,1],[1,2],
        [2,0],[2,3],
      ]);
    },
  },
  // medium-002 — Animals (P1)
  {
    id: "medium-002",
    title: "Safari Fun",
    difficulty: "medium",
    emojiSetName: "Animals",
    emojis: ["🐶", "🐱", "🐸", "🐵"],
    solution: [
      ["🐶", "🐱", "🐸", "🐵"],
      ["🐸", "🐵", "🐶", "🐱"],
      ["🐱", "🐶", "🐵", "🐸"],
      ["🐵", "🐸", "🐱", "🐶"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,1],[0,3],
        [1,0],[1,2],
        [3,0],[3,3],
      ]);
    },
  },
  // medium-003 — Sports (P2)
  {
    id: "medium-003",
    title: "Sports Arena",
    difficulty: "medium",
    emojiSetName: "Sports",
    emojis: ["⚽", "🏀", "🏈", "⚾"],
    solution: [
      ["⚽", "🏀", "🏈", "⚾"],
      ["🏈", "⚾", "⚽", "🏀"],
      ["⚾", "🏈", "🏀", "⚽"],
      ["🏀", "⚽", "⚾", "🏈"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,0],[1,3],
        [2,1],[3,2],
      ]);
    },
  },
  // medium-004 — Fruit (P1)
  {
    id: "medium-004",
    title: "Orchard Dreams",
    difficulty: "medium",
    emojiSetName: "Fruit",
    emojis: ["🍎", "🍌", "🍇", "🍓"],
    solution: [
      ["🍎", "🍌", "🍇", "🍓"],
      ["🍇", "🍓", "🍎", "🍌"],
      ["🍌", "🍎", "🍓", "🍇"],
      ["🍓", "🍇", "🍌", "🍎"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,1],[1,2],
        [2,0],[3,3],
      ]);
    },
  },
  // medium-005 — Space (P3)
  {
    id: "medium-005",
    title: "Stargazing",
    difficulty: "medium",
    emojiSetName: "Space",
    emojis: ["🌙", "⭐", "🪐", "🚀"],
    solution: [
      ["🌙", "⭐", "🪐", "🚀"],
      ["🚀", "🪐", "⭐", "🌙"],
      ["⭐", "🌙", "🚀", "🪐"],
      ["🪐", "🚀", "🌙", "⭐"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,1],[2,2],
        [3,0],[3,3],
      ]);
    },
  },
  // medium-006 — Weather (P4)
  {
    id: "medium-006",
    title: "Storm Season",
    difficulty: "medium",
    emojiSetName: "Weather",
    emojis: ["☀️", "🌧️", "❄️", "🌈"],
    solution: [
      ["☀️", "🌧️", "❄️", "🌈"],
      ["🌈", "❄️", "☀️", "🌧️"],
      ["❄️", "🌈", "🌧️", "☀️"],
      ["🌧️", "☀️", "🌈", "❄️"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,1],[2,2],
        [3,0],[3,3],
      ]);
    },
  },
  // medium-007 — Halloween (P1)
  {
    id: "medium-007",
    title: "Trick or Treat",
    difficulty: "medium",
    emojiSetName: "Halloween",
    emojis: ["🎃", "👻", "🦇", "🍬"],
    solution: [
      ["🎃", "👻", "🦇", "🍬"],
      ["🦇", "🍬", "🎃", "👻"],
      ["👻", "🎃", "🍬", "🦇"],
      ["🍬", "🦇", "👻", "🎃"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,1],[0,3],
        [1,0],[2,3],
        [3,0],[3,2],
      ]);
    },
  },
  // medium-008 — Ocean (P2)
  {
    id: "medium-008",
    title: "Deep Dive",
    difficulty: "medium",
    emojiSetName: "Ocean",
    emojis: ["🐠", "🐙", "🐬", "🐚"],
    solution: [
      ["🐠", "🐙", "🐬", "🐚"],
      ["🐬", "🐚", "🐠", "🐙"],
      ["🐚", "🐬", "🐙", "🐠"],
      ["🐙", "🐠", "🐚", "🐬"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,1],[2,2],
        [3,0],[3,3],
      ]);
    },
  },
  // medium-009 — Nature (P3)
  {
    id: "medium-009",
    title: "Forest Path",
    difficulty: "medium",
    emojiSetName: "Nature",
    emojis: ["🌲", "🌸", "🍄", "🐝"],
    solution: [
      ["🌲", "🌸", "🍄", "🐝"],
      ["🐝", "🍄", "🌸", "🌲"],
      ["🌸", "🌲", "🐝", "🍄"],
      ["🍄", "🐝", "🌲", "🌸"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,1],[0,3],
        [1,0],[2,3],
        [3,1],[3,2],
      ]);
    },
  },
  // medium-010 — Holiday (P4)
  {
    id: "medium-010",
    title: "Winter Wonderland",
    difficulty: "medium",
    emojiSetName: "Holiday",
    emojis: ["🎁", "🎄", "⛄", "🔔"],
    solution: [
      ["🎁", "🎄", "⛄", "🔔"],
      ["🔔", "⛄", "🎁", "🎄"],
      ["⛄", "🔔", "🎄", "🎁"],
      ["🎄", "🎁", "🔔", "⛄"],
    ],
    get givens() {
      return mask(this.solution, [
        [0,0],[0,3],
        [1,2],[2,1],
        [3,0],[3,3],
      ]);
    },
  },
];

// ─────────────────────────────────────────────
// HARD PUZZLES (10) — 5 givens, carefully chosen
// for unique solvability. Verified: each set of
// givens yields exactly one valid completion.
// ─────────────────────────────────────────────

const hardPuzzles: Puzzle[] = [
  // hard-001 — Food (P1) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,3]
  {
    id: "hard-001",
    title: "Gourmet Challenge",
    difficulty: "hard",
    emojiSetName: "Food",
    emojis: ["🍕", "🍔", "🍟", "🌮"],
    solution: [
      ["🍕", "🍔", "🍟", "🌮"],
      ["🍟", "🌮", "🍕", "🍔"],
      ["🍔", "🍕", "🌮", "🍟"],
      ["🌮", "🍟", "🍔", "🍕"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,3]]);
    },
  },
  // hard-002 — Animals (P1) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,3]
  {
    id: "hard-002",
    title: "Wild Instincts",
    difficulty: "hard",
    emojiSetName: "Animals",
    emojis: ["🐶", "🐱", "🐸", "🐵"],
    solution: [
      ["🐶", "🐱", "🐸", "🐵"],
      ["🐸", "🐵", "🐶", "🐱"],
      ["🐱", "🐶", "🐵", "🐸"],
      ["🐵", "🐸", "🐱", "🐶"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,3]]);
    },
  },
  // hard-003 — Sports (P2) — unique with 5 givens at [0,0],[0,1],[0,2],[2,0],[2,3]
  {
    id: "hard-003",
    title: "Championship Final",
    difficulty: "hard",
    emojiSetName: "Sports",
    emojis: ["⚽", "🏀", "🏈", "⚾"],
    solution: [
      ["⚽", "🏀", "🏈", "⚾"],
      ["🏈", "⚾", "⚽", "🏀"],
      ["⚾", "🏈", "🏀", "⚽"],
      ["🏀", "⚽", "⚾", "🏈"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[2,0],[2,3]]);
    },
  },
  // hard-004 — Fruit (P1) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,3]
  {
    id: "hard-004",
    title: "Jungle Harvest",
    difficulty: "hard",
    emojiSetName: "Fruit",
    emojis: ["🍎", "🍌", "🍇", "🍓"],
    solution: [
      ["🍎", "🍌", "🍇", "🍓"],
      ["🍇", "🍓", "🍎", "🍌"],
      ["🍌", "🍎", "🍓", "🍇"],
      ["🍓", "🍇", "🍌", "🍎"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,3]]);
    },
  },
  // hard-005 — Space (P3) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,2]
  {
    id: "hard-005",
    title: "Galaxy Quest",
    difficulty: "hard",
    emojiSetName: "Space",
    emojis: ["🌙", "⭐", "🪐", "🚀"],
    solution: [
      ["🌙", "⭐", "🪐", "🚀"],
      ["🚀", "🪐", "⭐", "🌙"],
      ["⭐", "🌙", "🚀", "🪐"],
      ["🪐", "🚀", "🌙", "⭐"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,2]]);
    },
  },
  // hard-006 — Weather (P4) — unique with 5 givens at [0,0],[0,1],[0,2],[2,0],[2,2]
  {
    id: "hard-006",
    title: "The Perfect Storm",
    difficulty: "hard",
    emojiSetName: "Weather",
    emojis: ["☀️", "🌧️", "❄️", "🌈"],
    solution: [
      ["☀️", "🌧️", "❄️", "🌈"],
      ["🌈", "❄️", "☀️", "🌧️"],
      ["❄️", "🌈", "🌧️", "☀️"],
      ["🌧️", "☀️", "🌈", "❄️"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[2,0],[2,2]]);
    },
  },
  // hard-007 — Halloween (P1) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,3]
  {
    id: "hard-007",
    title: "The Haunting",
    difficulty: "hard",
    emojiSetName: "Halloween",
    emojis: ["🎃", "👻", "🦇", "🍬"],
    solution: [
      ["🎃", "👻", "🦇", "🍬"],
      ["🦇", "🍬", "🎃", "👻"],
      ["👻", "🎃", "🍬", "🦇"],
      ["🍬", "🦇", "👻", "🎃"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,3]]);
    },
  },
  // hard-008 — Ocean (P2) — unique with 5 givens at [0,0],[0,1],[0,2],[2,0],[2,3]
  {
    id: "hard-008",
    title: "Abyss",
    difficulty: "hard",
    emojiSetName: "Ocean",
    emojis: ["🐠", "🐙", "🐬", "🐚"],
    solution: [
      ["🐠", "🐙", "🐬", "🐚"],
      ["🐬", "🐚", "🐠", "🐙"],
      ["🐚", "🐬", "🐙", "🐠"],
      ["🐙", "🐠", "🐚", "🐬"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[2,0],[2,3]]);
    },
  },
  // hard-009 — Nature (P3) — unique with 5 givens at [0,0],[0,1],[0,2],[3,0],[3,2]
  {
    id: "hard-009",
    title: "Into the Wild",
    difficulty: "hard",
    emojiSetName: "Nature",
    emojis: ["🌲", "🌸", "🍄", "🐝"],
    solution: [
      ["🌲", "🌸", "🍄", "🐝"],
      ["🐝", "🍄", "🌸", "🌲"],
      ["🌸", "🌲", "🐝", "🍄"],
      ["🍄", "🐝", "🌲", "🌸"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[3,0],[3,2]]);
    },
  },
  // hard-010 — Holiday (P4) — unique with 5 givens at [0,0],[0,1],[0,2],[2,0],[2,2]
  {
    id: "hard-010",
    title: "Secret Santa",
    difficulty: "hard",
    emojiSetName: "Holiday",
    emojis: ["🎁", "🎄", "⛄", "🔔"],
    solution: [
      ["🎁", "🎄", "⛄", "🔔"],
      ["🔔", "⛄", "🎁", "🎄"],
      ["⛄", "🔔", "🎄", "🎁"],
      ["🎄", "🎁", "🔔", "⛄"],
    ],
    get givens() {
      return mask(this.solution, [[0,0],[0,1],[0,2],[2,0],[2,2]]);
    },
  },
];

// All puzzles combined
export const ALL_PUZZLES: Puzzle[] = [
  ...easyPuzzles,
  ...mediumPuzzles,
  ...hardPuzzles,
];

export const PUZZLES_BY_DIFFICULTY = {
  easy: easyPuzzles,
  medium: mediumPuzzles,
  hard: hardPuzzles,
};

// Deterministic daily puzzle selection based on date
export function getDailyPuzzle(): Puzzle {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (const char of dateKey) {
    hash = (hash * 31 + char.charCodeAt(0)) % ALL_PUZZLES.length;
  }
  return ALL_PUZZLES[Math.abs(hash) % ALL_PUZZLES.length];
}

export function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
