import { render, screen, waitFor } from "@testing-library/react";
import { AuthForm } from "./AuthForm";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { AuthData } from "../../utils/types/auth";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<AuthData>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <Wrapper>{ui}</Wrapper>
    </BrowserRouter>
  );
};

test("render login form correctly", () => {
  renderWithProviders(
    <AuthForm
      title="Login"
      text="Login to your account"
      isPending={false}
      onSubmit={() => {}}
    />
  );

  expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.queryByLabelText("Full Name")).not.toBeInTheDocument();
});

test("render register form correctly", () => {
  renderWithProviders(
    <AuthForm
      title="Register"
      text="Please fill out the form below to login"
      isPending={false}
      onSubmit={() => {}}
    />
  );

  expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});

test("toggles password visibility", async () => {
  renderWithProviders(
    <AuthForm
      title="Login"
      text="Login to your account"
      isPending={false}
      onSubmit={() => {}}
    />
  );

  const passwordInput = screen.getByLabelText("Password");
  const toggleBtn = screen.getByTestId("toggle-password");

  expect(passwordInput).toHaveAttribute("type", "password");
  await userEvent.click(toggleBtn);
  expect(passwordInput).toHaveAttribute("type", "text");
  await userEvent.click(toggleBtn);
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("submits form with valid data", async () => {
  const handleSubmit = jest.fn();

  renderWithProviders(
    <AuthForm
      title="Login"
      text="Login to your account"
      isPending={false}
      onSubmit={handleSubmit}
    />
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const submitBtn = screen.getByRole("button", { name: /login/i });

  await userEvent.type(emailInput, "test@example.com");
  await userEvent.type(passwordInput, "password123");
  await userEvent.click(submitBtn);

  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password123");

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
