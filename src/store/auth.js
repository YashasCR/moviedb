import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isLoggedIn: false
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
