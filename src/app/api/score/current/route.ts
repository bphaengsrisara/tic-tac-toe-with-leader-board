import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    // Get the current player's points
    const playerScore = await db.score.findFirst({
      where: { userId },
      select: { points: true },
    });

    if (!playerScore) {
      return NextResponse.json({ points: 0, rank: "Unranked" });
    }

    // Calculate the player's rank
    const rank = await db.score.count({
      where: { points: { gt: playerScore.points } },
    });

    return NextResponse.json({
      points: playerScore.points,
      rank: rank + 1, // Adjust to make rank 1-based
    });
  } catch (error) {
    console.error("Error fetching score and ranking:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
