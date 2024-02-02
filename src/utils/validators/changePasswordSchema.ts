import * as Yup from "yup";

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
