import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setUser } from "../../features/auth/authSlice";
import { refreshToken } from "../../features/auth/authStorage";
import { AuthResponse } from "../../utils/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "/api/",
  timeout: 15000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

type RefreshState = { revision: number; promise: Promise<boolean> };
const refreshes = new WeakMap<BaseQueryApi["dispatch"], RefreshState>();

const sessionChanged = (): { error: FetchBaseQueryError } => ({
  error: { status: "CUSTOM_ERROR", error: "Session changed" },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, queryApi, options) => {
  const auth = () => (queryApi.getState() as RootState).auth;
  const revision = auth().revision;
  const url = typeof args === "string" ? args : args.url;
  const isAuthRequest = /^auth\/(login|register|refresh-token)$/.test(url);
  let refreshing = refreshes.get(queryApi.dispatch);

  if (!isAuthRequest && refreshing?.revision === revision) {
    await refreshing.promise;
  }

  if (auth().revision !== revision) return sessionChanged();

  const token = auth().token;
  let result = await baseQuery(args, queryApi, options);

  if (auth().revision !== revision) return sessionChanged();

  if (result.error?.status !== 401 || isAuthRequest || !token) return result;

  // Another request may already have rotated the access token.
  if (auth().token !== token) {
    result = await baseQuery(args, queryApi, options);

    return auth().revision === revision ? result : sessionChanged();
  }

  refreshing = refreshes.get(queryApi.dispatch);

  if (refreshing?.revision !== revision) {
    const savedRefreshToken = refreshToken();
    const promise = (async () => {
      if (!savedRefreshToken) {
        queryApi.dispatch(logout());
        return false;
      }

      // A cancelled subscriber must not cancel the shared refresh.
      const controller = new AbortController();
      const refreshed = await baseQuery(
        {
          url: "auth/refresh-token",
          method: "POST",
          body: { refreshToken: savedRefreshToken },
        },
        {
          ...queryApi,
          signal: controller.signal,
          abort: () => controller.abort(),
        },
        options,
      );

      if (auth().revision !== revision) return false;

      if (refreshed.data) {
        queryApi.dispatch(setUser(refreshed.data as AuthResponse));
        return true;
      }

      if (refreshed.error?.status === 401 || refreshed.error?.status === 400) {
        queryApi.dispatch(logout());
      }

      return false;
    })();

    refreshing = { revision, promise };
    refreshes.set(queryApi.dispatch, refreshing);

    const cleanup = () => {
      if (refreshes.get(queryApi.dispatch)?.promise === promise) {
        refreshes.delete(queryApi.dispatch);
      }
    };

    void promise.then(cleanup, cleanup);
  }

  const succeeded = await refreshing.promise;

  if (auth().revision !== revision) return sessionChanged();

  if (succeeded) result = await baseQuery(args, queryApi, options);

  if (auth().revision !== revision) return sessionChanged();

  if (result.error?.status === 401 && succeeded) queryApi.dispatch(logout());

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Article", "User", "Comment", "Follow", "Tag"],
  endpoints: () => ({}),
});
