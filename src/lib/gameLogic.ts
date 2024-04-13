import { DifficultyEnum, GameStateType, Player } from "@/types";
import { randInt } from "./utils";
import { store } from "@/state";

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
        return squares[j * 9 + a];
      }
    }
  }

  for (let i = 0; i < diagonals.length; i++) {
    const [a, b, c] = diagonals[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b+9] && squares[a] === squares[c+18]) {
      return squares[a];
    } else
    if (squares[a+18] && squares[a+18] === squares[b+9] && squares[a+18] === squares[c]) {
      return squares[a+18];
    }
  }

  for (let i = 0; i < 9; i++) {
    if (squares[i] && squares[i] == squares[i+9] && squares[i] == squares[i+18] ) {
      return squares[i];
    }
  }

  return null;
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

export const getBotMove = async () => {
  const state = store.getState();
  const board = state.game.gameState;
  const player = state.game.botPlayer;
  const isCenterAvailable = state.game.isCenterAvailable;
  const difficulty = state.game.botDifficulty;

  return new Promise((resolve: (value: number) => void) => {
    const delayOfBotMove = 1000;

    setTimeout(() => {
      const randomMove = getRandomMove(board, isCenterAvailable);
      const botWins = checkWinPlayer(board, player, isCenterAvailable)
      if (botWins) {
        resolve(botWins);
        return;
      }
      if (difficulty === DifficultyEnum.easy) {
        resolve(randomMove);
        return;
      }
      const blockOpponentWinMove = checkWinPlayer(board, player === Player.X ? Player.O : Player.X, isCenterAvailable);
      if (blockOpponentWinMove) {
        resolve(blockOpponentWinMove);
        return;
      }
      if (difficulty === DifficultyEnum.medium) {
        resolve(randomMove);
        return;
      }
      const forkMove = checkFork(board, player, isCenterAvailable);
      if (forkMove) {
        resolve(forkMove);
        return;
      }
      if (difficulty === DifficultyEnum.hard) {
        resolve(randomMove);
        return;
      }
      const blockOpponentForkMove = checkFork(board, player === Player.X ? Player.O : Player.X, isCenterAvailable)
      if (blockOpponentForkMove) {
        resolve(blockOpponentForkMove);
        return;
      }
      if (difficulty === DifficultyEnum.expert) {
        resolve(randomMove);
        return;
      }
    }, delayOfBotMove); 
  });
}

const checkWinPlayer = (board: GameStateType, player: Player, isCenterAvailable: boolean) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null && (isCenterAvailable || i != 13)) {
      const botWinMove = checkWinMove(board, i, player);
      if (botWinMove) {
        return botWinMove;
      }
    }
  }
}

const checkWinMove = (board: GameStateType, move: number, player: Player) => {
  const newBoard = [...board];
  newBoard[move] = player; 
  const winner = calculateWinner(newBoard);
  return winner === player ? move : null;
};

const checkFork = (board: GameStateType, player: Player, isCenterAvailable: boolean) => {
  const forkMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null && (isCenterAvailable || i != 13)) {
      const newBoard = [...board];
      newBoard[i] = player;
      let winCases = 0
      for (let j = 0; j < newBoard.length; j++) {
        if (newBoard[j] == null && (isCenterAvailable || j != 13)) {
          if (checkWinMove(newBoard, j, player)) {
            winCases++
          }
        }
      }
      if (winCases >= 2) {
        forkMoves.push(i);
      }
    }
  }
  // console.log(forkMoves);

  return forkMoves.length >=1 ? forkMoves[randInt(0, forkMoves.length-1)] : null;
}