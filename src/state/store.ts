import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/game';
import { replayReducer } from './slices';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    replay: replayReducer,
  },
});