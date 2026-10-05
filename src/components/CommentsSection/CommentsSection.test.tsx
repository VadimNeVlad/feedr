import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CommentsSection } from "./CommentsSection";
import { useGetCommentsQuery } from "../../features/comments/commentsApi";

jest.mock("../../features/comments/commentsApi", () => ({
  useGetCommentsQuery: jest.fn(),
}));
jest.mock("../CommentForm/CommentForm", () => ({ CommentForm: () => null }));
jest.mock("../CommentItem/CommentItem", () => ({ CommentItem: () => null }));

test("requests only a valid page after deletion and stays there when count grows", async () => {
  const query = useGetCommentsQuery as jest.Mock;
  query.mockReturnValue({ currentData: [], isFetching: false });
  const { rerender } = render(<CommentsSection id="article" count={41} />);
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByText("Page 3 of 3")).toBeInTheDocument();

  query.mockClear();
  rerender(<CommentsSection id="article" count={20} />);

  expect(query.mock.calls.length).toBeGreaterThan(0);
  expect(query.mock.calls.every(([args]) => args.page === 0)).toBe(true);

  rerender(<CommentsSection id="article" count={41} />);
  expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
});
