import { SetResponse } from "@project/meta";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  initialState: [],
  name: "basketSlice",
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
