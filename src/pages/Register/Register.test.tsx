import { render, screen, waitFor } from "@testing-library/react";
import { Register } from "./Register";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { useRegisterMutation } from "../../features/auth/authApi";

jest.mock("../../features/auth/authApi", () => ({
  useRegisterMutation: jest.fn(() => [
    jest.fn(),
    { data: null, isSuccess: false, isLoading: false, error: null },
  ]),
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
  ToastContainer: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

test("submit register form with valid data", async () => {
  const handleSubmit = jest.fn();
  (useRegisterMutation as jest.Mock).mockReturnValue([
    handleSubmit,
    { data: null, isSuccess: false, isLoading: false, error: null },
  ]);

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const nameInput = screen.getByLabelText("Full Name");
  const submitBtn = screen.getByRole("button", { name: /register/i });

  await userEvent.type(emailInput, "test@example.com");
  await userEvent.type(passwordInput, "test123");
  await userEvent.type(nameInput, "test");

  await userEvent.click(submitBtn);

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "test123",
      name: "test",
    });
  });
});

test("shows error message for invalid email", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText("Email"), "invalid-email");
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText("Email must be a valid email")
  ).toBeInTheDocument();
});

test("shows error message for password with length less than 6", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText("Password"), "12345");
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText("Password must be at least 6 characters")
  ).toBeInTheDocument();
});

test("shows error message for fullname with length less than 3", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText("Full Name"), "te");
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(
    await screen.findByText("Full name must be at least 3 characters")
  ).toBeInTheDocument();
});
