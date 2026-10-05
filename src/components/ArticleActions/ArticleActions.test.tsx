import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ArticleActions } from "./ArticleActions";
import "@testing-library/jest-dom";

const renderActions = (isDeleting = false) => {
  const onDelete = jest.fn();

  render(
    <MemoryRouter>
      <ArticleActions
        articleId="article123"
        isDeleting={isDeleting}
        onDelete={onDelete}
      />
    </MemoryRouter>,
  );

  return onDelete;
};

test("links to the edit page", () => {
  renderActions();

  expect(screen.getByRole("link", { name: /edit article/i })).toHaveAttribute(
    "href",
    "/edit-article/article123",
  );
});

test("asks for delete confirmation when Delete Article is clicked", async () => {
  const onDelete = renderActions();

  await userEvent.click(screen.getByRole("button", { name: /delete article/i }));

  expect(onDelete).toHaveBeenCalledTimes(1);
});

test("disables both actions while deletion is in progress", () => {
  renderActions(true);

  expect(screen.getByRole("button", { name: /delete article/i })).toBeDisabled();
  expect(screen.getByRole("link", { name: /edit article/i })).toHaveAttribute(
    "aria-disabled",
    "true",
  );
});
