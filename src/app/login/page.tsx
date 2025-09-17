"use client";

import { LoginForm } from "@/components/login-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  return (
    <div className="grow flex w-full items-center justify-center py-4 px-6">
      <div className="w-full max-w-sm">
        <LoginForm redirectPath={searchParams.get("redirect") ?? undefined} />
      </div>
    </div>
  );
}
