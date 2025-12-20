import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import LocalStorage from "../utils/LocalStorage";

// Define a type for the slice state
export interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const localCart = new LocalStorage("cart", initialState);

export const cartSlice = createSlice({
  name: "cart",
  initialState: localCart.get(),
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export default cartSlice;
