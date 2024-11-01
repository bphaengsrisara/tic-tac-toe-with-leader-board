/* eslint-disable sonarjs/pseudo-random */
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Game() {
  const { data: session } = useSession();
  const { id: userId, name } = session?.user ?? {};
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [isBotMoving, setIsBotMoving] = useState<boolean>(false);
  const [gameState, setGameState] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [rank, setRank] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const checkDraw = useCallback((squares: (string | null)[]) => {
    return (
      squares.every((square) => square !== null) && !calculateWinner(squares)
    );
  }, []);

  // Fetch current points and rank
  const fetchScoreData = useCallback(async () => {
    try {
      const response = await fetch("/api/score/current", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setPoints(data.points);
      setRank(data.rank);
    } catch (error) {
      console.error("Error fetching score data:", error);
    }
  }, [userId]);

  const updateScore = useCallback(
    async (result: "win" | "loss") => {
      try {
        const response = await fetch("/api/score/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, result }),
        });
        const data = await response.json();
        if (data.success) {
          // Re-fetch score data to update points and rank
          await fetchScoreData();
        }
      } catch (error) {
        console.error("Error updating score:", error);
      }
    },
    [userId, fetchScoreData],
  );

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setDraw(false);
    setGameState(null);

    const isXStart = Math.random() < 0.5; // Randomly choose who goes first
    setIsXNext(isXStart);
    // control bot moving state depend on who goes first
    setIsBotMoving(!isXStart);
  };

  const handleSquareClick = useCallback(
    (index: number) => {
      if (squares[index] || calculateWinner(squares) || draw || isBotMoving)
        return;

      const newSquares = squares.slice();
      newSquares[index] = "X";
      setSquares(newSquares);
      setIsXNext(false);
      setIsBotMoving(true);
    },
    [squares, draw, isBotMoving],
  );

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === "X") {
        updateScore("win");
        setGameState(`Winner: ${name}`);
      } else {
        updateScore("loss");
        setGameState(`Winner: Smart Bot`);
      }
    } else if (checkDraw(squares)) {
      setGameState("It's a draw!");
      setDraw(true);
    }
  }, [checkDraw, name, squares, updateScore]);

  useEffect(() => {
    if (!isXNext && !calculateWinner(squares) && !draw) {
      const botMove = () => {
        const emptySquares = squares
          .map((square, index) => (square === null ? index : null))
          .filter((index) => index !== null);
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const move = emptySquares[randomIndex];

        if (move !== undefined) {
          const newSquares = squares.slice();
          newSquares[move] = "O";
          setSquares(newSquares);
          setIsXNext(true);

          if (checkDraw(newSquares)) setDraw(true);
        }
        setIsBotMoving(false);
      };

      const timer = setTimeout(botMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, draw, checkDraw]);

  // Initial fetch for score data
  useEffect(() => {
    if (userId) {
      fetchScoreData();
    }
  }, [userId, fetchScoreData]);

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Tic-Tac-Toe</h1>
      <p className="mb-4">
        {gameState ?? `Next player: ${isXNext ? "X" : "O"}`}
      </p>
      <p className="mb-4">Current Points: {points}</p>
      <p className="mb-4">Ranking: {rank}</p>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Button
            // eslint-disable-next-line sonarjs/no-array-index-key
            key={i}
            className="h-16 w-16 border border-gray-500 text-2xl font-semibold"
            onClick={() => handleSquareClick(i)}
            disabled={
              !!square || !!calculateWinner(squares) || draw || isBotMoving
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
