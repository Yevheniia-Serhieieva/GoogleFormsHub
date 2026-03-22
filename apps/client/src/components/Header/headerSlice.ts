import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type HeaderState = {
  search: string;
};

const initialState: HeaderState = {
  search: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearSearch(state) {
      state.search = '';
    },
  },
});

export const { setSearch, clearSearch } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
