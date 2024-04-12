import { GameStateType, HistoryStep } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReplayState {
  gameState: GameStateType
  movesHistory: HistoryStep[];
}

const initialState: ReplayState = {
  movesHistory: [],
  gameState: Array(27).fill(null)
};

const slice = createSlice({
  name: "replay",
  initialState,
  reducers: {
    loadMovesHistory(state, action: PayloadAction<HistoryStep[]>) {
      state.movesHistory = action.payload;
    }
  },
});

export const {reducer: replayReducer, actions: replayActions } = slice;