"use client";
import React, { useEffect, useState } from "react";
import BoardForFourD from "./_components/BoardForFourD";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { game4dActions, useActionCreators, useStateSelector } from "@/state";

const FourDGamePage = () => {
  const [title, setTitle] = useState("2D");
  const [isRotatedScene, setIsRotatedScene] = useState(false);
  const [isSceneWasRotated, setIsSceneWasRotated] = useState(false);
  const turn = useStateSelector((state) => state.game4d.turn);
  const fourDGameState = useStateSelector((state) => state.game4d.gameState);
  const winner = useStateSelector((state) => state.game4d.winner);
  const actions = useActionCreators(game4dActions);
  useEffect(() => {
    const timer1 = setTimeout(() => setTitle("3D"), 3000);
    const timer2 = setTimeout(() => setTitle("4D"), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const restartGame = () => {
    actions.restartGame();
  };

  const boards = [
    { delay: 6 },
    { delay: 3 },
    { delay: 6 },
    { delay: 6 },
    { delay: 0 },
    { delay: 6 },
    { delay: 6 },
    { delay: 3 },
    { delay: 6 },
  ];

  const toggleIsRotatedScene = () => {
    setIsRotatedScene((prev) => !prev);
    setIsSceneWasRotated(true);
  };
  return (
    <div className={`overflow-hidden flex-auto flex flex-col h-full`}>
      <div className="flex items-center justify-center h-full flex-col flex-auto pt-[10px] pb-[160px] w-full gap-[30px]">
        <p className="text-xl"></p>
        <h2 className="text-3xl">
          <motion.span
            className="inline-block text-primary-500"
            key={title}
            initial={{ scale: 10, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.3, ease: "easeIn" }}
          >
            {title}
          </motion.span>{" "}
          Tic Tac Toe
        </h2>
        <div className="flex gap-6">
          <Button
            variant="neon"
            className="button"
            onClick={toggleIsRotatedScene}
          >
            Rotate Scene
          </Button>
          <Button variant="neon" className="button" onClick={restartGame}>
            Restart Game
          </Button>
        </div>
        <p>{winner ? `${winner} is winner` : `${turn} - turn`}</p>
        <div
          className={`grid grid-cols-[repeat(3,_220px)] ${
            isRotatedScene
              ? "gap-x-[50px] gap-y-[100px]"
              : "gap-x-[250px] gap-y-[0]"
          } grid-rows-[repeat(3,_220px)] duration-2s`}
        >
          {fourDGameState.map((cube, cubeIndex) =>
            cube.map((board: (string | null)[][], boardIndex: number) => {
              const index = cubeIndex * 3 + boardIndex;
              return (
                <motion.div
                  key={index}
                  className="relative origin-center"
                  initial={{
                    ...((index === 2 || index === 5 || index === 8) && {
                      left: "-100%",
                    }),
                    ...((index === 0 || index === 3 || index === 6) && {
                      left: "100%",
                    }),
                    ...(index === 1 && { bottom: "-100%" }),
                    ...(index === 7 && { bottom: "100%" }),
                    opacity: 0,
                    ...(index !== 4 && {
                      rotateX: -65,
                      rotateZ: 45,
                    }),
                  }}
                  animate={{
                    left: "0",
                    opacity: 1,
                    bottom: "0",
                    rotateZ: isRotatedScene ? 0 : 45,
                    rotateX: isRotatedScene ? -25 : -65,
                    rotateY: isRotatedScene ? 45 : 0,
                  }}
                  transition={{
                    delay: isSceneWasRotated ? 0 : boards[index].delay,
                    duration: 2.3,
                    ease: "easeOut",
                  }}
                >
                  <BoardForFourD
                    cubeIndex={cubeIndex}
                    boardIndex={boardIndex}
                  />
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FourDGamePage;
