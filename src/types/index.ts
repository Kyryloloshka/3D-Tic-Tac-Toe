export type INavLink = {
  route: string;
  label: string;
  translateKey: string;
};
export enum Player {
  X = "X",
  O = "O",
}

export enum DifficultyEnum {
  easy,
  medium,
  hard,
  expert,
}

export type GameStateType = ("X" | "O" | null)[];

export type GameState4dType = ("X" | "O" | null)[][][][];

export interface HistoryStep {
  player: Player;
  index: number;
}

export enum GameDisplay {
  Cubes = "Cubes",
  Planes = "Planes",
}

export type Tie = "tie";
