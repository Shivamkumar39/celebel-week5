import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: 'POP', // Set a default genre to prevent undefined fetch
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      // Handle different API data formats safely
      state.currentSongs =
        action.payload?.data?.tracks?.hits ??
        action.payload?.data?.tracks ??
        action.payload?.data ??
        [];

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      const next = state.currentSongs[action.payload];
      state.activeSong = next?.track || next;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      const prev = state.currentSongs[action.payload];
      state.activeSong = prev?.track || prev;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },

    resetPlayer: () => initialState, // optional utility action
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
