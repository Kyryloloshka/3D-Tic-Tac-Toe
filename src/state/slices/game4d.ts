import { GameState4dType, Player } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState4d {
  gameState: GameState4dType;
  turn: "X" | "O";
  winner: "X" | "O" | "tie" | null;
  winLine: [number, number, number, number][] | null;
}

const initialState: GameState4d = {
  gameState: Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null)))),
  turn: "X",
  winner: null,
  winLine: null,
};

const slice = createSlice({
  name: "game4d",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<GameState4dType>) {
      state.gameState = action.payload;

      state.turn = state.turn === "X" ? "O" : "X";
    },
    setWinner(state, action: PayloadAction<"X" | "O" | "tie" | null>) {
      state.winner = action.payload;
    },
    restartGame(state) {
      state.gameState = initialState.gameState;
      state.winner = initialState.winner;
      state.turn = initialState.turn;
      state.winLine = initialState.winLine;
    },
    setWinLine(
      state,
      action: PayloadAction<[number, number, number, number][]>
    ) {
      state.winLine = action.payload;
    },
  },
});

export const { reducer: game4dReducer, actions: game4dActions } = slice;
