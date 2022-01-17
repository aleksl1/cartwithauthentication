import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIsLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {},
    login: (state) => {
      console.log(`zalogowano`);
      state.userIsLoggedIn = true;
    },
    logout: (state) => {
      state.userIsLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
