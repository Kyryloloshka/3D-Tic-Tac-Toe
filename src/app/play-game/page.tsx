"use client"
import React, { useEffect, useState } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { calculateWinner, getBotMove } from '@/lib/utils';
import { ToastAction } from '@radix-ui/react-toast';

const PlayGame = () => {
  const [gameState, setGameState] = useState(Array(27).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlayWithBot, setIsPlayWithBot] = useState<boolean>(false);
  const [isXNext, setIsXNext] = useState(true)
  const { toast } = useToast();
  const winner = calculateWinner(gameState);
  useEffect(() => {
    if (!isXNext && !winner && isPlayWithBot) {
      const robotMove = getBotMove(gameState)
      const board = gameState;
      board[robotMove] = "O";
      setGameState(board);
      setIsXNext(true);
    }
  }, [isXNext])
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;
  useEffect(() => {
    if (winner) {
      toast({
        title: "Game Over",
        description: `${status}`,
        action: <Button variant="neon"><ToastAction onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} altText='Restart game'>Restart</ToastAction></Button>
      })
    }
  }, [winner])
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className="md:flex h-full flex-auto">
        <LeftNavBar isPlayWithBot={isPlayWithBot} setIsPlayWithBot={setIsPlayWithBot} setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} setIsXNext={setIsXNext} winner={winner} isXNext={isXNext} gameState={gameState} setGameState={setGameState}/>
        <TicTacToeGame gameState={gameState} hoveredIndex={hoveredIndex}/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame