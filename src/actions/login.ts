"use server";

import { z } from "zod";

import * as sdk from "@/backend/sdk.gen";
import { redirect } from "next/navigation";

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

export type LoginFormState = {
  errors?: { form?: string[] };
  success?: boolean;
};

export async function login(
  _: LoginFormState | undefined,
  form: FormData
): Promise<LoginFormState> {
  const r = loginSchema.safeParse({
    username: form.get("username"),
    password: form.get("password"),
  });

  //await new Promise((resolve) => setTimeout(resolve, 300));

  if (!r.success) {
    return {
      errors: { form: r.error.issues.map((i) => i.message) },
    };
  }

  const res = await sdk.loginUser({
    body: r.data,
  });

  if (res.error) {
    return {
      errors: { form: [res.error.detail?.toString() ?? "Unknown error"] },
    };
  }

  redirect("/app/users");

  return { success: true };
}
