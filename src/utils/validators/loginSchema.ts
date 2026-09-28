import * as Yup from "yup";
import { password } from "./password";
export const loginSchema = Yup.object({
  password: password(6),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .max(254)
    .required("Email is required"),
});
