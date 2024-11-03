export interface ScoreData {
  points: number;
  rank: string | number;
}

export interface LeaderboardEntry {
  user: {
    id: string;
    name: string | null;
  };
  points: number;
  rank: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}

export interface ErrorResponse {
  error: string;
}
