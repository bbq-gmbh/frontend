"use server";

import { api } from "@/lib/backend";

import { jwtVerify } from "jose";

export type FormState =
  | {
      message: string;
      error: boolean;
    }
  | undefined;

export async function createUser(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  //await new Promise((resolve) => setTimeout(resolve, 100));

  const fields = {
    username: formData.get("name"),
    password_hash: formData.get("password"),
  };

  const body = JSON.stringify(fields);

  console.log(body);

  const req = await fetch(api("users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  console.log(req);

  //await new Promise((resolve) => setTimeout(resolve, 300));

  if (req.ok) {
    const res = await req.json();
    return {
      message: `${JSON.stringify(res)}`,
      error: false,
    };
  }

  return {
    message: `${req.status} | ${req.statusText}`,
    error: true,
  };
}
