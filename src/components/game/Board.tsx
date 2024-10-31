/* eslint-disable sonarjs/pseudo-random */
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// This game scope is about 3x3 Tic-Tac-Toe
export default function Board() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [isXNext, setIsXNext] = useState<boolean>(true); // Default to "X"
  const [draw, setDraw] = useState<boolean>(false); // State to track if the game is a draw
  const [isBotMoving, setIsBotMoving] = useState<boolean>(false); // State to track if bot is making a move

  const handleSquareClick = useCallback(
    (index: number) => {
      if (squares[index] || calculateWinner(squares) || draw || isBotMoving)
        return; // Disable if bot is moving

      const newSquares = squares.slice();
      newSquares[index] = "X"; // Human plays as "X"
      setSquares(newSquares);
      setIsXNext(false); // Switch to bot's turn
      setIsBotMoving(true); // Set bot moving state to true
    },
    [squares, draw, isBotMoving],
  );

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

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? "X" : "O";
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = `It's a draw!`;
  } else {
    status = `Next player: ${nextPlayer}`;
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true); // Start with "X" again
    setDraw(false); // Reset draw state
    setIsBotMoving(false); // Reset bot moving state
  };

  useEffect(() => {
    const isXStart = Math.random() < 0.5; // Randomly choose who goes first
    setIsXNext(isXStart);
    // control bot moving state depend on who goes first
    setIsBotMoving(!isXStart);
  }, []);

  // Effect to handle the bot's turn
  useEffect(() => {
    if (!isXNext && !winner && !draw) {
      const botMove = () => {
        const emptySquares = squares
          .map((square, index) => (square === null ? index : null))
          .filter((index) => index !== null);
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const move = emptySquares[randomIndex];

        if (move !== undefined) {
          const newSquares = squares.slice();
          newSquares[move] = "O"; // Bot plays as "O"
          setSquares(newSquares);
          setIsXNext(true); // Switch back to human's turn

          // Check for draw after bot's move
          if (checkDraw(newSquares)) {
            setDraw(true);
          }
        }

        setIsBotMoving(false); // Reset bot moving state after the move
      };

      const timer = setTimeout(botMove, 1000); // Delay for bot's turn
      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, winner, draw, checkDraw]);

  // Check for draw after each human move
  useEffect(() => {
    if (checkDraw(squares)) {
      setDraw(true);
    }
  }, [checkDraw, squares]);

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
            disabled={!!square || !!winner || draw || isBotMoving} // Disable button if already clicked, if there's a winner, if it's a draw, or if bot is moving
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
