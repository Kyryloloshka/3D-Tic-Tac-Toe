"use client"
import React, { useState } from 'react'

const Board2D = ({gameState, boardOrder, setGameState, isXNext, setIsXNext} : {gameState: string[], boardOrder: number, setGameState: Function, isXNext: boolean, setIsXNext: Function}) => {
  const handleClick = (index: number) => {
    if (gameState[boardOrder * 9 + index]) {
      return; 
    }

    const newBoard = [...gameState];
    newBoard[boardOrder * 9 + index] = isXNext ? 'X' : 'O';
    console.log(boardOrder * 9 + index);
    
    setGameState(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => (
    <button className='w-[54px] h-[54px] flex justify-center items-center' onClick={() => handleClick(index)}>
      <span className='text-primary-500 text-3xl font-semibold text-shadow-neon select-none'>
        {gameState[boardOrder * 9 + index]}
      </span>
    </button>
  );

  return (
    <div className="relative h-[240px] w-[240px]">
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[80px]"></div>  
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[160px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[80px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[160px]"></div>
      <div className="absolute top-[12px] left-[12px] flex flex-col gap-[28px]">
        <div className="flex gap-[28px]">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex gap-[28px]">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex gap-[28px]">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

export default Board2D