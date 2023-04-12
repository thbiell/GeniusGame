import { createSlice } from "@reduxjs/toolkit";

// Estado inicial do jogo
const initialState = {
  sequence: [], // Sequência de cores gerada pelo jogo
  userSequence: [], // Sequência de cores escolhida pelo usuário
  score: 0, // Pontuação do jogador
  isPlaying: false, // Indica se o jogo está em andamento ou não
  isGameOver: false, // Indica se o jogo terminou ou não
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Adiciona uma nova cor à sequência do jogo
    addToSequence(state, action) {
      state.sequence.push(action.payload);
    },
    // Limpa a sequência do usuário
    clearUserSequence(state) {
      state.userSequence = [];
    },
    // Incrementa a pontuação do jogador
    incrementScore(state) {
      state.score++;
    },
    // Inicia o jogo
    startGame(state) {
      state.isPlaying = true;
      state.isGameOver = false;
      state.score = 0;
      state.sequence = [];
      state.userSequence = [];
    },
    // Encerra o jogo
    endGame(state) {
      state.isPlaying = false;
      state.isGameOver = true;
    },
    // Adiciona uma cor à sequência do usuário
    addUserSequence(state, action) {
      state.userSequence.push(action.payload);
    },
  },
});

// Exporta as ações do slice
export const {
  addToSequence,
  clearUserSequence,
  incrementScore,
  startGame,
  endGame,
  addUserSequence,
} = gameSlice.actions;

// Exporta o reducer do slice
export default gameSlice.reducer;
