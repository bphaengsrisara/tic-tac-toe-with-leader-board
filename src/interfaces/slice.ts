export interface GameSlice {
  squares: (string | null)[];
  isXNext: boolean;
  draw: boolean;
  gameState: string | null;
  winner: string | null;
  resetGame: () => void;
  handleSquareClick: (index: number) => void;
  botMove: () => void;
  setGameState: (gameState: string | null) => void;
  setDraw: (draw: boolean) => void;
}

export type BoundSlice = GameSlice;
