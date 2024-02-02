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
    <>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{text}</Typography>

      <form onSubmit={onSubmit}>
        <Box className="form-field">
          <TextField
            label="Email"
            variant="outlined"
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </Box>

        {title === "Register" && (
          <div className="form-field">
            <TextField
              label="Full Name"
              variant="outlined"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p>{errors.name?.message}</p>}
          </div>
        )}

        <Box className="form-field">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={setShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </Box>

        <LoadingButton type="submit" variant="contained" loading={isPending}>
          {title === "Register" ? "Register" : "Login"}
        </LoadingButton>

        <Typography variant="subtitle1">
          {title === "Register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={title === "Register" ? "/login" : "/register"}>
            {title === "Register" ? "Login" : "Register"}
          </Link>
        </Typography>
      </form>
    </>
  );
};
