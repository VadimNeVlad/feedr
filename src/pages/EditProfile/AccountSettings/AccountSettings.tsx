import React from "react";
import {
  useChangePasswordMutation,
  useGetCurrentUserQuery,
} from "../../../features/users/usersApi";
import { useDelayedRedirect } from "../../../hooks/useDelayedRedirect";
import { ChangePasswordData } from "../../../utils/types/user";
import { useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { changePasswordSchema } from "../../../utils/validators/changePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export const AccountSettings: React.FC = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const [changePassword, { isLoading, isSuccess, error }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(changePasswordSchema),
  });

  useDelayedRedirect(isSuccess, error, "Password changed successfully");

  const onSubmit = (data: ChangePasswordData) => {
    changePassword(data);
  };

  return (
    <>
      {currentUser && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title="Set new password"
              titleTypographyProps={{ variant: "h5", fontWeight: 700, mb: 1 }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Current password"
                  variant="outlined"
                  type="password"
                  {...register("currentPassword")}
                />
                <Typography fontSize={12} color="error" sx={{ mt: 1 }}>
                  {errors.currentPassword?.message}
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="New password"
                  variant="outlined"
                  type="password"
                  {...register("newPassword")}
                />
                <Typography fontSize={12} color="error" sx={{ mt: 1 }}>
                  {errors.newPassword?.message}
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Confirm new password"
                  variant="outlined"
                  type="password"
                  {...register("confirmPassword")}
                />
                <Typography fontSize={12} color="error" sx={{ mt: 1 }}>
                  {errors.confirmPassword?.message}
                </Typography>
              </Box>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isSuccess}
              >
                Set New Password
              </LoadingButton>
            </CardContent>
          </Card>
        </form>
      )}
    </>
  );
};
