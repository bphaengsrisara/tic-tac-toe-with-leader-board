import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
