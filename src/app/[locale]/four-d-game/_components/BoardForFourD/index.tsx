"use client";
import { calculateWinner } from "@/lib/game4dLogic";
import { game4dActions, useActionCreators, useStateSelector } from "@/state";
import React, { use } from "react";

const BoardForFourD = ({
  cubeIndex,
  boardIndex,
}: {
  cubeIndex: number;
  boardIndex: number;
}) => {
  const turn = useStateSelector((state) => state.game4d.turn);
  const gameState = useStateSelector((state) => state.game4d.gameState);
  const actions = useActionCreators(game4dActions);
  const board = gameState[cubeIndex][boardIndex];
  const line = useStateSelector((state) => state.game4d.winLine);
  const winnerGame = useStateSelector((state) => state.game4d.winner);

  const handleClick = (index: number) => {
    if (winnerGame) return;
    const rowIndex = Math.floor(index / 3);
    const cellIndex = index % 3;
    if (board[rowIndex][cellIndex]) return;
    let newGameState = JSON.parse(JSON.stringify(gameState));
    newGameState[cubeIndex][boardIndex][rowIndex][cellIndex] = turn;
    const { winner, line } = calculateWinner(newGameState);
    if (winner) {
      actions.setWinner(turn);
      console.log(line);

      actions.setWinLine(line);
    }
    actions.setState(newGameState);
  };

  const isCellIsInWinLine = (rowIndex: number, cellIndex: number) => {
    return (
      line &&
      line.some(
        (el) =>
          el[0] === cubeIndex &&
          el[1] === boardIndex &&
          el[2] === rowIndex &&
          el[3] === cellIndex
      )
    );
  };

  return (
    <div className="grid grid-cols-[repeat(3,_1fr)] grid-rows-[repeat(3,_1fr)] gap-[5px] max-w-[320px]">
      {board.map((row, index) =>
        row.map((cell: null | string, cellIndex: number) => (
          <div
            key={index * 3 + cellIndex}
            className={`flex relative items-center select-none bg-dark-2 justify-center 2xl:w-[100px] 2xl:h-[100px] xl:w-[80px] xl:h-[80px] lg:w-[60px] lg:h-[60px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] text-[32px] font-bold cursor-pointer border-[1px] border-primary-500 transition hover:brightness-200 active:brightness-150 ${
              isCellIsInWinLine(index, cellIndex) &&
              (winnerGame === "X" ? "bg-primary-500" : "bg-secondary-500")
            }`}
            onClick={() => handleClick(index * 3 + cellIndex)}
          >
            {cell === "X" ? (
              <div className="rotate-45 w-full h-full">
                <div
                  className={`absolute top-1/2 left-1/2 w-[calc(50%+10px)] h-[8%] ${
                    isCellIsInWinLine(index, cellIndex)
                      ? "bg-dark-1"
                      : "bg-primary-500"
                  } transform -translate-x-1/2 -translate-y-1/2`}
                ></div>
                <div
                  className={`absolute top-1/2 left-1/2 w-[8%] h-[calc(50%+10px)] ${
                    isCellIsInWinLine(index, cellIndex)
                      ? "bg-dark-1"
                      : "bg-primary-500"
                  } transform -translate-x-1/2 -translate-y-1/2`}
                ></div>
              </div>
            ) : cell === "O" ? (
              <div
                className={`shadow-neon-secondary h-[calc(43%+7px)] w-[calc(43%+7px)] rounded-full ${
                  isCellIsInWinLine(index, cellIndex)
                    ? "border-dark-1"
                    : "border-secondary-500"
                } xl:border-[8px] lg:border-[6px] md:border-[4px] border-[2px]`}
              ></div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default BoardForFourD;
