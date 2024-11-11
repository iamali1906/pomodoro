import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "email field is a required field" })
    .email(),
  password: z.string().min(4, { message: "at least 4 charater are required " }),
});

export const signupSchema = z.object({
  username: z.string().min(1, { message: "first name is a required  field" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "email field is a required field" })
    .email(),
  password: z.string().min(4, { message: "at least 4 charater are required " }),
});

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "atleast 5 characters required" })
    .max(15, { message: "maximium 15 character required" }),
  description: z
    .string()
    .min(20, { message: "atleast 20 characters required" })
    .max(50, { message: "maximium 50 character required" }),
  status: z.enum(["pending", "in_progress", "completed"]),
});
