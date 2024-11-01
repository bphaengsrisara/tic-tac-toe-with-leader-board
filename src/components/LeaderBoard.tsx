"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/lib/api"; // Import your API function
import { Button } from "@/components/ui/button"; // Adjust import if necessary
import Link from "next/link";

type LeaderboardEntry = {
  user: { id: string; name: string };
  points: number;
};

export default function Leaderboard() {
  const { data, error, isLoading } = useQuery<{
    leaderboard: LeaderboardEntry[];
  }>({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  let renderer;

  if (isLoading) {
    renderer = <p>Loading leaderboard...</p>;
  } else if (error) {
    renderer = (
      <p className="text-red-500">
        Error fetching leaderboard: {error.message}
      </p>
    );
  } else {
    renderer = (
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {data?.leaderboard.map((entry) => (
            <tr key={entry.user.id}>
              <td className="border border-gray-300 p-2">{entry.user.name}</td>
              <td className="border border-gray-300 p-2">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Leaderboard</h1>
      {renderer}
      <Link href="/" passHref>
        <Button className="mt-6 bg-blue-500 text-white">Back to Game</Button>
      </Link>
    </div>
  );
}
