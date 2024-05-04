"use client";
import { replayActions, useActionCreators, useStateSelector } from '@/state'
import React, { useEffect, useState } from 'react'
import * as Slider from '@radix-ui/react-slider';
import { Label } from '../ui/label';
import { useTranslations } from 'next-intl';

const TopBarControlsReplay = () => {
  const t = useTranslations("page.replays");
  const actions = useActionCreators(replayActions);
  const currentMoveIndex = useStateSelector((state) => state.replay.currentMoveIndex);
  const gameHistory = useStateSelector((state) => state.replay.gameHistory);
  const [isPlaying, setisPlaying] = useState(false);
  const [speedAutoPlay, setSpeedAutoPlay] = useState(1);

  const handlePrevMove = () => {
    actions.prevMove()
  }

  const handleNextMove = () => {
    actions.nextMove()
  }
  useEffect(() => {
    if (isPlaying) {
      if (currentMoveIndex === gameHistory.length - 1) {
        toggleIsPlaying();
      } else {
        setTimeout(() => {
          if (isPlaying)
            actions.nextMove();
        }, 30 * (100 - speedAutoPlay/1.2))
      }
    }
  }, [isPlaying, currentMoveIndex, speedAutoPlay])

  const toggleIsPlaying = () => {
    setisPlaying(prev => !prev)
  }

  const handleSpeedChange = (value: number[]) => {
    setSpeedAutoPlay(value[0])
  }

  return (
    <div className="border-b-[2px] absolute z-10 w-full bg-dark-2 border-dark-3 flex justify-center items-center gap-6 md:px-6 px-3">
      <h1 className='flex-auto select-none hidden md:block'>{t("title")}</h1>
      <div className="flex select-none gap-x-6 items-center justify-center flex-wrap relative h-full">
        <div className="flex gap-3 px-3">
          <div onClick={() => handlePrevMove()} className={`cursor-pointer ${currentMoveIndex !== 0 && "hover:scale-110"} transition`}>
            <img draggable="false" className={`h-12 -rotate-90 ${(currentMoveIndex === 0 || isPlaying) && "svg-disabled"}`} src="/assets/icons/arrow.svg" alt="prev" />
          </div >
          <div onClick={() => handleNextMove()} className={`cursor-pointer ${currentMoveIndex !== gameHistory.length - 1 && "hover:scale-110"} transition`}>
            <img draggable="false" className={`h-12 rotate-90 ${(currentMoveIndex === gameHistory.length - 1 || isPlaying) && "svg-disabled"}`} src="/assets/icons/arrow.svg" alt="prev" />
          </div>
        </div>
        <div className={`${isPlaying && "inner-shadow-primary"} transition-all flex-center flex-col h-[70px] px-3`}>
          <div onClick={() => toggleIsPlaying()} className={`flex gap-1 items-center cursor-pointer h-full hover:scale-[1.03] transition`}>
            <img draggable="false" className='h-8' src="/assets/icons/auto-play.svg" alt="prev" />
            <div className={`pt-0.5 shadow select-none ${isPlaying && "text-primary-500 text-shadow-neon"}`}>{t("autoplay")}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-4 pl-3">
          <Label htmlFor='slider' className='select-none'>{t("autoplaySpeed")}</Label>
          <Slider.Root disabled={isPlaying} id='slider' className="SliderRoot w-24" defaultValue={[50]} max={100} onValueChange={handleSpeedChange} step={1}>
            <Slider.Track className="SliderTrack">
              <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
          </Slider.Root>
        </div>
      </div>
    </div>
  )
}

export default TopBarControlsReplay