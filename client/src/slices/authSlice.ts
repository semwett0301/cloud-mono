import { AuthResponse } from "@project/meta";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  initialState: {
    token: window.localStorage.getItem("token"),
  },
  name: "auth",
  reducers: {
    setUser(state, action: PayloadAction<AuthResponse>) {
      window.localStorage.setItem("token", action.payload.token);
      state = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
