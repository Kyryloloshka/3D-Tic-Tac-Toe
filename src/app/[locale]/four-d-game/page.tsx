"use client";
import React, { useEffect, useState } from "react";
import BoardForFourD from "./_components/BoardForFourD";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { game4dActions, useActionCreators, useStateSelector } from "@/state";
import { useTranslations } from "next-intl";

const FourDGamePage = () => {
  const [title, setTitle] = useState("2D");
  const [isRotatedScene, setIsRotatedScene] = useState(false);
  const [isSceneWasRotated, setIsSceneWasRotated] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const turn = useStateSelector((state) => state.game4d.turn);
  const fourDGameState = useStateSelector((state) => state.game4d.gameState);
  const winner = useStateSelector((state) => state.game4d.winner);
  const actions = useActionCreators(game4dActions);
  const tWinner = useTranslations("leftNavBar");
  const t = useTranslations("page.game4d");
  useEffect(() => {
    if (skipAnimation) {
      setTitle("4D");
      return;
    }

    const timer1 = setTimeout(() => setTitle("3D"), 3000);
    const timer2 = setTimeout(() => setTitle("4D"), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [skipAnimation]);

  const restartGame = () => {
    actions.restartGame();
  };

  const toggleIsRotatedScene = () => {
    setIsRotatedScene((prev) => !prev);
    setIsSceneWasRotated(true);
  };

  return (
    <div className={`overflow-hidden flex-auto flex flex-col h-full`}>
      <div className="flex items-center justify-center h-full flex-col flex-auto pt-[10px] pb-[160px] w-full gap-[30px]">
        <p className="text-xl"></p>
        <h2 className="md:text-3xl text-xl pointer-events-none">
          <motion.span
            className="inline-block text-primary-500"
            key={title}
            initial={{
              scale: skipAnimation ? 1 : 10,
              opacity: skipAnimation ? 1 : 0,
            }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 1 }}
            transition={{ duration: skipAnimation ? 0 : 2.3, ease: "easeIn" }}
          >
            {title}
          </motion.span>{" "}
          Tic Tac Toe
        </h2>
        <div className="flex gap-x-6 flex-wrap items-center justify-center px-[15px] gap-y-3">
          <Button
            variant="neon"
            className="button"
            onClick={toggleIsRotatedScene}
          >
            {t("rotateScene")}
          </Button>
          <Button variant="neon" className="button" onClick={restartGame}>
            {t("restart")}
          </Button>
          {!skipAnimation && (
            <Button
              variant="neon"
              className="button"
              onClick={() => setSkipAnimation(true)}
            >
              {t("skipAnimation")}
            </Button>
          )}
        </div>
        <p>
          {winner == null
            ? `${tWinner("turn")} - ${turn}`
            : `${tWinner("winner")} - ${winner}`}
        </p>
        <div
          className={`grid grid-cols-[repeat(3,_1fr)] ${
            isRotatedScene
              ? "gap-[0px]"
              : "2xl:gap-x-[160px] xl:gap-x-[140px] md:gap-x-[80px] sm:gap-x-[60px] gap-x-[30px] gap-y-[0px]"
          } grid-rows-[repeat(3,_1fr)] duration-2s`}
        >
          {fourDGameState.map((cube, cubeIndex) =>
            cube.map((board: (string | null)[][], boardIndex: number) => {
              const index = cubeIndex * 3 + boardIndex;
              return (
                <motion.div
                  key={`${index}-${skipAnimation}`}
                  className="relative origin-center"
                  initial={{
                    pointerEvents: "none",
                    ...(skipAnimation
                      ? {
                          rotateX: -65,
                          rotateZ: 45,
                        }
                      : {
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
                        }),
                  }}
                  animate={{
                    pointerEvents: "auto",
                    left: "0",
                    opacity: 1,
                    bottom: "0",
                    rotateZ: isRotatedScene ? 0 : 45,
                    rotateX: isRotatedScene ? -25 : -65,
                    rotateY: isRotatedScene ? 45 : 0,
                  }}
                  transition={{
                    delay:
                      skipAnimation || isSceneWasRotated || index === 4
                        ? 0
                        : index === 1 || index === 7
                        ? 3
                        : 6,
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
