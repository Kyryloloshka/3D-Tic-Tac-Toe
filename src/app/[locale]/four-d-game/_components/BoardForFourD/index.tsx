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
    <div className="grid grid-cols-[repeat(3,_100px)] grid-rows-[repeat(3,_100px)] gap-[5px] mx-auto my-5 max-w-[320px]">
      {board.map((row, index) =>
        row.map((cell: null | string, cellIndex: number) => (
          <div
            key={index * 3 + cellIndex}
            className={`flex items-center select-none bg-dark-2 justify-center w-[100px] h-[100px] text-[32px] font-bold cursor-pointer border-[1px] border-primary-500 transition hover:bg-dark-5 active:bg-dark-4 ${
              isCellIsInWinLine(index, cellIndex) &&
              "bg-primary-500 text-dark-1"
            }`}
            onClick={() => handleClick(index * 3 + cellIndex)}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default BoardForFourD;
