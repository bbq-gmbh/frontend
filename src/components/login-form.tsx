"use client";

import { useActionState, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login, type LoginFormState } from "@/actions/login";
import { toast } from "sonner";

export function LoginForm({
  className,
  redirectPath,
  ...props
}: React.ComponentProps<"div"> & { redirectPath?: string }) {
  const [state, loginAction, pending] = useActionState(
    login.bind(null, redirectPath),
    undefined
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.errors?.form && state.errors.form.length > 0) {
      toast.error("Login failed", {
        richColors: true,
        description: (
          <>
            {state.errors.form.map((error, index, a) => (
              <span key={index}>
                {error}
                {index + 1 < a.length && <br />}
              </span>
            ))}
          </>
        ),
      });
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>In Account einloggen</CardTitle>
          <CardDescription>Gebe den Username und Passwort ein</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder=""
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Passwort</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button disabled={pending} type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
