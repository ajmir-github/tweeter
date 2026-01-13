import LocalToken from "@/utils/LocalToken";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../services/types";

// Define a type for the slice state
type AuthState = {
  user: User | null;
};

export default createSlice({
  name: "auth",
  initialState: {
    user: null,
  } as AuthState,
  reducers: {
    signIn(state, action: PayloadAction<{ user: User; token: string }>) {
      LocalToken.set(action.payload.token);
      state.user = action.payload.user;
    },
    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      LocalToken.clear();
      state.user = null;
    },
  },
});
