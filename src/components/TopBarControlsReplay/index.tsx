"use client";
import { replayActions, useActionCreators, useStateSelector } from "@/state";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { rubik } from "@/app/[locale]/layout";
import PrevButton from "./_components/PrevButton";
import NextButton from "./_components/NextButton";
import TogglePlayingButton from "./_components/TogglePlayingButton";
import SliderSpeedAutoPlaying from "./_components/SliderSpeedAutoPlaying";

const TopBarControlsReplay = () => {
  const t = useTranslations("page.replays");
  const actions = useActionCreators(replayActions);
  const currentMoveIndex = useStateSelector(
    (state) => state.replay.currentMoveIndex
  );
  const gameHistory = useStateSelector((state) => state.replay.gameHistory);
  const [isPlaying, setisPlaying] = useState(false);
  const [speedAutoPlay, setSpeedAutoPlay] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentMoveIndex === gameHistory.length - 1) {
      setisPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      actions.nextMove();
    }, 30 * (100 - speedAutoPlay / 1.2));
    return () => clearTimeout(timer);
  }, [isPlaying, currentMoveIndex, speedAutoPlay]);

  const toggleIsPlaying = () => {
    setisPlaying((prev) => !prev);
  };

  return (
    <div className="border-b-[2px] absolute z-10 w-full bg-dark-2 border-dark-3 flex justify-center items-center gap-6 md:px-6 px-3">
      {gameHistory.length > 1 ? (
        <>
          <h1 className="flex-auto select-none hidden md:block">
            {t("title")}
          </h1>
          <div className="flex select-none gap-x-6 items-center justify-center flex-wrap relative h-full">
            <div className="flex gap-3 px-3">
              <PrevButton isPlaying={isPlaying} />
              <NextButton isPlaying={isPlaying} />
            </div>
            <div
              className={`${
                isPlaying && "inner-shadow-primary"
              } transition-all flex-center flex-col h-[70px] px-3`}
            >
              <TogglePlayingButton
                toggleIsPlaying={toggleIsPlaying}
                isPlaying={isPlaying}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-4 pl-3">
              <Label htmlFor="slider" className="select-none">
                {t("autoplaySpeed")}
              </Label>
              <SliderSpeedAutoPlaying
                isPlaying={isPlaying}
                setSpeedAutoPlay={setSpeedAutoPlay}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-auto py-4 text-center">
          <h1 className="select-none">{t("noData")}</h1>
          <p className={`select-none ${rubik.className}`}>{t("noDataDesc")}</p>
        </div>
      )}
    </div>
  );
};

export default TopBarControlsReplay;
