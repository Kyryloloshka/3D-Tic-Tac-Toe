import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  isBurgerMenuOpen: boolean;
}

const initialState: HeaderState = {
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