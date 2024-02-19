import Board2D from "./Board2D"
import { Button } from "./ui/button"
interface LeftNavBarProps {
  gameState: string[];
  isPlayWithBot: boolean;
  setIsPlayWithBot: Function;
  setGameState: Function;
  isXNext: boolean;
  setIsXNext: Function;
  winner: string | null;
  setHoveredIndex: Function;
  hoveredIndex: number | null; 
}
const LeftNavBar = ({gameState, isPlayWithBot, setIsPlayWithBot, setGameState, isXNext, setIsXNext, winner, setHoveredIndex, hoveredIndex} : LeftNavBarProps) => {
  return (
    <div className="bg-dark-3 p-6 flex flex-col gap-6">
      <div className="flex gap-3 justify-between items-center flex-wrap">
        {!isPlayWithBot && <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">{winner == null ? `Next - ${isXNext ? ' X' : " O"}` : `winner - ${winner}`}</h3>}
        <Button onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} variant="neon">Restart</Button>
      </div>
      {isPlayWithBot 
        ? <Button onClick={() => {setIsPlayWithBot(false), setGameState(Array(27).fill(null))}} variant={"neon"}>Play on one device</Button> 
        : <Button onClick={() => {setIsPlayWithBot(true), setGameState(Array(27).fill(null))}} variant={"neon"}>Play with bot</Button>
      }
      <div className="flex md:flex-col gap-6 flex-wrap justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500">top lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={0} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500">middle lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={1} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-shadow-neon text-primary-500">bottom lay</span>
          <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={2} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
          </div>
        </div>
    </div>
  )
}

export default LeftNavBar