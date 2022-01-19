import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIsLoggedIn: false,
  userName: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {},
    login: (state, action) => {
      console.log(`zalogowano`);
      state.userIsLoggedIn = true;
      state.userName = action.payload;
    },
    logout: (state) => {
      state.userIsLoggedIn = false;
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
