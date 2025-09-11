import { LoginForm } from "@/components/login-form";
import LoginLayout from "@/components/login-layout";

export default function Page() {
  return (
    <div className="grow flex w-full items-center justify-center py-4 px-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
