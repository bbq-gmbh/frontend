"use client";

import { useSearchParams } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export function LoginPage() {
  const searchParams = useSearchParams();

  return (
    <div className="grow flex w-full items-center justify-center py-4 px-6">
      <div className="w-full max-w-sm">
        <LoginForm redirectPath={searchParams.get("redirect") ?? undefined} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
