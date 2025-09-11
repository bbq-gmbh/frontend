"use client";

import { ThemeToggle } from "./theme-toggle";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-svh flex flex-col">
        <header className="bg-background fixed top-0 right-0 left-0 flex h-16 shrink-0 items-center gap-2 px-4">
          <div className="ml-auto flex">
            <ThemeToggle />
          </div>
        </header>
        <div className="grow flex flex-col">
          <div className="h-16"></div>
          {children}
          <div className="grow max-h-16"></div>
        </div>
      </div>
    </>
  );
}
