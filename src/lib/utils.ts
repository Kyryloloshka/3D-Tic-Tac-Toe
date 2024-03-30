import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const calculateWinner = (squares: Array<string | null>) => {
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
  const centerI = 13;
  const cornersI = [0, 2, 6, 8, 18, 20, 24, 26]
  const centersI = [4, 10, 12, 14, 16, 22]

  if (board[centerI] === null) {
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

export const getBotMove = (board: any[]) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const botWinMove = checkBotWin(board, i);
      if (botWinMove !== null) {
        // console.log("win after this move case");
        
        return botWinMove;
      }
    }
  }

  const blockOpponentWinMove = checkBlockOpponentWin(board);
  if (blockOpponentWinMove !== null) {
    
    return blockOpponentWinMove;
  }
  // console.log("random case");
  
  return getRandomMove(board);
}

const checkBotWin = (board: any[], move: number) => {
  const newBoard = [...board];
  newBoard[move] = 'O'; // Припускаємо, що бот грає за 'O'
  const winnerSingle = calculateWinner(newBoard);
  return winnerSingle === 'O' ? move : null;
};

const checkBlockOpponentWin = (board: any[]) => {
  let maxWinCaseIndex = -1;
  let maxWinCases = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'X'; // Припускаємо, що гравець грає за 'X'
      const winnerSingle = calculateWinner(newBoard);
      if (winnerSingle === 'X') {
        // console.log("prevent win oponent case");
        
        return i;
      }
      newBoard[i] = 'O'
      let winCases = 0
      let winCasesIndexesArray: number[] = []
      for (let j = 0; j < board.length; j++) {
        if (newBoard[j] == null) {
          if (checkBotWin(newBoard, j)) {
            winCases++
            winCasesIndexesArray.push(j)
          }
        }
      }
      if (winCases > maxWinCases) {
        maxWinCases = winCases
        maxWinCaseIndex = i;
        // console.log("Max ", maxWinCaseIndex, maxWinCases, newBoard);
      }
    }
  }
  // console.log(maxWinCaseIndex, maxWinCases);
  // maxWinCases >=1 ? console.log("calculate win after 1 move case") : null;
  
  return maxWinCases >=1 ? maxWinCaseIndex : null;
};