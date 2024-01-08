import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthFormProps } from "../../features/types/props";
import { AuthData } from "../../features/types/auth";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  text,
  isPending,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AuthData>();

  return (
    <>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{text}</Typography>

      <form onSubmit={onSubmit}>
        <div className="form-field">
          <TextField
            label="Email"
            variant="outlined"
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>

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

        <div className="form-field">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>

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
