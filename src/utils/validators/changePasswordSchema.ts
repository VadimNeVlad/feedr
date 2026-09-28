import * as Yup from "yup";
import { password } from "./password";
export const changePasswordSchema = Yup.object({
  currentPassword: password(6),
  newPassword: password(10),
  confirmPassword: Yup.string()
    .required("Confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
