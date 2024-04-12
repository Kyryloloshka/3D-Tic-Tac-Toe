"use client";
import { replayActions, useActionCreators, useStateSelector } from '@/state'
import React, { useEffect, useState } from 'react'

const TopBarControlsReplay = () => {
  const actions = useActionCreators(replayActions);
  const gameState = useStateSelector((state) => state.replay.gameHistory[state.replay.currentMoveIndex]);
  const currentMoveIndex = useStateSelector((state) => state.replay.currentMoveIndex);
  const gameHistory = useStateSelector((state) => state.replay.gameHistory);
  const [isPlaying, setisPlaying] = useState(false);
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
        }, 500)
      }
    }
    console.log(currentMoveIndex);
  }, [isPlaying, currentMoveIndex])

  const toggleIsPlaying = () => {
    setisPlaying(prev => !prev)
  }

  return (
    <div className="bg-dark-3 pt-3 pb-6 flex flex-col gap-6 flex-auto">
      <div className="flex gap-6 items-center justify-center">
        <div onClick={() => handlePrevMove()} className="cursor-pointer hover:scale-110 transition">
          <img  className='h-12 -rotate-90' src="/assets/icons/arrow.svg" alt="prev" />
        </div>
        <div onClick={() => handleNextMove()} className="cursor-pointer hover:scale-110 transition">
          <img className='h-12 rotate-90' src="/assets/icons/arrow.svg" alt="prev" />
        </div>
        <div onClick={() => toggleIsPlaying()} className="flex gap-2 items-center cursor-pointer hover:scale-[1.03] transition">
          <img className='h-8' src="/assets/icons/auto-play.svg" alt="prev" />
          <div className={`pt-0.5 shadow ${isPlaying && "text-primary-500 text-shadow-neon"}`}>Auto Play</div>
        </div>
      </div>
    </div>
  )
}

export default TopBarControlsReplay