import { z } from "zod";

const minLengthErrorMessage = "Password must be at least 8 characters long";
const maxLengthErrorMessage = "Password must be at most 20 characters long";
const uppercaseErrorMessage =
  "Password must contain at least one uppercase letter";
const lowercaseErrorMessage =
  "Password must contain at least one lowercase letter";
const numberErrorMessage = "Password must contain at least one number";
const specialCharacterErrorMessage =
  "Password must contain at least one special character";

/**
 * @description Schema for password validation
 */
export const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

/**
 *  @description Schema for signing in
 * @example
 * ```ts
 * const data = signInSchema.parse({
 *  email: "john.doe@example.com",
 *  password: "password123",
 * });
 */
export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

/**
 * @description Schema for signing up
 * @example
 * ```ts
 * const data = signUpSchema.parse({
 *  name: "John Doe",
 *  email: "john.doe@example.com",
 *  password: "password123",
 * });
 * ```
 */
export const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});
