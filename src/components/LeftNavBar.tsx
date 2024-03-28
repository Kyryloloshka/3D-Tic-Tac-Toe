import Link from "next/link";
import Board2D from "./Board2D"
import { Button } from "./ui/button"
interface LeftNavBarProps {
  gameState: string[];
  isPlayWithBot: boolean;
  setGameState: Function;
  isXNext: boolean;
  setIsXNext: Function;
  winner: string | null;
  setHoveredIndex: Function;
  hoveredIndex: number | null; 
}
const LeftNavBar = ({gameState, isPlayWithBot, setGameState, isXNext, setIsXNext, winner, setHoveredIndex, hoveredIndex} : LeftNavBarProps) => {
  const restartGame = () => {
    setGameState(Array(27).fill(null))
    setIsXNext(true)
  }
  return (
    <div className="bg-dark-3 py-3 pb-6 flex flex-col gap-6">
      <div className="flex gap-x-3 gap-y-2 flex-wrap px-6">
        <div className="flex gap-3 items-center justify-between flex-auto">
          {!isPlayWithBot && 
            <h3 className="no-wrap w-[88px] whitespace-nowrap uppercase text-light-2">{winner == null ? `Turn - ${isXNext ? ' X' : " O"}` : `winner - ${winner}`}</h3>
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
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500 select-none">top lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={0} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500 select-none">middle lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={1} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500 select-none">bottom lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={2} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
          </div>
        </div>
    </div>
  )
}

export default LeftNavBar