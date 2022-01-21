import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIsLoggedIn: false,
  userName: null,
  signUpStatus: "waiting",
  loginStatus: "waiting",
  statusMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      state.signUpStatus = action.payload.status;
    },
    login: (state, action) => {
      state.userIsLoggedIn = action.payload.success;
      state.userName = action.payload.userName;
      state.loginStatus = action.payload.status;
    },
    logout: (state) => {
      state.userIsLoggedIn = false;
      state.userName = null;
      state.statusMessage = "";
      state.loginStatus = "waiting";
      state.signUpStatus = "waiting";
    },
    showStatusMessage: (state, action) => {
      state.statusMessage = action.payload.message;
      state.loginStatus = action.payload.loginStatus;
      state.signUpStatus = action.payload.signUpStatus;
    },
  },
});

export const { login, logout, signUp, showStatusMessage } = authSlice.actions;

export default authSlice.reducer;
