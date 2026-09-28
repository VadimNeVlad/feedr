import { registerSchema } from "./registerSchema";
import { changePasswordSchema } from "./changePasswordSchema";

const account = { name: "Alice", email: "alice@example.com" };

test("requires ten characters for a new password", async () => {
  await expect(registerSchema.validate({ ...account, password: "123456789" })).rejects.toThrow("at least 10");
  await expect(registerSchema.validate({ ...account, password: "1234567890" })).resolves.toBeDefined();
});

test("rejects passwords exceeding bcrypt's UTF-8 limit", async () => {
  await expect(registerSchema.validate({ ...account, password: "🙂".repeat(19) })).rejects.toThrow("72 UTF-8 bytes");
  await expect(registerSchema.validate({ ...account, password: "🙂".repeat(18) })).resolves.toBeDefined();
});

test("keeps legacy current passwords valid but enforces the new password policy", async () => {
  await expect(changePasswordSchema.validate({
    currentPassword: "old123", newPassword: "secure-password", confirmPassword: "secure-password",
  })).resolves.toBeDefined();
});
