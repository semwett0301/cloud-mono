import { SetResponse } from "@project/meta";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  initialState: [],
  name: "basketSlice",
  reducers: {
    addItem(state, action: PayloadAction<SetResponse>) {
      state.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      const index = state.findIndex((value) => value.id === action.payload);

      return state.filter((_, idx) => idx !== index);
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
