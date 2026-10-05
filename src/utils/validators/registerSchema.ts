import * as Yup from "yup";
import { password } from "./password";
export const registerSchema = Yup.object({
  password: password(10),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .max(254)
    .required("Email is required"),
  name: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100)
    .required("Full name is required"),
});
