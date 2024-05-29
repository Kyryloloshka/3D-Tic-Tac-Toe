import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReplayState {
  isBurgerMenuOpen: boolean;
}

const initialState: ReplayState = {
  isBurgerMenuOpen: false,
};

const slice = createSlice({
  name: "header",
  initialState,
  reducers: {
    closeBurgerMenu(state) {
      state.isBurgerMenuOpen = false;
    },
    toggleBurgerMenu(state) {
      state.isBurgerMenuOpen = !state.isBurgerMenuOpen;
    }
  },
});

export const {reducer: headerReducer, actions: headerActions } = slice;