"use client"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import LoaderSpinner from "../ui/loader-spinner";
import { Skeleton } from "../ui/skeleton";
import { Player } from "@/types";
import { useActionCreators, useStateSelector } from "@/state/hooks";
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
  const movesHistory = useStateSelector((state) => state.game.historyMoves);
  const actions = useActionCreators(gameActions);

  const restartGame = () => {
    actions.restartGame();
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
    <div className="bg-dark-2 left-0 w-auto border-b-[2px] md:border-r-[2px] border-dark-3 md:pt-3 pb-2 md:pb-6 flex flex-col gap-3 md:gap-6">
      <div className="flex flex-col sm:flex-row md:flex-col gap-x-3 relative gap-y-2 px-3 md:px-6 pt-2">
        <div className="flex gap-3 flex-auto justify-between flex-wrap items-center">
          <h3 className="no-wrap select-none whitespace-nowrap uppercase text-sm text-light-2">{
            winner == null 
              ? `${t("turn")} - ${isXNext
                ? Player.X
                : Player.O}` 
              : `${t("winner")} - ${winner}`
          }</h3>
          <ComponentDialogSettings restartGame={restartGame}/>
        </div>
        <div className="flex gap-3 justify-start md:flex-col flex-wrap">
          <Button onClick={() => {
            restartGame()
          }} variant="neon" className="flex-grow-0 md:flex-grow-1 ">{t("restart")}</Button>
          {winner && 
            <Button className="sm:flex-auto" onClick={() => {
              saveMovesHistory()
            }} variant="neon">{t("save")}</Button>
          }
        </div>
      </div>
      <div className="flex md:flex-col md:gap-6 gap-3 h-full md:px-6 flex-wrap md:flex-nowrap justify-center md:justify-normal md:min-h-[calc(100vh-200px)]">
        {[
          t("topLayer"),
          t("middleLayer"),
          t("bottomLayer")
        ].map((layer, index) => (
          <div className="flex flex-col items-center md:gap-3" key={index}>
            <span className="text-center text-[12px] md:text-sm md:whitespace-nowrap text-shadow-neon text-primary-500 select-none">{layer}</span>
            <Component2DBoard boardOrder={index}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftNavBar