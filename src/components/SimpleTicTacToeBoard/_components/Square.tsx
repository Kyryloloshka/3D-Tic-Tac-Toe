"use client";
import { calculateWinner } from "@/lib/gameLogic";
import { Player } from "@/types";
import { useActionCreators, useStateSelector } from "@/state/hooks";
import Cross from "./Cross";
import Circle from "./Circle";
import { simpleGameActions } from "@/state";

const Square = ({ index }: { index: number }) => {
  const gameState = useStateSelector((state) => state.simpleGame.gameState);
  const isXNext = useStateSelector((state) => state.simpleGame.isXNext);
  const winner = useStateSelector((state) => state.simpleGame.winner);

  const actions = useActionCreators(simpleGameActions);
  const handleClick = (index: number) => {
    if (winner) {
      return;
    }

    const newBoard = [...gameState];
    const player = isXNext ? Player.X : Player.O;
    newBoard[index] = player;
    actions.setGameState(newBoard);
    actions.setIsXNext(!isXNext);

    const { winner: newWinner } = calculateWinner(newBoard);
    if (newWinner) actions.setWinner(newWinner);
  };

  return (
    <>
      <button
        className="w-[33.33%] h-full flex justify-center items-center overflow-hidden relative"
        onClick={() => handleClick(index)}
        aria-label="make move"
      >
        <span className="pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none">
          {gameState[index] == "X"
            ? Cross()
            : gameState[index] == "O"
            ? Circle()
            : null}
        </span>
      </button>
    </>
  );
};

export default Square;
