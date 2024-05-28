import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthFormProps } from "../../utils/types/props";
import { AuthData } from "../../utils/types/auth";
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
import { useToggle } from "../../hooks/useToggle";

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  text,
  isPending,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useToggle();

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
        FeeD<span style={{ color: "#1976d2" }}>R</span>
      </Typography>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ fontSize: { xs: 28, md: 34 }, mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {text}
      </Typography>

      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="text"
            sx={{ bgcolor: "background.paper" }}
            {...register("email", { required: true })}
          />

          {errors.email && (
            <Typography
              fontSize={12}
              color="error"
              textAlign="left"
              sx={{ mt: 1 }}
            >
              {errors.email?.message}
            </Typography>
          )}
        </Box>

        {title === "Register" && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              type="text"
              sx={{ bgcolor: "background.paper" }}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Typography
                fontSize={12}
                color="error"
                textAlign="left"
                sx={{ mt: 1 }}
              >
                {errors.name?.message}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={setShowPassword}
                    edge="end"
                    data-testid="toggle-password"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: "background.paper" }}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <Typography
              fontSize={12}
              color="error"
              textAlign="left"
              sx={{ mt: 1 }}
            >
              {errors.password?.message}
            </Typography>
          )}
        </Box>

        <LoadingButton
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          loading={isPending}
          sx={{ mb: 1 }}
        >
          {title === "Register" ? "Register" : "Login"}
        </LoadingButton>

        <Typography variant="subtitle1">
          {title === "Register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={title === "Register" ? "/login" : "/register"}>
            <Typography variant="subtitle1" color="info.main" component="span">
              {title === "Register" ? "Login" : "Register"}
            </Typography>
          </Link>
        </Typography>
      </form>
    </Box>
  );
};
