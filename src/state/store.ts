import { configureStore } from '@reduxjs/toolkit';
import { gameReducer, headerReducer, replayReducer } from './slices';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    replay: replayReducer,
    header: headerReducer,
  },
});