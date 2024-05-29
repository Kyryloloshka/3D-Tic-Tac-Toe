"use client";
import { makeBotMove } from "@/lib/makeBotMoveLogic";
import { gameActions, useActionCreators, useStateSelector } from "@/state";
import { useEffect } from "react";

const BotMoveHandler = () => {
  const isCenterAvailable = useStateSelector(
    (state) => state.game.isCenterAvailable
  );
  const isPlayWithBot = useStateSelector((state) => state.game.isPlayWithBot);
  const gameState = useStateSelector((state) => state.game.gameState);
  const botPlayer = useStateSelector((state) => state.game.botPlayer);
  const difficulty = useStateSelector((state) => state.game.botDifficulty);
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const winner = useStateSelector((state) => state.game.winner);
  const actions = useActionCreators(gameActions);

  useEffect(() => {
    const performBotMove = async () => {
      await makeBotMove(
        gameState,
        botPlayer,
        difficulty,
        isPlayWithBot,
        isXNext,
        winner,
        actions
      );
    };

    if (isPlayWithBot && !winner) {
      performBotMove();
    }
  }, [
    gameState,
    winner,
    botPlayer,
    isXNext,
    isPlayWithBot,
    isCenterAvailable,
    actions,
  ]);

  return null;
};

export default BotMoveHandler;
