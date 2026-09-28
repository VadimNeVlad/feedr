import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ArticleForm } from "./ArticleForm";
import { Article } from "../../utils/types/articles";
import { EditorProps } from "../Editor/Editor";

let mockUserId = "author";

jest.mock("react-redux", () => ({ useSelector: () => mockUserId }));
jest.mock("../../features/tags/tagsApi", () => ({
  useGetTagsQuery: () => ({ data: [] }),
}));
jest.mock("../Editor/Editor", () => ({
  Editor: ({ content, setContent }: EditorProps) => (
    <textarea
      aria-label="Article body"
      value={content}
      onChange={(event) => setContent?.(event.target.value)}
    />
  ),
}));

const article: Article = {
  id: "article",
  slug: "original-title",
  title: "Original title",
  body: "Original body",
  image: "",
  tagList: [],
  authorId: "author",
  author: { id: "author", name: "Author", createdAt: "2024-01-01" },
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
  isFavorited: false,
  _count: { comments: 0, favorited: 0 },
};
const draftKey = "feedr:draft:author:article";
const save = jest.fn();
const onSaved = jest.fn();

beforeEach(() => {
  localStorage.clear();
  mockUserId = "author";
  save.mockReset().mockResolvedValue(article);
  onSaved.mockClear();
});

test("preserves intentionally empty article text when restoring a draft", async () => {
  localStorage.setItem(draftKey, JSON.stringify({
    title: article.title, content: "", tagList: [],
  }));

  render(<ArticleForm article={article} save={save} onSaved={onSaved} />);

  expect(screen.getByLabelText("Article body")).toHaveValue("");
  // Stays disabled after the initial async validation settles.
  await act(() => Promise.resolve());
  expect(screen.getByRole("button", { name: "Update article" })).toBeDisabled();
});

test("restored title changes can be saved and warn before leaving", async () => {
  localStorage.setItem(draftKey, JSON.stringify({
    title: "Draft title", content: article.body, tagList: [],
  }));
  render(<ArticleForm article={article} save={save} onSaved={onSaved} />);
  const button = screen.getByRole("button", { name: "Update article" });
  await waitFor(() => expect(button).toBeEnabled());

  const leaving = new Event("beforeunload", { cancelable: true });
  window.dispatchEvent(leaving);
  expect(leaving.defaultPrevented).toBe(true);

  await userEvent.click(button);
  expect(save).toHaveBeenCalledTimes(1);
  expect(save.mock.calls[0][0].get("title")).toBe("Draft title");

  // The draft is cleared before onSaved, so the page may navigate away at once.
  await waitFor(() => expect(onSaved).toHaveBeenCalledWith(article));
  expect(localStorage.getItem(draftKey)).toBeNull();

  const saved = new Event("beforeunload", { cancelable: true });
  window.dispatchEvent(saved);
  expect(saved.defaultPrevented).toBe(false);
});

test("keeps the draft and stays on the form when saving fails", async () => {
  localStorage.setItem(draftKey, JSON.stringify({
    title: "Draft title", content: article.body, tagList: [],
  }));
  save.mockRejectedValue({ status: 500, data: { message: "Server error" } });
  render(<ArticleForm article={article} save={save} onSaved={onSaved} />);
  const button = screen.getByRole("button", { name: "Update article" });
  await waitFor(() => expect(button).toBeEnabled());

  await userEvent.click(button);

  await waitFor(() => expect(button).toBeEnabled());
  expect(onSaved).not.toHaveBeenCalled();
  expect(JSON.parse(localStorage.getItem(draftKey)!).title).toBe("Draft title");
});

test("removes a draft when all changes are reverted", async () => {
  localStorage.setItem(draftKey, JSON.stringify({
    title: "Draft title", content: article.body, tagList: [],
  }));
  render(<ArticleForm article={article} save={save} onSaved={onSaved} />);

  const title = screen.getByRole("textbox", { name: "Title" });
  await userEvent.clear(title);
  await userEvent.type(title, article.title);

  await waitFor(() => expect(localStorage.getItem(draftKey)).toBeNull());
  expect(screen.getByRole("button", { name: "Update article" })).toBeDisabled();
});

test("loads the new account's draft without copying the previous account's input", async () => {
  const { rerender } = render(
    <ArticleForm save={save} onSaved={onSaved} />,
  );
  await userEvent.type(screen.getByRole("textbox", { name: "Title" }), "Private draft");

  mockUserId = "other";
  rerender(<ArticleForm save={save} onSaved={onSaved} />);

  expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue("");
  expect(localStorage.getItem("feedr:draft:other:new")).toBeNull();
  expect(JSON.parse(localStorage.getItem("feedr:draft:author:new")!).title)
    .toBe("Private draft");
});
