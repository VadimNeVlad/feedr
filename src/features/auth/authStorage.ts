import { AuthResponse, AuthState } from "../../utils/types/auth";
const keys = ["user", "token", "refreshToken"];
export function clearSessionStorage() {
  try {
    keys.forEach((key) => localStorage.removeItem(key));
  } catch {
    /* Storage may be disabled. */
  }
}
export function readSession(): AuthState {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");
    if (
      user &&
      typeof user.id === "string" &&
      typeof user.name === "string" &&
      token
    )
      return { user, token, revision: 0 };
  } catch {
    /* Recover a damaged session. */
  }
  clearSessionStorage();
  return { user: null, token: null, revision: 0 };
}
export function refreshToken() {
  try {
    return localStorage.getItem("refreshToken");
  } catch {
    return null;
  }
}
export function persistSession(data: AuthResponse) {
  try {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  } catch {
    clearSessionStorage();
  }
}
