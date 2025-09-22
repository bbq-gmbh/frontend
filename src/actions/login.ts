"use server";

import { z } from "zod";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import * as sdk from "@/backend/sdk.gen";

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
  redirectPath: string | undefined,
  _: LoginFormState | undefined,
  form: FormData
): Promise<LoginFormState> {
  const r = loginSchema.safeParse({
    username: form.get("username"),
    password: form.get("password"),
  });

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

  const apiRes = await sdk.loginUser({
    body: r.data,
  });

  if (apiRes.error) {
    return {
      errors: {
        form: [apiRes.error.detail?.toString() ?? "Unknown backend error"],
      },
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("access_token", apiRes.data.access_token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1 * 30 * 1000),
    sameSite: "lax",
    path: "/",
  });
  cookieStore.set("refresh_token", apiRes.data.refresh_token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  });

  redirect(redirectPath ?? "/app", RedirectType.replace);

  // return { success: true };
}
