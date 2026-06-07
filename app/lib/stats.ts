export type Stats = {
  winStreak: number;
  wins: number;
  losses: number;
  winPct: Number;
  history: Map<string, Array<Result>>;
  avgGuesses: Number;
  gamesPlayed: number;
  totalGuesses: number;
};

export enum Result {
  Wrong = 0,
  Right = 1,
  NA = 2,
}
