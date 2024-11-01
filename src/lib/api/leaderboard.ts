export async function getLeaderboard() {
  const response = await fetch("/api/leaderboard");
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }
  return response.json();
}
