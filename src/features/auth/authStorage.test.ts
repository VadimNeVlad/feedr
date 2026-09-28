import { clearSessionStorage, readSession } from "./authStorage";

beforeEach(() => localStorage.clear());

test("recovers malformed persisted data and preserves unrelated storage", () => {
  localStorage.setItem("user", "{bad");
  localStorage.setItem("token", "old");
  localStorage.setItem("refreshToken", "old-refresh");
  localStorage.setItem("theme", "dark");

  expect(readSession()).toEqual({ user: null, token: null, revision: 0 });
  expect(localStorage.getItem("token")).toBeNull();
  expect(localStorage.getItem("theme")).toBe("dark");
});

test("clears only session keys", () => {
  localStorage.setItem("theme", "dark");
  clearSessionStorage();
  expect(localStorage.getItem("theme")).toBe("dark");
});
