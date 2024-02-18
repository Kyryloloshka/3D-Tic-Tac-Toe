"use client"
import Header from '@/components/Header';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { calculateWinner } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [gameState, setGameState] = useState(Array(27).fill(null));
  const [isXNext, setIsXNext] = useState(true)
  const { toast } = useToast();
  const winner = calculateWinner(gameState);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;
  useEffect(() => {
    if (winner) {
      toast({
        title: "Game Over",
        description: `${status}`,
      })
    }
  }, [winner])
  return (
    <div className="overflow-hidden min-h-[100dvh] flex flex-col">
      <Header/>
      <div className="flex h-full flex-auto">
        <LeftNavBar setIsXNext={setIsXNext} winner={winner} isXNext={isXNext} gameState={gameState} setGameState={setGameState}/>
        <TicTacToeGame gameState={gameState}/>
      </div>
      <Toaster/>
    </div>
  )  
};
export default Home