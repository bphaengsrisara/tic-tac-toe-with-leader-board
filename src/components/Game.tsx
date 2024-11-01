/* eslint-disable sonarjs/pseudo-random */
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useBoundStore from "@/store/useBoundStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentScore, updateGameScore } from "@/lib/api";

export default function Game() {
  const { data: session } = useSession();
  const { id: userId, name } = session?.user ?? {};
  const {
    squares,
    isXNext,
    draw,
    gameState,
    isBotMoving,
    resetGame,
    handleSquareClick,
    botMove,
    setGameState,
    setDraw,
  } = useBoundStore((state) => state);

  const queryClient = useQueryClient();

  const { data: scoreData } = useQuery({
    queryKey: ["scoreData", userId],
    queryFn: () => getCurrentScore(userId!),
    enabled: !!userId, // Only run the query if userId is available
  });

  // Mutation to update the score
  const { mutate: updateScore } = useMutation({
    mutationFn: updateGameScore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["scoreData"],
        exact: false,
        refetchType: "active",
      });
    },
    onError: (error) => {
      console.error("Error updating score:", error);
    },
  });

  useEffect(() => {
    resetGame(); // Reset the game on component mount
  }, [resetGame]);

  useEffect(() => {
    if (isBotMoving) {
      const timer = setTimeout(() => botMove(), 500); // Delay bot move
      return () => clearTimeout(timer);
    }
  }, [isBotMoving, botMove]);

  // Check for a winner or draw from gameState
  useEffect(() => {
    if (gameState && userId) {
      if (gameState === "X") {
        updateScore({ userId, result: "win" });
        setGameState(`Winner: ${name}`);
      } else if (gameState === "O") {
        updateScore({ userId, result: "loss" });
        setGameState(`Winner: Smart Bot`);
      }
    } else if (gameState === "draw") {
      setGameState("It's a draw!");
      setDraw(true);
    }
  }, [gameState, name, setDraw, setGameState, squares, updateScore, userId]);

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Tic-Tac-Toe</h1>
      <p className="mb-4">
        {gameState ?? `Next player: ${isXNext ? "X" : "O"}`}
      </p>
      <p className="mb-4">Current Points: {scoreData?.points}</p>
      <p className="mb-4">Ranking: {scoreData?.rank}</p>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Button
            // eslint-disable-next-line sonarjs/no-array-index-key
            key={i}
            className="h-16 w-16 border border-gray-500 text-2xl font-semibold"
            onClick={() => handleSquareClick(i)}
            disabled={
              !!square ||
              ["win", "lose"].includes(`${gameState}`) ||
              draw ||
              isBotMoving
            }
          >
            {square}
          </Button>
        ))}
      </div>
      <Button onClick={resetGame} className="mt-6 bg-blue-500 text-white">
        Restart Game
      </Button>
      <Link href="/leaderboard" passHref>
        <Button className="mt-4 bg-green-500 text-white">
          Go to Leaderboard
        </Button>
      </Link>
    </div>
  );
}
