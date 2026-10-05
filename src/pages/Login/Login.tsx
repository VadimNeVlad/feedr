import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useLoginMutation } from "../../features/auth/authApi";
import { useStartSession } from "../../hooks/useStartSession";
import { apiErrorMessage } from "../../utils/helpers/apiError";
import { loginSchema } from "../../utils/validators/loginSchema";
import { AuthData } from "../../utils/types/auth";

type LoginFields = Omit<AuthData, "name">;

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const startSession = useStartSession();
  const methods = useForm<LoginFields>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginFields) => {
    try {
      startSession(await login(data).unwrap());
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <AuthForm
        mode="login"
        isPending={isLoading}
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};
