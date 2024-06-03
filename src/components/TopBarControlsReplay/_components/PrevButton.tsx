import { replayActions, useActionCreators, useStateSelector } from "@/state";
import React from "react";

const PrevButton = ({ isPlaying }: { isPlaying: boolean }) => {
  const actions = useActionCreators(replayActions);
  const currentMoveIndex = useStateSelector(
    (state) => state.replay.currentMoveIndex
  );
  return (
    <button
      onClick={() => actions.prevMove()}
      className={`cursor-pointer ${
        currentMoveIndex !== 0 && "hover:scale-110"
      } transition`}
			disabled={isPlaying}
    >
      <img
        draggable="false"
        className={`h-12 -rotate-90 ${
          (currentMoveIndex === 0 || isPlaying) && "svg-disabled"
        }`}
        src="/assets/icons/arrow.svg"
        alt="prev"
      />
    </button>
  );
};

export default PrevButton;
