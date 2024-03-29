import { configureStore, createSlice } from '@reduxjs/toolkit';
import gameReducer from './gameState/gameStateSlice';


export const store = configureStore({
  reducer: gameReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;