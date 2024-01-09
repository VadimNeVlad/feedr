import React, { useEffect, useState } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../features/auth/authApi";
import { setUser } from "../../features/auth/authSlice";
import { AuthData } from "../../utils/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validators/registerSchema";
import { ToastContainer, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import "react-toastify/dist/ReactToastify.css";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  const methods = useForm<AuthData>({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      navigate("/");
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
      setPending(false);
    }
  }, [isSuccess, navigate, error, methods]);

  const onSubmit = (data: AuthData) => {
    register(data);
    setPending(true);
  };

  return (
    <FormProvider {...methods}>
      <AuthForm
        title="Register"
        text="Please fill out the form below to login"
        isPending={pending}
        onSubmit={methods.handleSubmit(onSubmit)}
      />

      <ToastContainer />
    </FormProvider>
  );
};
