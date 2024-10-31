import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, result } = await req.json();

    // Check if a score record exists for the user
    let currentScore = await db.score.findFirst({ where: { userId } });

    // If no score exists, create an initial score entry for the user
    if (!currentScore) {
      currentScore = await db.score.create({
        data: {
          userId,
          wins: 0,
          losses: 0,
          points: 0,
          winStreak: 0,
        },
      });
    }

    let { wins, losses, points, winStreak } = currentScore;

    if (result === "win") {
      wins += 1;
      winStreak += 1;
      points += 1;
      if (winStreak === 3) {
        points += 1; // Bonus point for a 3-win streak
        winStreak = 0;
      }
    } else if (result === "loss") {
      losses += 1;
      points -= 1;
      winStreak = 0;
    }

    // Update the score record with the new values
    await db.score.updateMany({
      where: { userId },
      data: { wins, losses, points, winStreak },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
