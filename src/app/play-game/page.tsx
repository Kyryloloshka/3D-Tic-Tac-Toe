"use client"
import React, { useEffect, useState } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { calculateWinner, getBotMove } from '@/lib/utils';
import { ToastAction } from '@radix-ui/react-toast';

const PlayGame = () => {
  const [gameState, setGameState] = useState(Array(27).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isXNext, setIsXNext] = useState(true)
  const { toast } = useToast();
  const winner = calculateWinner(gameState);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;
  useEffect(() => {
    if (winner) {
      toast({
        title: "Game Over",
        description: `${status}`,
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#75ebbc]' onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} altText='Restart game'>Restart</ToastAction>
      })
    }
  }, [winner])
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className="md:flex h-full flex-auto">
        <LeftNavBar isPlayWithBot={false} setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} setIsXNext={setIsXNext} winner={winner} isXNext={isXNext} gameState={gameState} setGameState={setGameState}/>
        <TicTacToeGame isXNext={isXNext} gameState={gameState} hoveredIndex={hoveredIndex}/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame