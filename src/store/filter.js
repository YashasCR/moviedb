import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = { searchTerm:""};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;