import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  name: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
});
