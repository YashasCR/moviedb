import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = { searchTerm:"",isNewMovieAddedOrUpdated:false};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setIsNewMovieAddedOrUpdated(state,action){
        state.isNewMovieAddedOrUpdated = action.payload
    }
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;