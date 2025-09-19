"use server";

import { z } from "zod";

import * as sdk from "@/backend/sdk.gen";

export type FormState =
  | {
      message: string;
      error: boolean;
    }
  | undefined;

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(4, "Username must contain at least 4 characters")
    .regex(/^[^\s]+$/, "Username cannot contain spaces"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

export async function createUser(
  state: FormState,
  form: FormData
): Promise<FormState> {
  //await new Promise((resolve) => setTimeout(resolve, 100));

  const r = loginSchema.safeParse({
    username: form.get("username"),
    password: form.get("password"),
  });

  if (!r.success) {
    return {
      message: r.error.issues[0].message,
      error: true,
    };
  }

  const apiRes = await sdk.createUser({
    body: r.data,
  });

  //await new Promise((resolve) => setTimeout(resolve, 300));

  if (apiRes.error) {
    return {
      error: true,
      message: `Failed to create user: ${
        apiRes.error.detail?.toString() ?? "Unknown error"
      }`,
    };
  }

  return {
    error: false,
    message: `Success! Created user "${apiRes.data.username}" (${apiRes.data.id})`,
  };
}
