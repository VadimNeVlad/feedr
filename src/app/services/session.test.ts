import { createAppStore } from "../store";
import { api } from "./index";
import { setUser, logout } from "../../features/auth/authSlice";
import { articlesApi } from "../../features/articles/articlesApi";

const mockRequest = jest.fn();

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: () => (...args: unknown[]) => mockRequest(...args),
}));

const session = (id: string, accessToken = id): Parameters<typeof setUser>[0] => ({
  user: { id, name: id, createdAt: "", _count: { articles: 0, comments: 0 } },
  accessToken, refreshToken: "refresh-" + id,
});

const services = api.injectEndpoints({
  endpoints: build => ({
    sessionProbe: build.query<string, string>({ query: value => value }),
  }),
});

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
};

beforeEach(() => {
  localStorage.clear();
  mockRequest.mockReset();
});

test("clears private cache when logging out and changing account", async () => {
  const store = createAppStore();
  store.dispatch(setUser(session("A")));
  mockRequest.mockResolvedValue({ data: { articles: [{ id: "private-A" }], _count: 1 } });

  const request = store.dispatch(articlesApi.endpoints.getReadingList.initiate({ page: 0 }));
  await request.unwrap();
  localStorage.setItem("unrelated", "keep");
  store.dispatch(logout());
  store.dispatch(setUser(session("B")));

  expect(articlesApi.endpoints.getReadingList.select({ page: 0 })(store.getState()).data).toBeUndefined();
  expect(localStorage.getItem("unrelated")).toBe("keep");
  expect(localStorage.getItem("token")).toBe("B");
  request.unsubscribe();
  store.dispatch(api.util.resetApiState());
});

test("shares one refresh across simultaneous unauthorized requests", async () => {
  const store = createAppStore();
  store.dispatch(setUser(session("A", "expired")));
  const refresh = deferred<{ data: ReturnType<typeof session> }>();

  mockRequest.mockImplementation((args, queryApi) => {
    if (typeof args === "object" && args.url === "auth/refresh-token") return refresh.promise;
    return Promise.resolve(queryApi.getState().auth.token === "expired"
      ? { error: { status: 401, data: { message: "expired" } } }
      : { data: "success" });
  });

  const first = store.dispatch(services.endpoints.sessionProbe.initiate("one"));
  const second = store.dispatch(services.endpoints.sessionProbe.initiate("two"));
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(mockRequest.mock.calls.filter(([args]) => args.url === "auth/refresh-token")).toHaveLength(1);

  refresh.resolve({ data: session("A", "fresh") });
  await expect(first.unwrap()).resolves.toBe("success");
  await expect(second.unwrap()).resolves.toBe("success");
  expect(store.getState().auth.token).toBe("fresh");
  first.unsubscribe();
  second.unsubscribe();
  store.dispatch(api.util.resetApiState());
});

test("late refresh cannot restore a logged-out session", async () => {
  const store = createAppStore();
  store.dispatch(setUser(session("A")));
  const refresh = deferred<{ data: ReturnType<typeof session> }>();
  mockRequest.mockImplementation(args => args.url === "auth/refresh-token"
    ? refresh.promise : Promise.resolve({ error: { status: 401, data: {} } }));

  const request = store.dispatch(services.endpoints.sessionProbe.initiate("late"));
  await new Promise(resolve => setTimeout(resolve, 0));
  store.dispatch(logout());
  refresh.resolve({ data: session("A", "late-token") });
  await request;
  await new Promise(resolve => setTimeout(resolve, 0));

  expect(store.getState().auth.user).toBeNull();
  expect(localStorage.getItem("token")).toBeNull();
  expect(services.endpoints.sessionProbe.select("late")(store.getState()).data).toBeUndefined();
  request.unsubscribe();
  store.dispatch(api.util.resetApiState());
});

test("keeps different searches and pages in separate cache entries", async () => {
  const store = createAppStore();
  mockRequest.mockImplementation(args => Promise.resolve({
    data: { articles: [{ id: args.params.q + args.params.page }], _count: 30 },
  }));
  const params = [{ q: "react", page: 0 }, { q: "react", page: 1 }, { q: "other", page: 0 }];
  const requests = params.map(args => store.dispatch(articlesApi.endpoints.getArticles.initiate(args)));
  await Promise.all(requests.map(request => request.unwrap()));
  expect(params.map(args => articlesApi.endpoints.getArticles.select(args)(store.getState()).data?.articles[0].id))
    .toEqual(["react0", "react1", "other0"]);
  requests.forEach(request => request.unsubscribe());
  store.dispatch(api.util.resetApiState());
});
