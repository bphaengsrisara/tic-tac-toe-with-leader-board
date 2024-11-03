/* eslint-disable sonarjs/pseudo-random */
"use client";

import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useBoundStore from "@/store/useBoundStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentScore, updateGameScore } from "@/api";
import { cn } from "@/lib/utils";

export default function Game() {
  const { data: session } = useSession();
  const { id: userId, name } = session?.user ?? {};
  const {
    squares,
    isXNext,
    draw,
    gameState,
    winner,
    resetGame,
    handleSquareClick,
    botMove,
    setGameState,
    setDraw,
  } = useBoundStore((state) => state);

  const queryClient = useQueryClient();

  const {
    data: scoreData,
    isFetching: isScoreFetching,
    error: scoreError,
  } = useQuery({
    queryKey: ["scoreData", userId],
    queryFn: () => getCurrentScore(userId!),
    enabled: !!userId, // Only run the query if userId is available
  });

  // Mutation to update the score
  const {
    mutate: updateScore,
    isPending: isScoreUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateGameScore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["scoreData"],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["leaderboard"],
        refetchType: "active",
      });
    },
  });

  const isLoading = useMemo(
    () => isScoreFetching || isScoreUpdating,
    [isScoreFetching, isScoreUpdating],
  );

  useEffect(() => {
    resetGame(); // Reset the game on component mount
  }, [resetGame]);

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => botMove(), 500); // Delay bot move
      return () => clearTimeout(timer);
    }
  }, [botMove, isXNext, winner]);

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
      {isScoreFetching && (
        <p className="text-lg text-blue-500">Loading current score...</p>
      )}
      {scoreError && (
        <p className="text-lg text-red-500">
          Error loading score: {scoreError.message}
        </p>
      )}
      {!isScoreFetching && scoreData && (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium">
            Current Points:{" "}
            <span className="font-bold text-blue-700">{scoreData.points}</span>
          </p>
          <p className="text-lg font-medium">
            Ranking:{" "}
            <span className="font-bold text-green-600">{scoreData.rank}</span>
          </p>
        </div>
      )}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Button
            // eslint-disable-next-line sonarjs/no-array-index-key
            key={i}
            className="h-16 w-16 border border-gray-500 text-2xl font-semibold"
            onClick={() => handleSquareClick(i)}
            disabled={!!square || !!winner || draw || !isXNext || isLoading}
          >
            {square}
          </Button>
        ))}
      </div>
      <Button
        onClick={resetGame}
        disabled={isLoading}
        className="mt-6 bg-blue-500 text-white disabled:bg-slate-600"
      >
        Restart Game
      </Button>

      {isScoreUpdating && (
        <p className="mt-4 text-sm text-blue-500">Updating score...</p>
      )}
      {updateError && (
        <p className="mt-4 text-sm text-red-500">
          Error updating score. Please try again.
        </p>
      )}

      <Link
        href={isLoading ? {} : "/leaderboard"}
        passHref
        className={cn(isLoading && "cursor-default")}
      >
        <Button
          disabled={isLoading}
          className="mt-4 bg-green-500 text-white disabled:bg-slate-600"
        >
          Go to Leaderboard
        </Button>
      </Link>
    </div>
  );
}
