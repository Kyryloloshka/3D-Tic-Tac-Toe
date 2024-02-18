"use client"
import Header from '@/components/Header';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import React, { useEffect, useState } from 'react';

const calculateWinner = (squares: string[]) => {
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

const Home: React.FC = () => {
  const [gameState, setGameState] = useState(Array(27).fill(null));
  const [isXNext, setIsXNext] = useState(true)
  const winner = calculateWinner(gameState);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;
  return (
    <div className="overflow-hidden min-h-[100dvh] flex flex-col">
      <Header/>
      <div className="flex h-full flex-auto">
        <LeftNavBar setIsXNext={setIsXNext} isXNext={isXNext} gameState={gameState} setGameState={setGameState}/>
        <TicTacToeGame gameState={gameState}/>
      </div>
    </div>
  )  
};
export default Home