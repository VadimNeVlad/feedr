import { waitFor } from "@testing-library/react";
import { createAppStore } from "../../app/store";
import { api } from "../../app/services";
import { articlesApi } from "./articlesApi";
import { tagsApi } from "../tags/tagsApi";

const mockRequest = jest.fn();

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery:
    () =>
    (...args: unknown[]) =>
      mockRequest(...args),
}));

const article = (id: string, favorited = false) => ({
  id,
  isFavorited: favorited,
  _count: { comments: 0, favorited: favorited ? 1 : 0 },
});

test("favoriting patches cached feeds without refetching them", async () => {
  const store = createAppStore();

  mockRequest.mockImplementation((args) => {
    const { url, method, params } =
      typeof args === "string" ? { url: args, method: "GET", params: {} } : args;
    if (method === "POST") return Promise.resolve({ data: article("b", true) });
    if (url === "tags/react") {
      return Promise.resolve({
        data: { articles: [article("b")], _count: { articles: 1 } },
      });
    }
    const articles =
      url === "articles/b"
        ? article("b")
        : { articles: [article(params.page === 0 ? "a" : "b")], _count: 2 };

    return Promise.resolve({ data: articles });
  });

  const subscriptions = [
    store.dispatch(articlesApi.endpoints.getArticles.initiate({ page: 0 })),
    store.dispatch(articlesApi.endpoints.getArticles.initiate({ page: 1 })),
    store.dispatch(articlesApi.endpoints.getSingleArticle.initiate("b")),
    store.dispatch(
      tagsApi.endpoints.getTagArticles.initiate({ tagName: "react" }),
    ),
    store.dispatch(articlesApi.endpoints.getReadingList.initiate({ page: 0 })),
  ];

  try {
    await Promise.all(subscriptions.map((request) => request.unwrap()));
    mockRequest.mockClear();

    await store
      .dispatch(articlesApi.endpoints.favoriteArticle.initiate("b"))
      .unwrap();

    await waitFor(() =>
      expect(mockRequest.mock.calls.map(([request]) => request.url ?? request)).toEqual([
        "articles/b/favorite",
        "articles/user/reading-list",
      ]),
    );

    const state = store.getState();
    const favorited = [
      articlesApi.endpoints.getArticles.select({ page: 1 })(state).data
        ?.articles[0],
      articlesApi.endpoints.getSingleArticle.select("b")(state).data,
      tagsApi.endpoints.getTagArticles.select({ tagName: "react" })(state).data
        ?.articles[0],
    ];

    favorited.forEach((cached) => {
      expect(cached?.isFavorited).toBe(true);
      expect(cached?._count.favorited).toBe(1);
    });
    expect(
      articlesApi.endpoints.getArticles.select({ page: 0 })(state).data
        ?.articles[0].isFavorited,
    ).toBe(false);
  } finally {
    subscriptions.forEach((request) => request.unsubscribe());
    store.dispatch(api.util.resetApiState());
  }
});
