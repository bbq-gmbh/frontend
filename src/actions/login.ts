"use server";

import { loginSchema } from "@/lib/schemas/auth";

export type LoginFormState = {
  errors?: { form?: string[] };
  values?: { username?: string };
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

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!r.success) {
    // Collapse all validation issues into a single form-level list.
    return {
      errors: { form: r.error.issues.map(i => i.message) },
      values: { username: (form.get("username") as string) || "" },
    };
  }
  return { success: true };
}
