import React, { useEffect } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validators/loginSchema";
import { AuthData } from "../../features/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../features/auth/authApi";
import { setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { data, isSuccess, error }] = useLoginMutation();

  const methods = useForm<Omit<AuthData, "name">>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success("Login successful");
      methods.reset();
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
    }
  }, [isSuccess, navigate, error, methods]);

  const onSubmit = (data: Omit<AuthData, "name">) => {
    login(data);
  };

  return (
    <FormProvider {...methods}>
      <AuthForm
        title="Login"
        text="Login to your account"
        onSubmit={methods.handleSubmit(onSubmit)}
      />

      <ToastContainer />
    </FormProvider>
  );
};
