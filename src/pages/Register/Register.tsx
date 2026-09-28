import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useStartSession } from "../../hooks/useStartSession";
import { apiErrorMessage } from "../../utils/helpers/apiError";
import { registerSchema } from "../../utils/validators/registerSchema";
import { AuthData } from "../../utils/types/auth";

export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const startSession = useStartSession();
  const methods = useForm<AuthData>({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data: AuthData) => {
    try {
      startSession(await register(data).unwrap());
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <AuthForm
        mode="register"
        isPending={isLoading}
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};
