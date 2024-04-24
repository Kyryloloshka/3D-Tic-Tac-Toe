import { GameStateType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReplayState {
  gameHistory: GameStateType[];
  currentMoveIndex: number;
}

const initialState: ReplayState = {
  gameHistory: [Array(27).fill(null)],
  currentMoveIndex: 0,
};

const slice = createSlice({
  name: "replay",
  initialState,
  reducers: {
    loadMovesHistory(state, action: PayloadAction<GameStateType[]>) {
      state.gameHistory = action.payload;
    },
    nextMove(state) {
      if (state.currentMoveIndex === state.gameHistory.length - 1) return;
      state.currentMoveIndex += 1;
    },
    prevMove(state) {
      if (state.currentMoveIndex === 0) return;
      state.currentMoveIndex -= 1;
    },
    clearHistory(state) {
      state.gameHistory = initialState.gameHistory;
      state.currentMoveIndex = initialState.currentMoveIndex;
    }
  },
});

export const {reducer: replayReducer, actions: replayActions } = slice;