"use client"
import Link from "next/link";
import Board2D from "./Board2D"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setGameSingleState, setGameWithBotState, setIsXNextSingle, setIsXNextWithBot, setWinnerSingle, setWinnerWithBot } from "@/state/gameState/gameStateSlice"

const layers = [
  "top layer",
  "middle layer",
  "bottom layer"
]

const LeftNavBar = ({isPlayWithBot}: {isPlayWithBot: boolean}) => {
  const dispatch = useDispatch();
  const isXNextSingle = useSelector((state: RootState) => state.isXNextSingle);
  const winnerSingle = useSelector((state: RootState) => state.winnerSingle);
  
  const restartGame = () => {
    if (isPlayWithBot) {
      dispatch(setGameWithBotState(Array(27).fill(null)));
      dispatch(setIsXNextWithBot(true));
      dispatch(setWinnerWithBot(null))
    } else {
      dispatch(setGameSingleState(Array(27).fill(null)));
      dispatch(setIsXNextSingle(true));  
      dispatch(setWinnerSingle(null))
    }
  }
  
  return (
    <div className="bg-dark-3 py-3 pb-6 flex flex-col gap-6">
      <div className="flex gap-x-3 gap-y-2 flex-wrap px-6">
        <div className="flex gap-3 items-center justify-between flex-auto">
          {!isPlayWithBot && 
            <h3 className="no-wrap w-[88px] whitespace-nowrap uppercase text-light-2">{
              winnerSingle == null 
                ? `Turn - ${isXNextSingle 
                  ? ' X'
                  : " O"}` 
                : `winner - ${winnerSingle}`
            }</h3>
          }
          
          <Button onClick={() => {
            restartGame()
          }} variant="neon">Restart</Button>
        </div>
        {isPlayWithBot 
          ? <Button variant={"neon"}>
              <Link href="/play-game/">Play on one device</Link>
            </Button> 
          : <Button variant="neon">
            <Link href="/play-game/with-bot">Play with bot</Link>
          </Button>
        }
      </div>
      <div className="flex md:flex-col md:gap-6 gap-5 md:px-6 flex-wrap justify-center">
        {layers.map((layer, index) => (
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