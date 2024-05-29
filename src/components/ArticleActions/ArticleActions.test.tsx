import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ArticleActions } from "./ArticleActions";
import "@testing-library/jest-dom";

const mockProps = {
  articleId: "article123",
  isDeleting: false,
  deleteArticleSuccess: false,
  setOpen: jest.fn(),
};

test("renders ArticleActions component correctly", () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: /edit article/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /delete article/i })
  ).toBeInTheDocument();
});

test("redirect to correct page when edit button is clicked", async () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} />
    </MemoryRouter>
  );

  const editLink = screen.getByRole("link", { name: /edit article/i });
  expect(editLink).toHaveAttribute(
    "href",
    `/edit-article/${mockProps.articleId}`
  );
});

test("calls setOpen function when Delete Article button is clicked", async () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} />
    </MemoryRouter>
  );

  await userEvent.click(
    screen.getByRole("button", { name: /delete article/i })
  );
  expect(mockProps.setOpen).toHaveBeenCalledTimes(1);
});

test("disables 'Delete Article' button when deletion is ongoing", async () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} isDeleting />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("button", { name: /delete article/i })
  ).toBeDisabled();
});

test("disables 'Delete Article' button when deletion is ongoing", async () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} isDeleting />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("button", { name: /delete article/i })
  ).toBeDisabled();
});

test("disables 'Delete Article' button when deletion is successful", async () => {
  render(
    <MemoryRouter>
      <ArticleActions {...mockProps} deleteArticleSuccess />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("button", { name: /delete article/i })
  ).toBeDisabled();
});
