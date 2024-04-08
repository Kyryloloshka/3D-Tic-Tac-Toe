export type INavLink = {
  route: string;
  label: string;
  translateKey: string;
};
export enum Player {
  X = "X",
  O = "O",
}

export type GameStateType = (Player | null)[];