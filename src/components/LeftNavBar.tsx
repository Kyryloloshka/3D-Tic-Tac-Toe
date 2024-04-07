"use client"
import Link from "next/link";
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import LoaderSpinner from "./LoaderSpinner";
import { Skeleton } from "./ui/skeleton";
import { setGameState, setIsXNext, setWinner } from "@/state/gameState/gameStateSlice";
import { Player } from "@/types";

const ComponentDialogSettings = dynamic(
  () => import('@/components/DialogSettings'),
  { ssr: false, loading: () => <LoaderSpinner /> }
);

const Component2DBoard = dynamic(
  () => import('@/components/Board2D'),
  { ssr: false, loading: () => <Skeleton className="aspect-square rounded-xl relative min-h-[140px] min-w-[140px] h-[20vw] max-h-[180px] max-w-[180px] w-[20vw]" /> }
);

const LeftNavBar = () => {
  const dispatch = useDispatch();
  const isXNext = useSelector((state: RootState) => state.isXNext);
  const winner = useSelector((state: RootState) => state.winner);
  const firstPlayer = useSelector((state: RootState) => state.firstPlayer);
  const restartGame = () => {
    dispatch(setGameState(Array(27).fill(null)));
    dispatch(setIsXNext(firstPlayer === Player.X));
    dispatch(setWinner(null))
  }

  const t = useTranslations("leftNavBar")
  return (
    <div className="bg-dark-3 pt-3 pb-6 flex flex-col gap-6">
      <div className="flex flex-col gap-x-3 relative gap-y-2 px-3 md:px-6 pt-2">
        <div className="flex gap-3 justify-between flex-wrap items-center">
          <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">{
            winner == null 
              ? `${t("turn")} - ${isXNext
                ? Player.X
                : Player.O}` 
              : `${t("winner")} - ${winner}`
          }</h3>
          <ComponentDialogSettings restartGame={restartGame}/>
        </div>
        <Button onClick={() => {
          restartGame()
        }} variant="neon">{t("restart")}</Button>
      </div>
      <div className="flex md:flex-col md:gap-6 gap-5 md:px-6 flex-wrap justify-center">
        {[
          t("topLayer"),
          t("middleLayer"),
          t("bottomLayer")
        ].map((layer, index) => (
          <div className="flex flex-col items-center gap-3" key={index}>
            <span className="text-shadow-neon text-primary-500 select-none">{layer}</span>
            <Component2DBoard boardOrder={index}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftNavBar