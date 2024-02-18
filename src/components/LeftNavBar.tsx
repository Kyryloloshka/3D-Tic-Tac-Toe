import Board2D from "./Board2D"
import { Button } from "./ui/button"
interface LeftNavBarProps {
  gameState: string[];
  setGameState: Function;
  isXNext: boolean;
  setIsXNext: Function;
  winner: string | null;
  setHoveredIndex: Function;
  hoveredIndex: number | null; 
}
const LeftNavBar = ({gameState, setGameState, isXNext, setIsXNext, winner, setHoveredIndex, hoveredIndex} : LeftNavBarProps) => {
  return (
    <div className="bg-dark-3 p-6 flex flex-col gap-6">
      <div className="flex gap-3 justify-between items-center">
        <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">{winner == null ? `Next - ${isXNext ? ' X' : " O"}` : `winner - ${winner}`}</h3>
        <Button onClick={() => {
          setGameState(Array(27).fill(null));
          setIsXNext(true);
        }} variant="neon">Restart</Button>
      </div>
      <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={0} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
      <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={1} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
      <Board2D setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} winner={winner} boardOrder={2} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
    </div>
  )
}

export default LeftNavBar