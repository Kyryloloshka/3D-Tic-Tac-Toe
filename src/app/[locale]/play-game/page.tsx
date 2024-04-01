"use client"
import React, { useEffect, useState } from 'react';
import LeftNavBar from '@/components/LeftNavBar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setGameSingleState, setIsXNextSingle, setWinnerSingle } from '@/state/gameState/gameStateSlice';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic'
import Loading from "../loading";

const ComponentPlayGame = dynamic(() => import('@/components/TicTacToeGame'), { ssr: false, loading: () => <Loading/>})

const PlayGame = () => {
  const [showRecomendation, setShowRecomendation] = useState(true)

  const { toast } = useToast();
  const t = useTranslations("toast");
  const dispatch = useDispatch();
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);
  const firstPlayer = useSelector((state: RootState) => state.firstPlayer);
  const status = winnerSingle ? `${t("winner")}: ${winnerSingle}` : `${t("nextPlayer")}: ${isXNextSingle ? 'X' : 'O'}`;
  
  useEffect(() => {
    if (winnerSingle) {
      toast({
        title: t("gameOver"),
        description: `${status}`,
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#75ebbc]' onClick={() => {
          dispatch(setGameSingleState(Array(27).fill(null)));
          dispatch(setIsXNextSingle(firstPlayer === "X"));
          dispatch(setWinnerSingle(null));
        }} altText='Restart game'>{t("restart")}</ToastAction>
      })
    }
  }, [winnerSingle])
  
  return (
    <div className="overflow-hidden flex-auto flex flex-col h-full">
      <div className={`${!showRecomendation && "hidden opacity-0"} bg-primary-500 text-center md:hidden md:opacity-0 select-none px-3 text-dark-2 flex gap-3 justify-center items-center`}>For better experience we recommend to open on the big screen <span onClick={() => setShowRecomendation(false)} className="cross"></span></div>
      <div className="flex flex-col md:flex-row h-full flex-auto">
        <LeftNavBar isPlayWithBot={false}/>
        <ComponentPlayGame/>
      </div>
      <Toaster/>
    </div>
  )  
}

export default PlayGame