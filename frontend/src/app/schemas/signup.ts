import * as z from "zod";

export const SignupSchema = z
  .object({
    username: z.string().min(1, {
      message: "username is required",
    }),
    email: z.string().email({
      message: "email is required",
    }),
    password: z.string().min(6, {
      message: "password is required",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
