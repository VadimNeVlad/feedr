import { waitFor } from "@testing-library/react";
import { createAppStore } from "../../app/store";
import { api } from "../../app/services";
import { articlesApi } from "../articles/articlesApi";
import { commentsApi } from "../comments/commentsApi";
import { followsApi } from "../follows/followsApi";
import { usersApi } from "./usersApi";

const mockRequest = jest.fn();

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery:
    () =>
    (...args: unknown[]) =>
      mockRequest(...args),
}));

test.each(["name", "image"] as const)(
  "refreshes related author caches after changing %s",
  async (field) => {
    const store = createAppStore();
    let author = { id: "author", name: "Original", image: "old.png" };
    const expected = field === "name" ? "Updated" : "new.png";

    mockRequest.mockReset();
    mockRequest.mockImplementation(({ url, method }) => {
      if (method === "PUT") {
        author = { ...author, [field]: expected };
        return Promise.resolve({ data: author });
      }

      const data =
        url === "articles"
          ? { articles: [{ id: "article", author }], _count: 1 }
          : url === "comments/article"
            ? [{ id: "comment", author }]
            : [{ following: author }];

      return Promise.resolve({ data });
    });

    const subscriptions = [
      store.dispatch(articlesApi.endpoints.getArticles.initiate({})),
      store.dispatch(
        commentsApi.endpoints.getComments.initiate({ id: "article" })
      ),
      store.dispatch(
        followsApi.endpoints.getFollowings.initiate({ id: "reader" })
      ),
    ];

    try {
      await Promise.all(subscriptions.map((request) => request.unwrap()));
      const updated =
        field === "name"
          ? store.dispatch(
              usersApi.endpoints.updateUser.initiate({ name: expected })
            )
          : store.dispatch(
              usersApi.endpoints.updateUserAvatar.initiate(new FormData())
            );
      await updated.unwrap();
      // Invalidation refetches in the background; wait until every related cache is fresh.
      await waitFor(() => {
        const state = store.getState();
        expect(
          articlesApi.endpoints.getArticles.select({})(state).data?.articles[0]
            .author[field]
        ).toBe(expected);
        expect(
          commentsApi.endpoints.getComments.select({ id: "article" })(state)
            .data?.[0].author[field]
        ).toBe(expected);
        expect(
          followsApi.endpoints.getFollowings.select({ id: "reader" })(state)
            .data?.[0].following[field]
        ).toBe(expected);
      });
    } finally {
      subscriptions.forEach((request) => request.unsubscribe());
      store.dispatch(api.util.resetApiState());
    }
  }
);
