import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/game';


export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});