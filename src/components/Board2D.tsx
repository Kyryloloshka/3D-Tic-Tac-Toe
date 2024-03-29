"use client"
import React from 'react'
import { useToast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setGameSingleState, setGameWithBotState, setHoveredIndex, setIsXNextSingle, setIsXNextWithBot, setWinnerSingle, setWinnerWithBot } from "@/state/gameState/gameStateSlice";
import { calculateWinner } from '@/lib/utils';

interface Board2DProps {
  boardOrder: number;
  isPlayWithBot: boolean;
}

const Board2D = ({
    boardOrder,
    isPlayWithBot
  } : Board2DProps) => {
  const {toast} = useToast()
  const dispatch = useDispatch();
  const gameSingleState = useSelector((state: RootState) => state.gameSingleState);
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);
  const hoveredIndex = useSelector((state: RootState) => state.hoveredIndex);
  const winnerWithBot = useSelector((state: RootState) => state.winnerWithBot);
  const gameWithBotState = useSelector((state: RootState) => state.gameWithBotState);
  const isXNextWithBot = useSelector((state: RootState) => state.isXNextWithBot);

  const handleClick = (index: number) => {
    if (isPlayWithBot) {
      if (winnerWithBot) {
        toast({
          title: "Game Already Overed",
          description: "You can not make moves anymore",
          action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]' onClick={() => {
            dispatch(setGameWithBotState(Array(27).fill(null)));
            dispatch(setIsXNextWithBot(true));
            dispatch(setWinnerWithBot(null));
        }} altText='Restart game'>Restart</ToastAction>
        })
        return;
      };
      if (gameWithBotState[boardOrder * 9 + index]) {
        return; 
      }
  
      const newBoard = [...gameWithBotState];
      newBoard[boardOrder * 9 + index] = isXNextWithBot ? 'X' : 'O';
      
      dispatch(setGameWithBotState(newBoard));
      dispatch(setIsXNextWithBot(!isXNextWithBot));
  
      const newWinner = calculateWinner(newBoard);
      dispatch(setWinnerWithBot(newWinner));
    } else {
      if (winnerSingle) {
        toast({
          title: "Game Already Overed",
          description: "You can not make moves anymore",
          action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]' onClick={() => {
            dispatch(setGameSingleState(Array(27).fill(null)));
            dispatch(setIsXNextSingle(true));
            dispatch(setWinnerSingle(null));
        }} altText='Restart game'>Restart</ToastAction>
        })
        return;
      };
      if (gameSingleState[boardOrder * 9 + index]) {
        return; 
      }

      const newBoard = [...gameSingleState];
      newBoard[boardOrder * 9 + index] = isXNextSingle ? 'X' : 'O';
      
      dispatch(setGameSingleState(newBoard));
      dispatch(setIsXNextSingle(!isXNextSingle));

      const newWinner = calculateWinner(newBoard);
      dispatch(setWinnerSingle(newWinner));
    }
  };

  const handlePointerOver = (index: number) => {
    dispatch(setHoveredIndex(boardOrder * 9 + index));
  };

  const handlePointerOut = () => {
    dispatch(setHoveredIndex(null));
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
      {isPlayWithBot ? hoveredIndex === boardOrder * 9 + index 
        && gameWithBotState[boardOrder * 9 + index] == null ? (
        <div className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50'>
          {isXNextWithBot ? renderCross() : renderCircle()}
        </div>
      ) : <span className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none'>
      {gameWithBotState[boardOrder * 9 + index] == 'X' ? renderCross() : gameWithBotState[boardOrder * 9 + index] == "O" ? renderCircle() : null}
    </span> :
      hoveredIndex === boardOrder * 9 + index 
        && gameSingleState[boardOrder * 9 + index] == null ? (
        <div className=' pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50'>
          {isXNextSingle ? renderCross() : renderCircle()}
        </div>
      ) : <span className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none'>
      {gameSingleState[boardOrder * 9 + index] == 'X' ? renderCross() : gameSingleState[boardOrder * 9 + index] == "O" ? renderCircle() : null}
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