/* eslint-disable sonarjs/pseudo-random */
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Board() {
  const { data: session } = useSession();
  const { id: userId, name } = session?.user ?? {};
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [draw, setDraw] = useState<boolean>(false);
  const [isBotMoving, setIsBotMoving] = useState<boolean>(false);
  const [gameState, setGameState] = useState<string | null>(null);

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

  const updateScore = useCallback(
    async (result: "win" | "loss") => {
      try {
        const response = await fetch("/api/score/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, result }),
        });
        const data = await response.json();
        if (!data.success) {
          console.error("Error updating score:", data.error);
        }
      } catch (error) {
        console.error("Error updating score:", error);
      }
    },
    [userId],
  );

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setDraw(false);
    setIsBotMoving(false);
    setGameState(null);
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

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Tic-Tac-Toe</h1>
      <p className="mb-4">
        {gameState ?? `Next player: ${isXNext ? "X" : "O"}`}
      </p>
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
    </div>
  );
}
