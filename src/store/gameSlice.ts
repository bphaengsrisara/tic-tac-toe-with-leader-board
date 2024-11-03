import { GameSlice } from "@/interfaces/slice";
import { simpleRandom } from "@/lib/utils";
import { StateCreator } from "zustand";

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const checkDraw = (squares: (string | null)[]) => {
  return (
    squares.every((square) => square !== null) && !calculateWinner(squares)
  );
};

export const createGameSlice: StateCreator<GameSlice> = (set) => ({
  squares: Array(9).fill(null),
  isXNext: true,
  draw: false,
  isBotMoving: false,
  gameState: null,
  winner: null,
  points: 0,
  rank: null,
  resetGame: () => {
    const isXStart = simpleRandom() < 0.5; // Randomly choose who goes first
    set(() => ({
      squares: Array(9).fill(null),
      isXNext: isXStart,
      draw: false,
      gameState: null,
      winner: null,
      isBotMoving: !isXStart, // Control bot moving state based on who goes first
    }));
  },
  handleSquareClick: (index) =>
    set((state) => {
      if (
        state.squares[index] ||
        state.gameState ||
        state.draw ||
        state.isBotMoving
      ) {
        return state; // Prevent update if square is occupied or game is over
      }

      const newSquares = state.squares.slice();
      newSquares[index] = "X"; // Assuming player is always "X"
      const winner = calculateWinner(newSquares);
      const isDraw = checkDraw(newSquares);

      return {
        squares: newSquares,
        isXNext: false, // Switch to the bot's turn
        isBotMoving: true, // Now it's the bot's turn
        gameState: winner ?? (isDraw ? "draw" : null), // Set game state to winner or draw
        winner,
        draw: isDraw,
      };
    }),
  botMove: () =>
    set((state) => {
      if (
        state.isXNext ||
        calculateWinner(state.squares) ||
        checkDraw(state.squares)
      )
        return state;

      const emptySquares = state.squares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);
      const randomIndex = Math.floor(simpleRandom() * emptySquares.length);
      const move = emptySquares[randomIndex];

      if (move !== undefined) {
        const newSquares = state.squares.slice();
        newSquares[move] = "O";
        const winner = calculateWinner(newSquares);
        const isDraw = checkDraw(newSquares);

        return {
          squares: newSquares,
          isXNext: true,
          gameState: winner ?? (isDraw ? "draw" : null),
          draw: isDraw,
          winner,
          isBotMoving: false,
        };
      }
      return state;
    }),
  setGameState: (gameState) => set(() => ({ gameState })),
  setDraw: (draw) => set(() => ({ draw })),
});
