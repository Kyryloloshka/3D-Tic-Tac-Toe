import React from 'react'
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { calculateWinner } from '@/lib/gameLogic';
import { useTranslations } from 'next-intl';
import { gameActions } from '@/state/slices/game';
import { GameStateType, Player } from '@/types';
import { useActionCreators, useStateSelector } from '@/state/hooks';
import { replayActions } from '@/state';

interface Board2DProps {
  boardOrder: number;
}

const Board2D = ({
    boardOrder,
  } : Board2DProps) => {

  const {toast} = useToast()
  const gameState = useStateSelector((state) => state.game.gameState);
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const winner = useStateSelector((state) => state.game.winner);
  const isPlayWithBot = useStateSelector((state) => state.game.isPlayWithBot);
  const hoveredIndex = useStateSelector((state) => state.game.hoveredIndex);
  const isCenterAvailable = useStateSelector((state) => state.game.isCenterAvailable);
  const botPlayer = useStateSelector((state) => state.game.botPlayer);
  const t = useTranslations("board");
  const actions = useActionCreators(gameActions);
  const actionsReplay = useActionCreators(replayActions);

  const handleClick = (index: number) => {
    if (winner) {
      toast({
        title: t("gameAlreadyOveredTitle"),
        description: t("gameAlreadyOveredDescription"),
        action: <ToastAction className='px-3 py-1 rounded-md border border-input shadow-sm hover:shadow-[0px_0px_20px_0px_var(--shadow-primary-neon)] transition hover:border-[#AFFFDF] hover:text-[#AFFFDF]' onClick={() => {
          actions.setGameState(Array(27).fill(null));
          actions.setIsXNext(true);
          actions.setWinner(null);
          actionsReplay.clearHistory();
        }} altText={t("restartGame")}>{t("restartGame")}</ToastAction>
      });
      return;
    };
    
    if (isPlayWithBot && (gameState[boardOrder * 9 + index] || isXNext === (botPlayer === Player.X)) || gameState[boardOrder * 9 + index]) {
      return; 
    }
    const newBoard = [...gameState];
    const player = isXNext ? Player.X : Player.O;
    newBoard[boardOrder * 9 + index] = player;
    actions.addToHistory(newBoard);
    
    actions.setGameState(newBoard);
    actions.setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
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

  const renderCross = () => (
    <div className='rotate-45'>
      <div className="absolute top-1/2 left-1/2 w-[40px] h-[6px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[6px] h-[40px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  )

  const renderCircle = () => (
    <div className="shadow-neon-secondary h-8 w-8 rounded-full border-secondary-500 border-[6px]">
    </div>
  )

  const renderSquare = (index: number) => {
    return <>
      {!isCenterAvailable && index === 4 && boardOrder === 1 ?  <div className='w-[33.33%] bg-primary-500 h-[105%]'></div> :
        <button
          className='w-[33.33%] h-full flex justify-center items-center overflow-hidden relative'
          onClick={() => handleClick(index)}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={handlePointerOut}
        >
          {isPlayWithBot ? hoveredIndex === boardOrder * 9 + index 
            && gameState[boardOrder * 9 + index] == null ? (
            <div className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50'>
              {isXNext ? renderCross() : renderCircle()}
            </div>
          ) : <span className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none'>
          {gameState[boardOrder * 9 + index] == 'X' ? renderCross() : gameState[boardOrder * 9 + index] == "O" ? renderCircle() : null}
        </span> :
          hoveredIndex === boardOrder * 9 + index 
            && gameState[boardOrder * 9 + index] == null ? (
            <div className=' pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none opacity-50'>
              {isXNext ? renderCross() : renderCircle()}
            </div>
          ) : <span className='pointer-events-none text-primary-500 text-4xl font-semibold text-shadow-neon select-none'>
          {gameState[boardOrder * 9 + index] == 'X' ? renderCross() : gameState[boardOrder * 9 + index] == "O" ? renderCircle() : null}
        </span>}
          
        </button>
      }
      
    </>
  }

  return (
    <div className="relative min-h-[140px] min-w-[140px] h-[20vw] max-h-[180px] max-w-[180px] w-[20vw]">
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[33.33%] -translate-y-[2px]"></div>  
      <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[66.66%] -translate-y-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[33.33%] -translate-x-[2px]"></div>  
      <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[66.66%] -translate-x-[2px]"></div>
      <div className="absolute flex flex-col h-[100%] w-full gap-[4px]">
        <div className="flex w-full h-[calc(33.33%-2px)] gap-[4px]">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex h-[calc(33.33%_-4px)] gap-[4px]">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex h-[calc(33.33%-4px)] gap-[4px]">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

export default Board2D