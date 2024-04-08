"use client"
import React, { useEffect, useState } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic'
import Loading from "../loading";
import { calculateWinner, getBotMove } from '@/lib/gameLogic';
import { setGameState, setIsXNext, setWinner } from '@/state/gameState/gameStateSlice';
import { Player } from '@/types';

const ComponentPlayGame = dynamic(() => import('@/components/TicTacToeGame'), { ssr: false, loading: () => <Loading/>})

const PlayGame = () => {
  const [showRecomendation, setShowRecomendation] = useState(true)
  const { toast } = useToast();
  const t = useTranslations("toast");
  const dispatch = useDispatch();
  const isXNext = useSelector((state: RootState) => state.isXNext);
  const winner = useSelector((state: RootState) => state.winner);
  const firstPlayer = useSelector((state: RootState) => state.firstPlayer);
  const isCenterAvailable = useSelector((state: RootState) => state.isCenterAvailable);
  const isPlayWithBot = useSelector((state: RootState) => state.isPlayWithBot);
  const gameState = useSelector((state: RootState) => state.gameState);
  const botPlayer = useSelector((state: RootState) => state.botPlayer);

  const status = winner ? `${t("winner")}: ${winner}` : `${t("nextPlayer")}: ${isXNext ? 'X' : 'O'}`;
  
  useEffect(() => {
    if (winner) {
      toast({
        title: t("gameOver"),
        description: `${status}`,
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#75ebbc]' onClick={() => {
          dispatch(setGameState(Array(27).fill(null)));
          dispatch(setIsXNext(firstPlayer === Player.X));
          dispatch(setWinner(null));
        }} altText='Restart game'>{t("restart")}</ToastAction>
      })
    }
  }, [winner])

  useEffect(() => {
    const makeBotMove = async () => {
      if (isPlayWithBot && isXNext === (botPlayer === Player.X) && !winner) {
        await getBotMove(gameState, botPlayer, isCenterAvailable).then((robotMove) => {
        const board = [...gameState];
        board[robotMove as number] = botPlayer;
        dispatch(setGameState(board));
        dispatch(setIsXNext(botPlayer !== Player.X));
        const newWinner = calculateWinner(board);
        dispatch(setWinner(newWinner));
      })
    }}
  
    makeBotMove();
  }, [gameState, winner, botPlayer, isXNext, isPlayWithBot, isCenterAvailable])
  
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className={`${!showRecomendation && "hidden opacity-0"} bg-primary-500 text-center md:hidden md:opacity-0 select-none px-3 text-dark-2 flex gap-3 justify-center items-center`}>For better experience we recommend to open on the big screen <span onClick={() => setShowRecomendation(false)} className="cross"></span></div>
      <div className="flex flex-col md:flex-row h-full flex-auto">
        <LeftNavBar/>
        <ComponentPlayGame/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame