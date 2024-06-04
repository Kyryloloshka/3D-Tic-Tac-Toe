import { configureStore } from '@reduxjs/toolkit';
import { gameReducer, headerReducer, replayReducer, simpleGameReducer } from './slices';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    replay: replayReducer,
    header: headerReducer,
    simpleGame: simpleGameReducer,
  },
});