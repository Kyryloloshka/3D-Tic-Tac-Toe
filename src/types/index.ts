export type INavLink = {
  route: string;
  label: string;
  translateKey: string;
};
export enum Player {
  X = "X",
  O = "O",
}

export enum Difficulty {
  easy,
  medium,
  hard,
  expert
}

export type GameStateType = (Player | null)[];