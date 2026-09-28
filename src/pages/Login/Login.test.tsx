import { render, screen, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import "@testing-library/jest-dom";

jest.mock("../../features/auth/authApi", () => ({
  useLoginMutation: jest.fn(() => [
    jest.fn(),
    { data: null, isSuccess: false, isLoading: false, error: null },
  ]),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), success: jest.fn() },
}));

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

test("submit login form with valid data and return to the requested page", async () => {
  const session = { user: { id: "1" }, accessToken: "a", refreshToken: "r" };
  const handleSubmit = jest.fn(() => ({ unwrap: () => Promise.resolve(session) }));
  (useLoginMutation as jest.Mock).mockReturnValue([
    handleSubmit,
    { data: null, isSuccess: false, isLoading: false, error: null },
  ]);

  render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/login", state: { from: { pathname: "/reading-list", search: "" } } },
      ]}
    >
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /login/i });

  await userEvent.type(emailInput, "test@example.com");
  await userEvent.type(passwordInput, "test123");

  await userEvent.click(submitBtn);

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "test123",
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ payload: session }),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/reading-list", { replace: true });
  });
});

test("shows error message for invalid email", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText("Email"), "invalid-email");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(
    await screen.findByText("Email must be a valid email")
  ).toBeInTheDocument();
});

test("shows error message for password with length less than 6", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText("Password"), "12345");
  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(
    await screen.findByText("Password must be at least 6 characters")
  ).toBeInTheDocument();
});
