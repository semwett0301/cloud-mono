import { AuthResponse } from "@project/meta";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "../services";

export const authSlice = createSlice({
  initialState: {
    token: window.localStorage.getItem("token"),
  },
  name: "auth",
  reducers: {
    resetUser() {
      window.localStorage.removeItem("token");

      return { token: "" };
    },
    setUser(state, action: PayloadAction<AuthResponse>) {
      window.localStorage.setItem("token", action.payload.token);
      state = action.payload;
      authApi.util.updateQueryData("me", undefined, undefined);
    },
  },
});

export const { resetUser, setUser } = authSlice.actions;
