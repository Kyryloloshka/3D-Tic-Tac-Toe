import { GameStateType, Player } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SimpleGameState {
  gameState: GameStateType;
  isXNext: boolean;
  winner: Player | null;
}

const initialState: SimpleGameState = {
  gameState: Array(9).fill(null),
  isXNext: true,
  winner: null,
};

const slice = createSlice({
  name: "simpleGame",
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameStateType>) {
      state.gameState = action.payload;
    },
    restartGame(state) {
      state.gameState = initialState.gameState;
      state.winner = initialState.winner;
    },
    setIsXNext(state, action: PayloadAction<boolean>) {
      state.isXNext = action.payload;
    },
    setWinner(state, action: PayloadAction<Player | null>) {
      state.winner = action.payload;
    },
  },
});

export const {reducer: simpleGameReducer, actions: simpleGameActions } = slice;