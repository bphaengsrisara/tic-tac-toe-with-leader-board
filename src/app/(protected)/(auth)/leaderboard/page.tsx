"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LeaderboardEntry = {
  user: { id: string; name: string };
  points: number;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        if (response.ok) {
          setLeaderboard(data.leaderboard);
        } else {
          setError("Failed to load leaderboard data");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Error fetching leaderboard data");
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.user.name}>
                <td className="border border-gray-300 p-2">
                  {entry.user.name}
                </td>
                <td className="border border-gray-300 p-2">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link href="/" passHref>
        <Button className="mt-6 bg-blue-500 text-white">Back to Game</Button>
      </Link>
    </div>
  );
}
