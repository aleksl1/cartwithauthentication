import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  returnSecureToken: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {},
    login: () => {},
    logout: () => {},
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
