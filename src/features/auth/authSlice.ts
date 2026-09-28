import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../../utils/types/auth";
import { readSession } from "./authStorage";
const authSlice = createSlice({
  name: "auth",
  initialState: readSession(),
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      if (state.user?.id !== action.payload.user.id) state.revision += 1;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.revision += 1;
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
