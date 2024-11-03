import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { LeaderboardEntry } from "@/interfaces/api";

export async function GET() {
  try {
    const leaderboard = await db.score.findMany({
      orderBy: { points: "desc" },
      select: {
        user: { select: { id: true, name: true } }, // Fetch just user's name
        points: true,
      },
      take: 10, // Limit to top 10 players (no need pagination logic)
    });

    // Assign ranks to the leaderboard entries, accounting for ties
    const rankedLeaderboard: LeaderboardEntry[] = [];
    let currentRank = 1;
    let lastPoints = null;

    for (const entry of leaderboard) {
      // Check if the points have changed
      if (entry.points !== lastPoints) {
        lastPoints = entry.points;
        rankedLeaderboard.push({
          ...entry,
          rank: currentRank,
        });
        currentRank++; // Increment rank only when the points change
      } else {
        // If the points are the same as the last one, assign the same rank
        rankedLeaderboard.push({
          ...entry,
          rank: currentRank - 1, // Maintain the same rank as before
        });
      }
    }

    return NextResponse.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
