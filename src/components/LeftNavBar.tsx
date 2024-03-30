"use client"
import Link from "next/link";
import Board2D from "./Board2D"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setGameSingleState, setGameWithBotState, setIsXNextSingle, setIsXNextWithBot, setPlayer, setWinnerSingle, setWinnerWithBot } from "@/state/gameState/gameStateSlice"
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";


const LeftNavBar = ({isPlayWithBot}: {isPlayWithBot: boolean}) => {
  const dispatch = useDispatch();
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);
  const player = useSelector((state: RootState) => state.player);
  const [selectedPlayer, setSelectedPlayer] = useState(player);
  const [open, setOpen] = useState(false);
  const restartGame = () => {
    if (isPlayWithBot) {
      dispatch(setGameWithBotState(Array(27).fill(null)));
      dispatch(setIsXNextWithBot(true));
      dispatch(setWinnerWithBot(null))
    } else {
      dispatch(setGameSingleState(Array(27).fill(null)));
      dispatch(setIsXNextSingle(selectedPlayer === "X"));  
      dispatch(setWinnerSingle(null))
    }
  }


  const submitSettings = (e: any) => {
    e.preventDefault();
    restartGame();
    dispatch(setPlayer(selectedPlayer));
    setOpen(false)
  }

  const handlePlayerChange = (param: any) => {
    setSelectedPlayer(param)
  };

  const t = useTranslations("leftNavBar")
  return (
    <div className="bg-dark-3 pt-3 pb-6 flex flex-col gap-6">
      <div className="flex flex-col gap-x-3 relative gap-y-2 px-3 md:px-6 pt-2">
        <div className="flex gap-3 justify-between flex-wrap">
          {!isPlayWithBot && <>
            <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">{
              winnerSingle == null 
                ? `${t("turn")} - ${isXNextSingle 
                  ? ' X'
                  : " O"}` 
                : `${t("winner")} - ${winnerSingle}`
            }</h3>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img src="/assets/icons/settings.svg" alt="setting" className="h-6 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-dark-2 shadow-primary">
              <form onSubmit={submitSettings}>
                <DialogHeader>
                  <DialogTitle>Settings of game</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="playFor" className="text-right">
                      First move for
                    </Label>
                    <RadioGroup defaultValue={selectedPlayer} onValueChange={handlePlayerChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="X" id="r1" />
                        <Label htmlFor="r1">X</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="O" id="r2" />
                        <Label htmlFor="r2">O</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="neon" type="submit">Save and restart</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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