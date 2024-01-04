import { api } from "../../app/services";
import { AuthData, AuthResponse } from "../types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
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

export const { useRegisterMutation, useLoginMutation } = authApi;
