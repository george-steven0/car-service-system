// paginationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    toggle : false
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetPage: (state) => {
            state.toggle = !state?.toggle;
            state.currentPage = 1
        },
    },
});

export const { setPage, resetPage } = paginationSlice.actions;
export default paginationSlice.reducer;
