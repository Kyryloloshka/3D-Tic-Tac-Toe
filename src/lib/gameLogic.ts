import { DifficultyEnum, GameStateType, Player } from "@/types";

export const calculateWinner = (squares: GameStateType) => {
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
  
  const diagonals = [
    [0, 13, 26],
    [2, 13, 24],
    [6, 13, 20],
    [8, 13, 18],
  ];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[j * 9 + a] && squares[j * 9 + a] === squares[j * 9 + b] && squares[j * 9 + a] === squares[j * 9 + c]) {
        return { winner: squares[j * 9 + a], line: [j * 9 + a, j * 9 + b, j * 9 + c] };
      }
    }
  }

  for (let i = 0; i < diagonals.length; i++) {
    const [a, b, c] = diagonals[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b + 9] && squares[a] === squares[c + 18]) {
      return { winner: squares[a], line: [a, b + 9, c + 18] };
    } else if (squares[a + 18] && squares[a + 18] === squares[b + 9] && squares[a + 18] === squares[c]) {
      return { winner: squares[a + 18], line: [a + 18, b + 9, c] };
    }
  }

  for (let i = 0; i < 9; i++) {
    if (squares[i] && squares[i] === squares[i + 9] && squares[i] === squares[i + 18]) {
      return { winner: squares[i], line: [i, i + 9, i + 18] };
    }
  }

  return { winner: null, line: null };
};

export const getRandomMove = (board: GameStateType, isCenterAvailable: boolean) => {
  const centerI = 13;
  const cornersI = [0, 2, 6, 8, 18, 20, 24, 26]
  const centersI = [4, 10, 12, 14, 16, 22]

  if (board[centerI] === null && isCenterAvailable) {
    return centerI;
  }

  const availableCorners = cornersI.filter((index) => board[index] === null);
  if (availableCorners.length > 0) {
    const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    return randomCorner;
  }

  const availableCenters = centersI.filter((index) => board[index] === null);
  if (availableCenters.length > 0) {
    const randomCorner = availableCenters[Math.floor(Math.random() * availableCenters.length)];
    return randomCorner;
  }
  
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

export const getBotMove = async ({board, player, difficulty}: {
  board: GameStateType;
  player: Player;
  difficulty: DifficultyEnum;
}) => {
  const delayOfBotMove = 500;

  const move = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(getMove(board, player, difficulty));
    }, delayOfBotMove);
  });

  return move;
};

const getMove = (board: GameStateType, player: Player, difficulty: DifficultyEnum) => {
  const emptyIndices = getEmptyIndices(board);

  if (emptyIndices.length === 0) throw new Error('No empty indices');

  let index: number;
  let strength: number;
  switch (difficulty) {
    case DifficultyEnum.easy:
      strength = 1
      break;
    case DifficultyEnum.medium:
      strength = 2
      break;  
    case DifficultyEnum.hard:
    case DifficultyEnum.expert:
      strength = 3
      break;
  }
  switch (strength) {
    case 1:
      index = getRandomMove(board, true);
      break;
    case 2:
      index = getWinningMove(board, player, emptyIndices);
      if (index === -1) index = getRandomMove(board, true);
      break;
    case 3:
      if (emptyIndices.length === 27 || emptyIndices.length === 26) {
        index = getRandomMove(board, true);
        break;
      }
      const aiWinningMove = getWinningMove(board, player, emptyIndices);
      if (aiWinningMove !== -1) {
        index = aiWinningMove;
        break;
      }
      
      const opponentWinningMove = getWinningMove(
        board,
        player === Player.O ? Player.X : Player.O,
        emptyIndices,
      );
      if (opponentWinningMove !== -1) {
        index = opponentWinningMove;
        break;
      }
      const depth = difficulty === DifficultyEnum.hard ? 4 : 6;
      const minimaxMove = performMinimax(board, Math.min(emptyIndices.length, depth), player);
      index = minimaxMove[0];
      // console.log(minimaxMove[1]);
      break;
    default:
      throw new Error('Invalid strength');
  }

  if (!emptyIndices.includes(index)) throw new Error('Invalid index');
  return index;
}

function getEmptyIndices(board: GameStateType): number[] {
  return board.flatMap((value, i) => (value === null ? i : []));
}

function getWinningMove(
  board: GameStateType,
  player: Player,
  emptyIndices: number[],
): number {
  return (
    emptyIndices.find(
      (index) => {
        return checkWinMove(board, index, player)
      }
    ) ?? -1
  );
}

const getAllWinningMoves = (board: GameStateType, player: Player) => {
  const emptyIndices = getEmptyIndices(board);
  return emptyIndices.filter((index) => checkWinMove(board, index, player));
}

function evaluateGameState(possibleWinner: Player | null, depth: number): number {

  if (possibleWinner === Player.O) {
    // console.log("evaluateGameState: O wins");
    return depth+1;
  }
  if (possibleWinner === Player.X) {
    // console.log("evaluateGameState: X wins");
    return -depth-1;
  }
  return 0;
}

const performMinimax = (
  state: GameStateType,
  depth: number,
  player: Player,
): [number, number] => {
  // best is an array [index, score]
  let best: [number, number];

  if (player === Player.O) {
      best = [-1, -Infinity];
  } else {
      best = [-1, Infinity];
  }
  
 
  const {winner: possibleWinner} = calculateWinner(state);
  if (depth <= 0 || possibleWinner) {
      const score = evaluateGameState(possibleWinner, depth);
      if (score === 1) {
        // console.log("performMinimax: O wins");
      }
        
      return [-1, score];
  }
  const allWinningMovesMe =  getAllWinningMoves(state, player)
  const allWinningMovesOpponent =  getAllWinningMoves(state, player === Player.X ? Player.O : Player.X)
  const emptyIndices = allWinningMovesMe.length > 0 
    ? allWinningMovesMe 
    : allWinningMovesOpponent.length > 0
      ? allWinningMovesOpponent
      : getEmptyIndices(state);
  
  emptyIndices.forEach((index) => {
    const newBoard = [...state];
    newBoard[index] = player;
    const score = performMinimax(
      newBoard,
      depth - 1,
      player === Player.O ? Player.X : Player.O,
    );

    score[0] = index;

    if (player === Player.O) {
      if (score[1] > best[1]) {
        best = score;
      }
    } else {
      if (score[1] < best[1]) {
        best = score;
      }
    }
  });

  return best;
}


const checkWinMove = (board: GameStateType, move: number, player: Player) => {
  const newBoard = [...board];
  newBoard[move] = player; 
  const {winner} = calculateWinner(newBoard);
  return winner === player ? move : null;
};
