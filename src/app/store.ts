import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { api } from "./services";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer, { logout, setUser } from "../features/auth/authSlice";
import {
  clearSessionStorage,
  persistSession,
} from "../features/auth/authStorage";
export const createAppStore = () => {
  const listener = createListenerMiddleware();
  const appStore = configureStore({
    reducer: { [api.reducerPath]: api.reducer, auth: authReducer },
    middleware: (defaults) =>
      defaults().prepend(listener.middleware).concat(api.middleware),
  });
  listener.startListening({
    matcher: isAnyOf(logout, setUser),
    effect: (action, effect) => {
      const before = effect.getOriginalState() as RootState;
      const after = effect.getState() as RootState;
      if (logout.match(action)) clearSessionStorage();
      if (setUser.match(action)) persistSession(action.payload);
      if (before.auth.revision !== after.auth.revision) {
        appStore
          .dispatch(api.util.getRunningQueriesThunk())
          .forEach((query) => query.abort());
        appStore
          .dispatch(api.util.getRunningMutationsThunk())
          .forEach((mutation) => mutation.abort());
        appStore.dispatch(api.util.resetApiState());
      }
    },
  });
  return appStore;
};
export const store = createAppStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
