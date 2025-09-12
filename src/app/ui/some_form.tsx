"use client";

import { createUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export function CreateUserForm() {
  const [state, action, pending] = useActionState(createUser, undefined);

  return (
    <>
      <form action={action} className="max-w-100 space-y-2 my-4">
        <div className="grid grid-cols-2">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        <div className="grid grid-cols-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            placeholder="1234"
            type="password"
          />
        </div>
        <Button disabled={pending} type="submit">
          Sign Up
        </Button>
      </form>
      <div className={state?.error ? "text-red-500" : "text-green-400"}>
        {state && <p className="break-all">{state.message}</p>}
      </div>
    </>
  );
}
