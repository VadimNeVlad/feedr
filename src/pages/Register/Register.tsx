import React, { useEffect } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../features/auth/authApi";
import { setUser } from "../../features/auth/authSlice";
import { AuthData } from "../../features/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validators/registerSchema";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { data, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const methods = useForm<AuthData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: AuthData) => {
    register(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <AuthForm
        title="Register"
        text="Please fill out the form below to login"
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};
