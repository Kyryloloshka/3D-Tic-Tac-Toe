import { Difficulty, GameStateType, HistoryStep, Player } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState {
  gameState: GameStateType;
  isXNext: boolean;
  winner: Player | null;
  hoveredIndex: number | null;
  firstPlayer: Player;
  isCenterAvailable: boolean;
  isPlayWithBot: boolean;
  botPlayer: Player;
  botDifficulty: Difficulty;
  historyMoves: HistoryStep[];
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
  botDifficulty: Difficulty.easy,
  historyMoves: [],
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameStateType>) {
      state.gameState = action.payload;
    },
    setIsXNext(state, action: PayloadAction<boolean>) {
      state.isXNext = action.payload;
    },
    setWinner(state, action: PayloadAction<Player | null>) {
      state.winner = action.payload;
    },
    setHoveredIndex(state, action: PayloadAction<number | null>) {
      state.hoveredIndex = action.payload;
    },
    setFirstPlayer(state, action: PayloadAction<Player>) {
      state.firstPlayer = action.payload;
    },
    setIsCenterAvailable(state, action: PayloadAction<boolean>) {
      state.isCenterAvailable = action.payload;
    },
    setIsPlayWithBot(state, action: PayloadAction<boolean>) {
      state.isPlayWithBot = action.payload;
    },
    setBotPlayer(state, action: PayloadAction<Player>) {
      state.botPlayer = action.payload;
    },
    setBotDifficulty(state, action: PayloadAction<Difficulty>) {
      state.botDifficulty = action.payload;
    },
    addToHistory(state, action: PayloadAction<HistoryStep>) {
      state.historyMoves.push(action.payload);
    },
    clearHistory(state) {
      state.historyMoves = [];
    },
  }
})

export const {reducer: gameReducer, actions: gameActions } = slice;
