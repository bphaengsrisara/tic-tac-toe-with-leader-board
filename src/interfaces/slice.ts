export interface GameSlice {
  squares: (string | null)[];
  isXNext: boolean;
  draw: boolean;
  isBotMoving: boolean;
  gameState: string | null; // Could be "X", "O", or "draw"
  resetGame: () => void;
  handleSquareClick: (index: number) => void;
  botMove: () => void;
  setGameState: (gameState: string | null) => void;
  setDraw: (draw: boolean) => void;
}

export type BoundSlice = GameSlice;
