import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardData: []
};

const contentSlice = createSlice({
    name: "cardData",
    initialState: initialState,
    reducers: {
      setCardData(state, action) {
        state.cardData = action.payload;
      }
    }
  });
  
  export const cardDataActions = contentSlice.actions;
  
  export default contentSlice.reducer;
  