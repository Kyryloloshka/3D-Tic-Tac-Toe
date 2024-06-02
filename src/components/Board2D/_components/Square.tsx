"use client";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { calculateWinner } from "@/lib/gameLogic";
import { useTranslations } from "next-intl";
import { gameActions } from "@/state/slices/game";
import { Player } from "@/types";
import { useActionCreators, useStateSelector } from "@/state/hooks";
import Cross from "./Cross";
import Circle from "./Circle";

const Square = ({index, boardOrder}: {index: number, boardOrder: number}) => {
  const { toast } = useToast();
  const gameState = useStateSelector((state) => state.game.gameState);
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const winner = useStateSelector((state) => state.game.winner);
  const isPlayWithBot = useStateSelector((state) => state.game.isPlayWithBot);
  
  const botPlayer = useStateSelector((state) => state.game.botPlayer);
  const t = useTranslations("board");
  const actions = useActionCreators(gameActions);
  const hoveredIndex = useStateSelector((state) => state.game.hoveredIndex);
  const isCenterAvailable = useStateSelector(
    (state) => state.game.isCenterAvailable
  );

  const handleClick = (index: number) => {
    if (winner) {
      toast({
        title: t("gameAlreadyOveredTitle"),
        description: t("gameAlreadyOveredDescription"),
        action: (
          <ToastAction
            className="px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]"
            onClick={() => {
              actions.restartGame();
            }}
            altText={t("restartGame")}
          >
            {t("restartGame")}
          </ToastAction>
        ),
      });
      return;
    }

    if (
      (isPlayWithBot &&
        (gameState[boardOrder * 9 + index] ||
          isXNext === (botPlayer === Player.X))) ||
      gameState[boardOrder * 9 + index]
    ) {
      return;
    }
    const newBoard = [...gameState];
    const player = isXNext ? Player.X : Player.O;
    newBoard[boardOrder * 9 + index] = player;
    actions.addToHistory(newBoard);

    actions.setGameState(newBoard);
    actions.setIsXNext(!isXNext);

    const {winner: newWinner} = calculateWinner(newBoard);
    if (newWinner) actions.setWinner(newWinner);
  };

  const handlePointerOver = (index: number) => {
    if (!isPlayWithBot || isXNext !== (botPlayer === Player.X)) {
      actions.setHoveredIndex(boardOrder * 9 + index);
    }
  };

  const handlePointerOut = () => {
    actions.setHoveredIndex(null);
  };

  return (
    <>
      {!isCenterAvailable && index === 4 && boardOrder === 1 ? (
        <div className="w-[33.33%] top-[-2px] relative bg-primary-500 h-[calc(100%+5px)]"></div>
      ) : (
        <button
          className="w-[33.33%] h-full flex justify-center items-center overflow-hidden relative"
          onClick={() => handleClick(index)}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={handlePointerOut}
          aria-label="make move"
        >
          {isPlayWithBot ? (
            hoveredIndex === boardOrder * 9 + index &&
            gameState[boardOrder * 9 + index] == null ? (
              <div className="pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50">
                {isXNext ? Cross() : Circle()}
              </div>
            ) : (
              <span className="pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none">
                {gameState[boardOrder * 9 + index] == "X"
                  ? Cross()
                  : gameState[boardOrder * 9 + index] == "O"
                  ? Circle()
                  : null}
              </span>
            )
          ) : hoveredIndex === boardOrder * 9 + index &&
            gameState[boardOrder * 9 + index] == null ? (
            <div className=" pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50">
              {isXNext ? Cross() : Circle()}
            </div>
          ) : (
            <span className="pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none">
              {gameState[boardOrder * 9 + index] == "X"
                ? Cross()
                : gameState[boardOrder * 9 + index] == "O"
                ? Circle()
                : null}
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default Square;
