import { replayActions, useActionCreators, useStateSelector } from "@/state";
import React from "react";

const NextButton = ({ isPlaying }: { isPlaying: boolean }) => {
  const actions = useActionCreators(replayActions);
  const currentMoveIndex = useStateSelector(
    (state) => state.replay.currentMoveIndex
  );
  const gameHistory = useStateSelector((state) => state.replay.gameHistory);
  return (
    <button
      onClick={() => actions.nextMove()}
      className={`cursor-pointer ${
        currentMoveIndex !== gameHistory.length - 1 && "hover:scale-110"
      } transition`}
			disabled={isPlaying}
    >
      <img
        draggable="false"
        className={`h-12 rotate-90 ${
          (currentMoveIndex === gameHistory.length - 1 || isPlaying) &&
          "svg-disabled"
        }`}
        src="/assets/icons/arrow.svg"
        alt="prev"
      />
    </button>
  );
};

export default NextButton;
