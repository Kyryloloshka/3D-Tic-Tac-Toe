import { createSlice } from "@reduxjs/toolkit";

interface ReplayState {
  replayIndex: number;
}

const initialState: ReplayState = {
  replayIndex: 0,
};

const slice = createSlice({
  name: "replay",
  initialState,
  reducers: {
  },
});


export const {reducer: replayReducer, actions: replayActions } = slice;