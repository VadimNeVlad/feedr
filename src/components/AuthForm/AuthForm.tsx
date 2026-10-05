import { FormEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthData } from "../../utils/types/auth";
import { useToggle } from "../../hooks/useToggle";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const copy = {
  login: {
    title: "Login",
    text: "Login to your account",
    switchText: "Don't have an account? ",
    switchLink: { to: "/register", label: "Register" },
    passwordAutoComplete: "current-password",
  },
  register: {
    title: "Register",
    text: "Create your account",
    switchText: "Already have an account? ",
    switchLink: { to: "/login", label: "Login" },
    passwordAutoComplete: "new-password",
  },
};

export const AuthForm = ({ mode, isPending, onSubmit }: AuthFormProps) => {
  const [showPassword, toggleShowPassword] = useToggle();
  const { title, text, switchText, switchLink, passwordAutoComplete } =
    copy[mode];
  const {
    register,
    formState: { errors },
  } = useFormContext<AuthData>();

  return (
    <Box
      sx={{
        maxWidth: 550,
        mx: "auto",
        padding: 2,
        textAlign: "center",
        pt: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: 28, md: 34 } }}
      >
        <Link to="/">
          FeeD<Box component="span" sx={{ color: "primary.main" }}>R</Box>
        </Link>
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        fontWeight={700}
        sx={{ fontSize: { xs: 28, md: 34 }, mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {text}
      </Typography>

      <form noValidate onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2, bgcolor: "background.paper" }}
          {...register("email")}
        />

        {mode === "register" && (
          <TextField
            fullWidth
            label="Full Name"
            autoComplete="name"
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2, bgcolor: "background.paper" }}
            {...register("name")}
          />
        )}

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete={passwordAutoComplete}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={toggleShowPassword}
                  edge="end"
                  data-testid="toggle-password"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, bgcolor: "background.paper" }}
          {...register("password")}
        />

        <LoadingButton
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          loading={isPending}
          sx={{ mb: 1 }}
        >
          {title}
        </LoadingButton>

        <Typography variant="subtitle1">
          {switchText}
          <Link to={switchLink.to}>
            <Typography variant="subtitle1" color="info.main" component="span">
              {switchLink.label}
            </Typography>
          </Link>
        </Typography>
      </form>
    </Box>
  );
};
