import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const authAction = auth.actions;
export default auth.reducer;