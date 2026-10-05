import { useChangePasswordMutation } from "../../../features/users/usersApi";
import { ChangePasswordData } from "../../../utils/types/user";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { changePasswordSchema } from "../../../utils/validators/changePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { apiErrorMessage } from "../../../utils/helpers/apiError";

export const AccountSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(changePasswordSchema),
  });
  const onSubmit = async (data: ChangePasswordData) => {
    try {
      await change(data).unwrap();
      dispatch(logout());
      toast.success("Password changed. Please log in again.");
      navigate("/login");
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Set new password" />
        <CardContent>
          {(["currentPassword", "newPassword", "confirmPassword"] as const).map(
            (field) => (
              <TextField
                key={field}
                fullWidth
                type="password"
                label={
                  {
                    currentPassword: "Current password",
                    newPassword: "New password",
                    confirmPassword: "Confirm new password",
                  }[field]
                }
                autoComplete={
                  field === "currentPassword"
                    ? "current-password"
                    : "new-password"
                }
                sx={{ mb: 3 }}
                error={!!errors[field]}
                helperText={errors[field]?.message}
                {...register(field)}
              />
            ),
          )}
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Set new password
          </LoadingButton>
        </CardContent>
      </Card>
    </form>
  );
};
