import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { createAppStore } from "../../app/store";
import { api } from "../../app/services";
import { Article } from "../../utils/types/articles";
import { ArticleFeed } from "./ArticleFeed";

const mockRequest = jest.fn();

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: () => (...args: unknown[]) => mockRequest(...args),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: jest.fn(), inView: false }),
}));

jest.mock("../ArticleItem/ArticleItem", () => ({
  ArticleItem: ({ article }: { article: Article }) => <div>{article.title}</div>,
}));

jest.mock("../ReadingListItem/ReadingListItem", () => ({
  ReadingListItem: ({ article }: { article: Article }) => (
    <div>{article.title}</div>
  ),
}));

jest.mock("../Skeletons/ArticlesListSkeleton/ArticlesListSkeleton", () => ({
  ArticlesListSkeleton: () => <div role="status">Loading articles</div>,
}));

let store: ReturnType<typeof createAppStore>;

beforeEach(() => {
  localStorage.clear();
  store = createAppStore();
  mockRequest.mockReset();
  mockRequest.mockImplementation(({ url, params }) => {
    const articles = Array.from({ length: params.page === 0 ? 10 : 1 }, (_, i) => {
      const id = `${params.q ?? "article"}-${params.page * 10 + i}`;

      return { id, title: id };
    });

    return Promise.resolve({
      data: { articles, _count: url.startsWith("tags/") ? { articles: 11 } : 11 },
    });
  });
});

afterEach(() => {
  cleanup();
  store.dispatch(api.util.resetApiState());
});

test.each([
  { name: "all articles", feed: <ArticleFeed />, url: "articles" },
  {
    name: "author articles",
    feed: <ArticleFeed kind="author" authorId="author" />,
    url: "articles/author/author",
  },
  {
    name: "tag articles",
    feed: <ArticleFeed kind="tag" tagName="react" />,
    url: "tags/react",
  },
  {
    name: "saved articles",
    feed: <ArticleFeed kind="saved" />,
    url: "articles/user/reading-list",
    button: "Load more saved articles",
  },
])("loads $name without refetching previous pages", async ({
  feed,
  url,
  button = "Load more articles",
}) => {
  render(<Provider store={store}>{feed}</Provider>);
  await screen.findByText("article-0");

  await userEvent.click(screen.getByRole("button", { name: button }));
  await screen.findByText("article-10");

  expect(screen.getByText("article-0")).toBeInTheDocument();
  expect(
    mockRequest.mock.calls.map(([request]) => [request.url, request.params.page]),
  ).toEqual([[url, 0], [url, 1]]);
  expect(screen.queryByRole("button", { name: button })).not.toBeInTheDocument();
});

test("resets loaded pages when search changes", async () => {
  const { rerender } = render(
    <Provider store={store}>
      <ArticleFeed q="react" />
    </Provider>,
  );
  await screen.findByText("react-0");
  await userEvent.click(screen.getByRole("button", { name: "Load more articles" }));
  await screen.findByText("react-10");

  rerender(
    <Provider store={store}>
      <ArticleFeed q="typescript" />
    </Provider>,
  );
  await screen.findByText("typescript-0");

  expect(screen.queryByText("react-0")).not.toBeInTheDocument();
  expect(screen.queryByText("react-10")).not.toBeInTheDocument();
  expect(
    mockRequest.mock.calls.map(([request]) => [
      request.params.q,
      request.params.page,
    ]),
  ).toEqual([["react", 0], ["react", 1], ["typescript", 0]]);
});

test("retries a failed next page while keeping loaded articles", async () => {
  render(
    <Provider store={store}>
      <ArticleFeed />
    </Provider>,
  );
  await screen.findByText("article-0");
  mockRequest.mockResolvedValueOnce({
    error: { status: 500, data: { message: "Request failed" } },
  });

  await userEvent.click(screen.getByRole("button", { name: "Load more articles" }));
  const retry = await screen.findByRole("button", { name: "Try again" });

  expect(screen.getByText("article-0")).toBeInTheDocument();
  await userEvent.click(retry);
  await screen.findByText("article-10");

  expect(mockRequest.mock.calls.map(([request]) => request.params.page)).toEqual([
    0, 1, 1,
  ]);
});

test("does not show an empty-list message for an empty later saved page", async () => {
  render(
    <Provider store={store}>
      <ArticleFeed kind="saved" />
    </Provider>,
  );
  await screen.findByText("article-0");
  mockRequest.mockResolvedValueOnce({ data: { articles: [], _count: 10 } });

  await userEvent.click(
    screen.getByRole("button", { name: "Load more saved articles" }),
  );

  await waitFor(() => {
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  expect(screen.getByText("article-0")).toBeInTheDocument();
  expect(screen.queryByText("No saved articles yet.")).not.toBeInTheDocument();
});
