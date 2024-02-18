import Board2D from "./Board2D"

const LeftNavBar = ({gameState, setGameState, isXNext, setIsXNext, winner} : {gameState: string[], setGameState: Function, isXNext: boolean, setIsXNext: Function, winner: string | null }) => {
  return (
    <div className="bg-dark-3 p-6 flex flex-col gap-6">
      <h3 className="no-wrap whitespace-nowrap uppercase text-light-2">control panel</h3>
      <Board2D winner={winner} boardOrder={0} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
      <Board2D winner={winner} boardOrder={1} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
      <Board2D winner={winner} boardOrder={2} gameState={gameState} setGameState={setGameState} setIsXNext={setIsXNext} isXNext={isXNext}/>
    </div>
  )
}

export default LeftNavBar