"use client";
import { replayActions, useActionCreators, useStateSelector } from '@/state'
import React, { useEffect, useState } from 'react'
import * as Slider from '@radix-ui/react-slider';
import { Label } from '../ui/label';

const TopBarControlsReplay = () => {
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
    <div className="bg-dark-3 flex justify-center items-center gap-6 md:px-6 px-3">
      <h1 className='flex-auto select-none hidden md:block'>Controls</h1>
      <div className="flex gap-x-12 items-center justify-center flex-wrap">
        <div className="flex gap-3">
          <div onClick={() => handlePrevMove()} className="cursor-pointer hover:scale-110 transition">
            <img draggable="false" className='h-12 -rotate-90' src="/assets/icons/arrow.svg" alt="prev" />
          </div>
          <div onClick={() => handleNextMove()} className="cursor-pointer hover:scale-110 transition">
            <img draggable="false" className='h-12 rotate-90' src="/assets/icons/arrow.svg" alt="prev" />
          </div>
        </div>
        <div onClick={() => toggleIsPlaying()} className="flex gap-1 items-center cursor-pointer hover:scale-[1.03] transition">
          <img draggable="false" className='h-8' src="/assets/icons/auto-play.svg" alt="prev" />
          <div className={`pt-0.5 shadow select-none ${isPlaying && "text-primary-500 text-shadow-neon"}`}>Auto Play</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-4">
          <Label htmlFor='slider' className='select-none'>Auto Play Speed</Label>
          <Slider.Root id='slider' className="SliderRoot w-24" defaultValue={[50]} max={100} onValueChange={handleSpeedChange} step={1}>
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