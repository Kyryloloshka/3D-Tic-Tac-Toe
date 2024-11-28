import { GameState4dType } from "@/types";

export const calculateWinner = (
  gameState: GameState4dType
): {
  winner: "X" | "O" | null;
  line: [number, number, number, number][] | null;
} => {
  const size = 3;
  const directions = [-1, 0, 1];

  const generateDirections = () => {
    const result: [number, number, number, number][] = [];
    for (const d1 of directions) {
      for (const d2 of directions) {
        for (const d3 of directions) {
          for (const d4 of directions) {
            if (d1 === 0 && d2 === 0 && d3 === 0 && d4 === 0) continue;
            result.push([d1, d2, d3, d4]);
          }
        }
      }
    }
    return result;
  };

  const allDirections = generateDirections();

  const checkLine = (
    start: [number, number, number, number],
    direction: [number, number, number, number],
    player: string
  ): [number, number, number, number][] | null => {
    let [x, y, z, w] = start;
    const line: [number, number, number, number][] = [];
    for (let i = 0; i < size; i++) {
      if (
        x < 0 ||
        x >= size ||
        y < 0 ||
        y >= size ||
        z < 0 ||
        z >= size ||
        w < 0 ||
        w >= size ||
        gameState[x][y][z][w] !== player
      ) {
        return null;
      }
      line.push([x, y, z, w]);
      x += direction[0];
      y += direction[1];
      z += direction[2];
      w += direction[3];
    }
    return line;
  };

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        for (let w = 0; w < size; w++) {
          const player = gameState[x][y][z][w];
          if (!player) continue;
          for (const direction of allDirections) {
            const line = checkLine([x, y, z, w], direction, player);
            if (line) {
              return { winner: player as "X" | "O", line };
            }
          }
        }
      }
    }
  }

  return { winner: null, line: null }; // Немає переможця
};
