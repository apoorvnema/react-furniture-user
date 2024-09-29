import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    name: localStorage.getItem('name'),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const authAction = auth.actions;
export default auth.reducer;