import * as Yup from "yup";
// bcrypt considers only the first 72 UTF-8 bytes.
export const password = (minimum: number) =>
  Yup.string()
    .required("Password is required")
    .min(minimum, `Password must be at least ${minimum} characters`)
    .test("utf8-length", "Password must not exceed 72 UTF-8 bytes", (value) => {
      if (!value) return true;
      return new Blob([value]).size <= 72;
    });
