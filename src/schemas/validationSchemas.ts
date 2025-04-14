import { z } from "zod";

// sign up
export const signUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .optional(),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
});
export type SignUpType = z.infer<typeof signUpSchema>;

// sign in
export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
export type SignInType = z.infer<typeof signInSchema>;
