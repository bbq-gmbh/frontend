import { CreateUserForm } from "@/app/ui/some_form";

export default async function () {
  return (
    <div className="flex-1 p-4">
      <h1>Users</h1>
      <CreateUserForm />
    </div>
  );
}
