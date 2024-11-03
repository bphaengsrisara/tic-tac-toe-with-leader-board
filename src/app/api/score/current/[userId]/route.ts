import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ScoreData, ErrorResponse } from "@/interfaces/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
): Promise<NextResponse<ScoreData | ErrorResponse>> {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

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
