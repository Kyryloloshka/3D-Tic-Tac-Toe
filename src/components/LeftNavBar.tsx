"use client"
import Link from "next/link";
import { Button } from "./ui/button"
import { useSelector } from "react-redux";
import { RootState } from "@/state/types";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import LoaderSpinner from "./ui/loader-spinner";
import { Skeleton } from "./ui/skeleton";
import { HistoryStep, Player } from "@/types";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/state/hooks";
import { gameActions } from "@/state/slices/game";

const ComponentDialogSettings = dynamic(
  () => import('@/components/DialogSettings'),
  { ssr: false, loading: () => <LoaderSpinner /> }
);

const Component2DBoard = dynamic(
  () => import('@/components/Board2D'),
  { ssr: false, loading: () => <Skeleton className="aspect-square rounded-xl relative min-h-[140px] min-w-[140px] h-[20vw] max-h-[180px] max-w-[180px] w-[20vw]" /> }
);

const LeftNavBar = () => {
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const winner = useStateSelector((state) => state.game.winner);
  const firstPlayer = useStateSelector((state) => state.game.firstPlayer);
  const movesHistory = useStateSelector((state) => state.game.historyMoves);
  const actions = useActionCreators(gameActions);

  const restartGame = () => {
    actions.setGameState(Array(27).fill(null));
    actions.setIsXNext(firstPlayer === Player.X);
    actions.setWinner(null)
    actions.clearHistory();
  }

  const saveMovesHistory = () => {
    const json = JSON.stringify(movesHistory);
    
    const blob = new Blob([json], { type: "application/json" });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "moves-history.json"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const t = useTranslations("leftNavBar")
  return (
    <div className="bg-dark-3 pt-3 pb-6 flex flex-col gap-6">
      <div className="flex flex-col gap-x-3 relative gap-y-2 px-3 md:px-6 pt-2">
        <div className="flex gap-3 justify-between flex-wrap items-center">
          <h3 className="no-wrap select-none whitespace-nowrap uppercase text-sm text-light-2">{
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
        {winner && 
          <Button onClick={() => {
            saveMovesHistory()
          }} variant="neon">Save</Button>
        }
      </div>
      <div className="flex md:flex-col md:gap-6 gap-5 md:px-6 flex-wrap justify-center">
        {[
          t("topLayer"),
          t("middleLayer"),
          t("bottomLayer")
        ].map((layer, index) => (
          <div className="flex flex-col items-center gap-3" key={index}>
            <span className="text-center text-sm text-shadow-neon text-primary-500 select-none">{layer}</span>
            <Component2DBoard boardOrder={index}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftNavBar