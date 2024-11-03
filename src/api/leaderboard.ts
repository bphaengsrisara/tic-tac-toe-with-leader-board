import { LeaderboardResponse } from "@/interfaces/api";

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  const response = await fetch("/api/leaderboard");

  // add fake delay
  await new Promise((r) => setTimeout(r, 500));

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  return response.json();
}
