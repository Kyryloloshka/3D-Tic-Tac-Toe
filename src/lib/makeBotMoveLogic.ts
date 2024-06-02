import { calculateWinner } from '@/lib/gameLogic';
import { Player, DifficultyEnum, GameStateType } from '@/types';
import { fetchBotMove } from '@/lib/serverActions';

export const makeBotMove = async (
  gameState: GameStateType,
  botPlayer: Player,
  difficulty: DifficultyEnum,
  isPlayWithBot: boolean,
  isXNext: boolean,
  winner: Player | null,
  actions: any,
) => {
  if (isPlayWithBot && isXNext === (botPlayer === Player.X) && !winner) {
    try {
      const robotMove = await fetchBotMove(
        gameState,
        botPlayer,
        difficulty
      );

      if (robotMove !== -1) {
        const board = [...gameState];
        board[robotMove as number] = botPlayer;
        actions.setGameState(board);
        actions.setIsXNext(botPlayer !== Player.X);
        actions.addToHistory(board);
        const {winner: newWinner} = calculateWinner(board);
        if (newWinner) actions.setWinner(newWinner);
      }
    } catch (error) {
      console.error('Error making bot move:', error);
    }
  }
}