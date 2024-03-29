import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  gameSingleState: Array<string | null>;
  isXNextSingle: boolean;
  winnerSingle: string | null;
  hoveredIndex: number | null;
  gameWithBotState: Array<string | null>;
  isXNextWithBot: boolean;
  winnerWithBot: string | null;
}

const initialState: GameState = {
  gameSingleState: Array(27).fill(null),
  isXNextSingle: true,
  winnerSingle: null,
  hoveredIndex: null,
  gameWithBotState: Array(27).fill(null),
  isXNextWithBot: true,
  winnerWithBot: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameSingleState: (state, action) => {
      state.gameSingleState = action.payload;
    },
    setIsXNextSingle: (state, action) => {
      state.isXNextSingle = action.payload;
    },
    setWinnerSingle: (state, action) => {
      state.winnerSingle = action.payload;
    },
    setHoveredIndex: (state, action) => {
      state.hoveredIndex = action.payload;
    },
    setGameWithBotState: (state, action) => {
      state.gameWithBotState = action.payload;
    },
    setIsXNextWithBot: (state, action) => {
      state.isXNextWithBot = action.payload;
    },
    setWinnerWithBot: (state, action) => {
      state.winnerWithBot = action.payload;
    },
  }
})

export const {
  setGameSingleState, 
  setIsXNextSingle, 
  setWinnerSingle, 
  setHoveredIndex,
  setGameWithBotState,
  setIsXNextWithBot,
  setWinnerWithBot,
} = gameSlice.actions;

export default gameSlice.reducer;