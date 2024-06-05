import { GameStateType, Player, Tie } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SimpleGameState {
  gameState: GameStateType;
  isXNext: boolean;
  winner: Player | Tie | null;
  isPassphraseCorrect: boolean;
}

const initialState: SimpleGameState = {
  gameState: Array(9).fill(null),
  isXNext: true,
  winner: null,
  isPassphraseCorrect: false,
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
      state.isXNext = initialState.isXNext;
    },
    setIsXNext(state, action: PayloadAction<boolean>) {
      state.isXNext = action.payload;
    },
    setWinner(state, action: PayloadAction<Player | Tie | null>) {
      state.winner = action.payload;
    },
    setIsPassphraseCorrect(state, action: PayloadAction<boolean>) {
      state.isPassphraseCorrect = action.payload;
    }
  },
});

export const {reducer: simpleGameReducer, actions: simpleGameActions } = slice;