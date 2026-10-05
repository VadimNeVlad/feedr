import { api } from "../../app/services";
import { AuthData, AuthResponse } from "../../utils/types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    endSession: build.mutation<void, void>({
      query: () => ({ url: "auth/logout", method: "POST" }),
    }),
    register: build.mutation<AuthResponse, AuthData>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<AuthResponse, Omit<AuthData, "name">>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useEndSessionMutation } =
  authApi;
