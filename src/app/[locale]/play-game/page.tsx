"use client"
import React, { useEffect, useState } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useSelector } from 'react-redux';
import { RootState } from "@/state/types";
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic'
import Loading from "../loading";
import { calculateWinner, getBotMove } from '@/lib/gameLogic';
import { Player } from '@/types';
import { gameActions } from '@/state/slices/game';
import { useActionCreators, useStateSelector } from '@/state/hooks';
import { fetchBotMove } from '@/lib/api';

const ComponentPlayGame = dynamic(() => import('@/components/Model3d'), { ssr: false, loading: () => <Loading />})

const PlayGame = () => {
  const [isShowRecomendation, setIsShowRecomendation] = useState(true)
  const { toast } = useToast();
  const t = useTranslations("toast");
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const winner = useSelector((state: RootState) => state.game.winner);
  const isCenterAvailable = useSelector((state: RootState) => state.game.isCenterAvailable);
  const isPlayWithBot = useSelector((state: RootState) => state.game.isPlayWithBot);
  const gameState = useSelector((state: RootState) => state.game.gameState);
  const botPlayer = useSelector((state: RootState) => state.game.botPlayer);
  const actions = useActionCreators(gameActions);
  const difficulty = useSelector((state: RootState) => state.game.botDifficulty);
  const status = winner ? `${t("winner")}: ${winner}` : `${t("nextPlayer")}: ${isXNext ? 'X' : 'O'}`;
  
  useEffect(() => {
    if (winner) {
      toast({
        title: t("gameOver"),
        description: `${status}`,
        action: <ToastAction 
          className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#75ebbc]' 
          onClick={
            actions.restartGame
          } 
          altText='Restart game'
        >{t("restart")}</ToastAction>
      })
    }
  }, [winner])

  const makeBotMove = async () => {
    if (isPlayWithBot && isXNext === (botPlayer === Player.X) && !winner) {
      try {
        const robotMove = await fetchBotMove(
          gameState,
          botPlayer,
          difficulty
        );
        console.log('robotMove:', robotMove);
        if (robotMove !== -1) {
          const board = [...gameState];
          board[robotMove as number] = botPlayer;
          actions.setGameState(board);
          actions.setIsXNext(botPlayer !== Player.X);
          actions.addToHistory(board);
          const newWinner = calculateWinner(board);
          if (newWinner) actions.setWinner(newWinner);
        }
      } catch (error) {
        console.error('Error making bot move:', error);
      }
    }
  }

  useEffect(() => {
    makeBotMove();
  }, [gameState, winner, botPlayer, isXNext, isPlayWithBot, isCenterAvailable])
  
  return (
    <div className={`overflow-hidden flex-auto flex flex-col h-full`}>
      <div className={`${!isShowRecomendation && "hidden opacity-0"} bg-primary-500 text-center md:hidden md:opacity-0 select-none px-3 text-dark-2 flex gap-3 justify-center items-center`}>{t("experience")} <span onClick={() => setIsShowRecomendation(false)} className="cross"></span></div>
      <div className="flex flex-col md:flex-row h-full flex-auto">
        <LeftNavBar/>
        <ComponentPlayGame/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame