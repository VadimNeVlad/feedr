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
  (useLoginMutation as jest.Mock).mockReturnValue([
    handleSubmit,
    { data: null, isSuccess: false, isLoading: false, error: null },
  ]);

  render(
    <MemoryRouter>
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
  });
});
