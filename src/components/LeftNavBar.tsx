"use client"
import Link from "next/link";
import Board2D from "./Board2D"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setGameSingleState, setGameWithBotState, setIsXNextSingle, setIsXNextWithBot, setWinnerSingle, setWinnerWithBot } from "@/state/gameState/gameStateSlice"
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Loading from "@/app/[locale]/loading";
import LoaderSpinner from "./LoaderSpinner";

const ComponentDialogSettings = dynamic(
  () => import('@/components/DialogSettings'),
  { ssr: false, loading: () => <LoaderSpinner /> }
);

const LeftNavBar = ({isPlayWithBot}: {isPlayWithBot: boolean}) => {
  const dispatch = useDispatch();
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);

  const restartGame = (selectedFirstPlayer?: "X" | "O") => {
    if (isPlayWithBot) {
      dispatch(setGameWithBotState(Array(27).fill(null)));
      dispatch(setIsXNextWithBot(true));
      dispatch(setWinnerWithBot(null))
    } else {
      dispatch(setGameSingleState(Array(27).fill(null)));
      dispatch(setIsXNextSingle(selectedFirstPlayer === "X"));  
      dispatch(setWinnerSingle(null))
    }
  }

  const t = useTranslations("leftNavBar")
  return (
    <div className="bg-dark-3 pt-3 pb-6 flex flex-col gap-6">
      <div className="flex flex-col gap-x-3 relative gap-y-2 px-3 md:px-6 pt-2">
        <div className="flex gap-3 justify-between flex-wrap items-center">
          {!isPlayWithBot && <>
            <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">{
              winnerSingle == null 
                ? `${t("turn")} - ${isXNextSingle 
                  ? ' X'
                  : " O"}` 
                : `${t("winner")} - ${winnerSingle}`
            }</h3>
            <ComponentDialogSettings restartGame={restartGame}/>
          </>
        }
        </div>
        <Button onClick={() => {
          restartGame()
        }} variant="neon">{t("restart")}</Button>
        {isPlayWithBot 
          ? <Button variant={"neon"}>
              <Link href="/play-game/">{t("onOneDevice")}</Link>
            </Button> 
          : <Button variant="neon">
            <Link href="/play-game/with-bot">{t("withBot")}</Link>
          </Button>
        }
      </div>
      <div className="flex md:flex-col md:gap-6 gap-5 md:px-6 flex-wrap justify-center">
        {[
          t("topLayer"),
          t("middleLayer"),
          t("bottomLayer")
        ].map((layer, index) => (
          <div className="flex flex-col items-center gap-3" key={index}>
            <span className="text-shadow-neon text-primary-500 select-none">{layer}</span>
            <Board2D boardOrder={index} isPlayWithBot={isPlayWithBot}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftNavBar