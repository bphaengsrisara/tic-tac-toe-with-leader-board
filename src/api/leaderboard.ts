import { LeaderboardResponse } from "@/interfaces/api";
import { fakeDelay } from "@/lib/utils";

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  const response = await fetch("/api/leaderboard");

  fakeDelay();

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  return response.json();
}
