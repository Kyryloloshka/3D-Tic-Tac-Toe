"use client"
import React, { useState } from 'react'
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { ToastAction } from '@radix-ui/react-toast';

interface Board2DProps {
  gameState: string[];
  boardOrder: number;
  setGameState: Function;
  isXNext: boolean;
  setIsXNext: Function;
  winner: string | null;
  setHoveredIndex: Function;
  hoveredIndex: number | null; 
}

const Board2D = ({
    gameState,
    boardOrder,
    setGameState, 
    isXNext, 
    setIsXNext, 
    winner, 
    setHoveredIndex, 
    hoveredIndex
  } : Board2DProps) => {
  const {toast} = useToast()
  
  const handleClick = (index: number) => {
    if (winner) {
      toast({
        title: "Game Already Overed",
        description: "You can not make moves anymore",
        action: <Button variant="neon"><ToastAction onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} altText='Restart game'>Restart</ToastAction></Button>
      })
      return;
    };
    if (gameState[boardOrder * 9 + index]) {
      return; 
    }

    const newBoard = [...gameState];
    newBoard[boardOrder * 9 + index] = isXNext ? 'X' : 'O';
    
    setGameState(newBoard);
    setIsXNext(!isXNext);
  };

  const handlePointerOver = (index: number) => {
    setHoveredIndex(boardOrder * 9 + index);
  };

  const handlePointerOut = () => {
    setHoveredIndex(null);
  };

  const renderSquare = (index: number) => (
    <button
      className='w-[33.33%] h-full flex justify-center items-center overflow-hidden relative'
      onClick={() => handleClick(index)}
      onPointerOver={() => handlePointerOver(index)}
      onPointerOut={handlePointerOut}
    >
      {hoveredIndex === boardOrder * 9 + index && gameState[boardOrder * 9 + index] == null ? (
        <span className='text-primary-500 text-3xl font-semibold text-shadow-neon select-none opacity-50'>
          {isXNext ? 'X' : 'O'}
        </span>
      ) : <span className='text-primary-500 text-3xl font-semibold text-shadow-neon select-none'>
      {gameState[boardOrder * 9 + index]}
    </span>}
      
    </button>
  );

  return (
    <div className="relative min-h-[120px] min-w-[120px] h-[20vw] max-h-[220px] max-w-[220px] w-[20vw]">
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[33.33%] -translate-y-[2px]"></div>  
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[66.66%] -translate-y-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[33.33%] -translate-x-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[66.66%] -translate-x-[2px]"></div>
      <div className="absolute flex flex-col h-[100%] w-full gap-[4px]">
        <div className="flex w-full h-[33.33%] gap-[4px]">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex h-[33.33%] gap-[4px]">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex h-[33.33%] gap-[4px]">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

export default Board2D