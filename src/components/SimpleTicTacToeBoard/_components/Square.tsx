"use client";
import { calculateWinner } from "@/lib/gameLogic";
import { Player } from "@/types";
import { useActionCreators, useStateSelector } from "@/state/hooks";
import Cross from "./Cross";
import Circle from "./Circle";
import { simpleGameActions } from "@/state";
import { useState } from "react";
import { calculateWinnerSimpleTicTacToe } from "@/lib/simpleGameLogic";

const Square = ({ index }: { index: number }) => {
  const gameState = useStateSelector((state) => state.simpleGame.gameState);
  const isXNext = useStateSelector((state) => state.simpleGame.isXNext);
  const winner = useStateSelector((state) => state.simpleGame.winner);
  const [isHovered, setIsHovered] = useState(false);
  const actions = useActionCreators(simpleGameActions);
  const handleClick = (index: number) => {
    if (winner) {
      return;
    }
    if (gameState[index]) {
      return;
    }
    const newBoard = [...gameState];
    const player = isXNext ? Player.X : Player.O;
    newBoard[index] = player;
    actions.setGameState(newBoard);
    actions.setIsXNext(!isXNext);

    const { winner: newWinner } = calculateWinnerSimpleTicTacToe(newBoard);
    if (newWinner) actions.setWinner(newWinner);
    else if (!newBoard.includes(null)) actions.setWinner("tie");
  };

  return (
    <>
      <button
        className="w-[33.33%] h-full flex justify-center items-center overflow-hidden relative"
        onClick={() => handleClick(index)}
        aria-label="make move"
        onMouseOver={() => (winner ? null : setIsHovered(true))}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none">
          {gameState[index] == Player.X ? (
            <Cross />
          ) : gameState[index] == Player.O ? (
            <Circle />
          ) : isHovered && isXNext ? (
            <Cross isHovered={isHovered} />
          ) : isHovered && !isXNext ? (
            <Circle isHovered={isHovered} />
          ) : null}
        </span>
      </button>
    </>
  );
};

export default Square;
