import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArticleAuthor } from "./ArticleAuthor";
import "@testing-library/jest-dom";
import { useSelector } from "react-redux";
import { useFollowUser } from "../../hooks/useFollowUser";

jest.mock("../../hooks/useFollowUser", () => ({ useFollowUser: jest.fn() }));
jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
jest.mock("react-router-dom", () => ({ useNavigate: jest.fn(() => jest.fn()) }));

const author = {
  id: "author", name: "John Doe", bio: "Software Engineer", location: "New York",
  createdAt: "2024-05-29T12:00:00Z", _count: { articles: 5, comments: 10 },
};
const toggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useSelector as jest.Mock).mockReturnValue({ id: "reader" });
  (useFollowUser as jest.Mock).mockReturnValue([false, toggle, false]);
});

test("renders the public author contract without followers arrays", () => {
  render(<ArticleAuthor author={author} />);
  expect(screen.getByText(author.name)).toBeInTheDocument();
  expect(screen.getByText("May 29, 2024")).toBeInTheDocument();
});

test("does not offer following yourself", () => {
  (useSelector as jest.Mock).mockReturnValue({ id: author.id });
  render(<ArticleAuthor author={author} />);
  expect(screen.queryByRole("button", { name: "Follow" })).not.toBeInTheDocument();
});

test("uses confirmed state and disables follow while pending", async () => {
  const { rerender } = render(<ArticleAuthor author={author} />);
  await userEvent.click(screen.getByRole("button", { name: "Follow" }));
  expect(toggle).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("button", { name: "Follow" })).toHaveAttribute("aria-pressed", "false");

  (useFollowUser as jest.Mock).mockReturnValue([true, toggle, true]);
  rerender(<ArticleAuthor author={author} />);
  expect(screen.getByRole("button", { name: "Unfollow" })).toBeDisabled();
});
