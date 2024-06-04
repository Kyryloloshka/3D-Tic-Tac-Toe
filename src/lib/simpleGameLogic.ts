import { Player } from "@/types";

export function calculateWinnerSimpleTicTacToe(board: (Player | null)[]) {
  // Winning lines (rows, columns, diagonals)
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;
  let lines: number[][] = [];
  // Check for each winning line
  for (const line of winningLines) {
    const [a, b, c] = line;
    const value = board[a];

    // Check if all values in the line are equal and not null
    if (value !== null && value === board[b] && value === board[c]) {
      winner = value;
      lines.push(line);  
    }
  }

  // No winner found
  return { winner: winner, lines: lines };
}

export function checkSubarrayExists(twoDimArray: number[][], subarray: number[]) {
  for (let i = 0; i < twoDimArray.length; i++) {
    const row = twoDimArray[i];
    let isSubarrayMatch = true;

    for (let j = 0; j < subarray.length; j++) {
      if (row[j] !== subarray[j]) {
        isSubarrayMatch = false;
        break; 
      }
    }

    if (isSubarrayMatch) {
      return true;
    }
  }

  return false; 
}