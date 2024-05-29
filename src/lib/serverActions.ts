import { DifficultyEnum, GameStateType, Player } from "@/types";

export const fetchBotMove = async (
  board: GameStateType, 
  player: Player, 
  difficulty: DifficultyEnum
): Promise<number> => {
  try {
    const response = await fetch('/api/botMove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board, player, difficulty }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.move;
  } catch (error) {
    console.error('Failed to fetch bot move:', error);
    return -1;
  }
};

