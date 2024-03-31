"use client"
import React, { useEffect } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import TicTacToeGame from '@/components/TicTacToeGame';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { calculateWinner, getBotMove } from '@/lib/utils';
import { ToastAction } from '@radix-ui/react-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setGameWithBotState, setIsXNextWithBot, setWinnerWithBot } from "@/state/gameState/gameStateSlice";
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Loading from '../../loading';

const ComponentPlayGame = dynamic(() => import('@/components/TicTacToeGame'), { ssr: false, loading: () => <Loading/>})

const PlayGameWithBot = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const gameWithBotState = useSelector((state: RootState) => state.gameWithBotState);
  const isXNextWithBot = useSelector((state: RootState) => state.isXNextWithBot);
  const winnerWithBot = useSelector((state: RootState) => state.winnerWithBot);
  const t = useTranslations("toast");
  useEffect(() => {
    if (!isXNextWithBot && !winnerWithBot) {
      const robotMove = getBotMove(gameWithBotState)
      const board = [...gameWithBotState];
      board[robotMove] = "O";
      dispatch(setGameWithBotState(board));
      dispatch(setIsXNextWithBot(true));
      const newWinner = calculateWinner(board);
      dispatch(setWinnerWithBot(newWinner));
    }
  }, [isXNextWithBot, winnerWithBot])
  const status = winnerWithBot ? `${t("winner")}: ${winnerWithBot == "O" ? t("bot") : winnerWithBot}` : `${t("nextPlayer")}: ${isXNextWithBot ? 'X' : t("bot")}`;
  useEffect(() => {
    if (winnerWithBot) {
      toast({
        title: t("gameOver"),
        description: `${status}`,
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]' onClick={() => {
          dispatch(setGameWithBotState(Array(27).fill(null)));
          dispatch(setIsXNextWithBot(true));
          dispatch(setWinnerWithBot(null));
        }} altText={t("restart")}>{t("restart")}</ToastAction>
      })
    }
  }, [winnerWithBot])
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className="flex flex-col md:flex-row h-full flex-auto">
        <LeftNavBar isPlayWithBot={true}/>
        <ComponentPlayGame isPlayWithBot={true}/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGameWithBot