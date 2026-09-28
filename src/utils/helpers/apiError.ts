export function apiErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object")
    return "Something went wrong. Please try again.";
  const value = error as {
    status?: number | string;
    data?: { message?: unknown };
    message?: string;
  };
  const message = value.data?.message;
  if (Array.isArray(message))
    return message.filter((item) => typeof item === "string").join(". ");
  if (typeof message === "string") return message;
  if (value.status === "FETCH_ERROR" || value.status === "TIMEOUT_ERROR")
    return "Unable to connect. Check your connection and try again.";
  if (value.status === 401) return "Please sign in again.";
  if (value.status === 403)
    return "You do not have permission to perform this action.";
  if (value.status === 404) return "This resource could not be found.";
  return value.message || "Something went wrong. Please try again.";
}
