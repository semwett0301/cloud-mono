import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SetResponse } from "@project/meta";

export const basketSlice = createSlice({
  name: "basketSlice",
  initialState: [],
  reducers: {
    addItem(state, action: PayloadAction<SetResponse>) {
      state.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state = state.filter((set) => set.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
