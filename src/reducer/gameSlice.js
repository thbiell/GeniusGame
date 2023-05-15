import { createSlice } from "@reduxjs/toolkit";

// Estado inicial do jogo
const initialState = {
  gameSequence:{}
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameSequence: (state, action) => {
      state.sequence = action.payload;
    },
  },
});

// Exporta as ações do slice
export const {
  setGameSequence,
} = gameSlice.actions;

// Exporta o reducer do slice
export default gameSlice.reducer;
