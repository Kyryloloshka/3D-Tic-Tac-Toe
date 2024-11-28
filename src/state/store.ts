import { configureStore } from '@reduxjs/toolkit';
import { gameReducer, headerReducer, replayReducer, simpleGameReducer, game4dReducer } from './slices';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    game4d: game4dReducer,
    replay: replayReducer,
    header: headerReducer,
    simpleGame: simpleGameReducer,
  },
});