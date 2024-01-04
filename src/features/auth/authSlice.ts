import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, AuthState } from "../types/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
