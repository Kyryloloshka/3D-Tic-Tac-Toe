import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const calculateWinner = (squares: string[]) => {
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
  ]
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

export const getRandomMove = (board: any[]) => {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}
export const getBotMove = (board: any[]) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const botWinMove = checkBotWin(board, i);
      if (botWinMove !== null) {
        return botWinMove;
      }
    }
  }

  const blockOpponentWinMove = checkBlockOpponentWin(board);
  if (blockOpponentWinMove !== null) {
    return blockOpponentWinMove;
  }

  return getRandomMove(board);
}

const checkBotWin = (board: any[], move: number) => {
  const newBoard = [...board];
  newBoard[move] = 'O'; // Припускаємо, що бот грає за 'O'
  const winner = calculateWinner(newBoard);
  return winner === 'O' ? move : null;
};

const checkBlockOpponentWin = (board: any[]) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'X'; // Припускаємо, що гравець грає за 'X'
      const winner = calculateWinner(newBoard);
      if (winner === 'X') {
        return i;
      }
    }
  }
  return null;
};