import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, AuthState } from "../../utils/types/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")!) || null,
    token: localStorage.getItem("token") || null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
