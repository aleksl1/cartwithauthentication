import { createSlice } from "@reduxjs/toolkit";
const initialToken = localStorage.getItem("token");
const initialUserName = localStorage.getItem("userName");
const initialState = {
  userIsLoggedIn: !!initialToken,
  userName: initialUserName,
  signUpStatus: "waiting",
  loginStatus: "waiting",
  statusMessage: "",
  authToken: initialToken,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      state.signUpStatus = action.payload.status;
    },
    login: (state, action) => {
      state.userIsLoggedIn = !!action.payload.token;
      state.userName = action.payload.userName;
      state.authToken = action.payload.token;
    },
    logout: (state) => {
      state.userIsLoggedIn = false;
      state.userName = null;
      state.statusMessage = "";
      state.loginStatus = "waiting";
      state.signUpStatus = "waiting";
      state.authToken = null;
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
