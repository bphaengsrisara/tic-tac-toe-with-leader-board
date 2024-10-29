"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// this game scope is about 3x3 tic-tac-toe
export default function Board() {
  // Define the type of squares state
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [isXNext, setIsXNext] = useState(true);

  const handleSquareClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: (string | null)[]) => {
    // hard code win condition for 3x3
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

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? "X" : "O";
  const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Tic-Tac-Toe</h1>
      <p className="mb-4">{status}</p>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Button
            // eslint-disable-next-line sonarjs/no-array-index-key
            key={i}
            className="h-16 w-16 border border-gray-500 text-2xl font-semibold"
            onClick={() => handleSquareClick(i)}
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
