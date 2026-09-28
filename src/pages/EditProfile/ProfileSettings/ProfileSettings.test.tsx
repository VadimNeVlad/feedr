import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ProfileSettings } from "./ProfileSettings";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "../../../features/users/usersApi";

jest.mock("../../../features/users/usersApi", () => ({
  useGetCurrentUserQuery: jest.fn(),
  useUpdateUserMutation: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const user = {
  id: "author", name: "Original name", email: "author@example.com",
  createdAt: "2024-01-01", _count: { articles: 0, comments: 0 },
};
const update = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useGetCurrentUserQuery as jest.Mock).mockReturnValue({ currentData: user });
  (useUpdateUserMutation as jest.Mock).mockReturnValue([update, { isLoading: false }]);
});

test("keeps unsaved input across background refreshes and refresh errors", async () => {
  const { rerender } = render(<ProfileSettings />);
  const name = screen.getByRole("textbox", { name: "Name" });
  await userEvent.clear(name);
  await userEvent.type(name, "Unsaved name");

  (useGetCurrentUserQuery as jest.Mock).mockReturnValue({
    currentData: { ...user, name: "Updated on server" },
  });
  rerender(<ProfileSettings />);
  expect(name).toHaveValue("Unsaved name");

  (useGetCurrentUserQuery as jest.Mock).mockReturnValue({
    currentData: user, isError: true, error: { status: 500 },
  });
  rerender(<ProfileSettings />);
  expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Unsaved name");
  expect(screen.getByRole("alert")).toBeInTheDocument();
});

test("uses the confirmed server response as the saved form state", async () => {
  update.mockReturnValue({
    unwrap: () => Promise.resolve({ ...user, name: "Saved name" }),
  });
  render(<ProfileSettings />);
  const name = screen.getByRole("textbox", { name: "Name" });
  await userEvent.clear(name);
  await userEvent.type(name, "  Saved name  ");
  const save = screen.getByRole("button", { name: "Save profile information" });
  await userEvent.click(save);

  await waitFor(() => expect(save).toBeDisabled());
  expect(name).toHaveValue("Saved name");
  expect(update).toHaveBeenCalledWith({
    name: "Saved name", websiteUrl: "", location: "", bio: "",
  });
});
