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
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]' onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} altText='Restart game'>Restart</ToastAction>
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

  const renderCross = () => (
    <div className='rotate-45'>
      <div className="absolute top-1/2 left-1/2 w-[40px] h-[6px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[6px] h-[40px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  )

  const renderCircle = () => (
    <div className="shadow-neon-secondary h-8 w-8 rounded-full border-secondary-500 border-[6px]">
    </div>
  )

  const renderSquare = (index: number) => (
    <button
      className='w-[33.33%] h-full flex justify-center items-center overflow-hidden relative'
      onClick={() => handleClick(index)}
      onPointerOver={() => handlePointerOver(index)}
      onPointerOut={handlePointerOut}
    >
      {hoveredIndex === boardOrder * 9 + index && gameState[boardOrder * 9 + index] == null ? (
        <div className='text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50'>
          {isXNext ? renderCross() : renderCircle()}
        </div>
      ) : <span className='text-primary-500 text-4xl font-semibold text-shadow-neon select-none'>
      {gameState[boardOrder * 9 + index] == 'X' ? renderCross() : gameState[boardOrder * 9 + index] == "O" ? renderCircle() : null}
    </span>}
      
    </button>
  );

  return (
    <div className="relative min-h-[140px] min-w-[140px] h-[20vw] max-h-[180px] max-w-[180px] w-[20vw]">
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[33.33%] -translate-y-[2px]"></div>  
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[66.66%] -translate-y-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[33.33%] -translate-x-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[66.66%] -translate-x-[2px]"></div>
      <div className="absolute flex flex-col h-[100%] w-full gap-[4px]">
        <div className="flex w-full h-[calc(33.33%-2px)] gap-[4px]">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex h-[calc(33.33%_-4px)] gap-[4px]">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex h-[calc(33.33%-4px)] gap-[4px]">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

export default Board2D