// ─── Types ────────────────────────────────────────────────────────────────────
export type Player = "X" | "O";
export type Cell = Player | null;
export type GameStatus = "menu" | "playing" | "result";
export type GameMode = "bot" | "2player";
export type Winner = Player | "draw" | null;

export interface Score {
  X: number;
  O: number;
  draw: number;
}

export interface GameResult {
  winner: Winner;
  winningCells: number[] | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────
export const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const THEME = {
  bg: "#e57c23",
  card: "#025464",
  cardLight: "#f8f1f1",
  accent: "#e8aa42",
  success: "#138636",
  cellBg: "#f8f1f1",
  playerX: "#e57c23",
  playerO: "#025464",
  winHighlight: "#e8aa42",
} as const;

// ─── Pure Game Logic ──────────────────────────────────────────────────────────
export function checkGameResult(board: Cell[]): GameResult {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningCells: [a, b, c] };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "draw", winningCells: null };
  }
  return { winner: null, winningCells: null };
}

// ─── Minimax Algorithm ────────────────────────────────────────────────────────
function minimax(
  board: Cell[],
  depth: number,
  isMaximizing: boolean,
  botSymbol: Player,
  humanSymbol: Player,
): number {
  const { winner } = checkGameResult(board);
  if (winner === botSymbol) return 10 - depth;
  if (winner === humanSymbol) return depth - 10;
  if (winner === "draw") return 0;

  const empty = board
    .map((c, i) => (c === null ? i : null))
    .filter((i): i is number => i !== null);

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of empty) {
      board[i] = botSymbol;
      best = Math.max(
        best,
        minimax(board, depth + 1, false, botSymbol, humanSymbol),
      );
      board[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empty) {
      board[i] = humanSymbol;
      best = Math.min(
        best,
        minimax(board, depth + 1, true, botSymbol, humanSymbol),
      );
      board[i] = null;
    }
    return best;
  }
}

export function getBotMove(board: Cell[], botSymbol: Player): number {
  const humanSymbol: Player = botSymbol === "O" ? "X" : "O";
  const empty = board
    .map((c, i) => (c === null ? i : null))
    .filter((i): i is number => i !== null);

  let bestScore = -Infinity;
  let bestMove = empty[0];

  for (const i of empty) {
    board[i] = botSymbol;
    const score = minimax(board, 0, false, botSymbol, humanSymbol);
    board[i] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}
