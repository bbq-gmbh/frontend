"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function logout(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/login", RedirectType.replace);
}
