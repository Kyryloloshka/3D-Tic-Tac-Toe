import { GameStateType, Player } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  gameState: GameStateType;
  isXNext: boolean;
  winner: Player | null;
  hoveredIndex: number | null;
  firstPlayer: Player;
  isCenterAvailable: boolean;
  isPlayWithBot: boolean;
  botPlayer: Player;
  status: "init" | "loading" | "success" | "error";
}

const initialState: GameState = {
  firstPlayer: Player.X,
  gameState: Array(27).fill(null),
  isXNext: true,
  winner: null,
  hoveredIndex: null,
  isCenterAvailable: true,
  isPlayWithBot: false,
  botPlayer: Player.O,
  status: "init",
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState(state, action) {
      state.gameState = action.payload;
    },
    setIsXNext(state, action) {
      state.isXNext = action.payload;
    },
    setWinner(state, action) {
      state.winner = action.payload;
    },
    setHoveredIndex(state, action) {
      state.hoveredIndex = action.payload;
    },
    setFirstPlayer(state, action) {
      state.firstPlayer = action.payload;
    },
    setIsCenterAvailable(state, action) {
      state.isCenterAvailable = action.payload;
    },
    setIsPlayWithBot(state, action) {
      state.isPlayWithBot = action.payload;
    },
    setBotPlayer(state, action) {
      state.botPlayer = action.payload;
    },
  }
})

export const {reducer: gameReducer, actions: gameActions } = slice;
