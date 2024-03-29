"use client"
import React, { useEffect } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setGameSingleState, setIsXNextSingle, setWinnerSingle } from '@/state/gameState/gameStateSlice';

const PlayGame = () => {
  const { toast } = useToast();

  const dispatch = useDispatch();
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);

  const status = winnerSingle ? `Winner: ${winnerSingle}` : `Next player: ${isXNextSingle ? 'X' : 'O'}`;
  useEffect(() => {
    if (winnerSingle) {
      toast({
        title: "Game Over",
        description: `${status}`,
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#75ebbc]' onClick={() => {
          dispatch(setGameSingleState(Array(27).fill(null)));
          dispatch(setIsXNextSingle(true));
          dispatch(setWinnerSingle(null));
        }} altText='Restart game'>Restart</ToastAction>
      })
    }
  }, [winnerSingle])
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className="md:flex h-full flex-auto">
        <LeftNavBar isPlayWithBot={false}/>
        <TicTacToeGame />
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame