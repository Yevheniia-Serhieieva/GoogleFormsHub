import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    search: '',
};
const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
        clearSearch(state) {
            state.search = '';
        },
    },
});
export const { setSearch, clearSearch } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
