import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-svw min-h-svh flex gap-4 items-center justify-center flex-wrap">
      <h1 className="font-bold">Not Found</h1>
      <div className="border-r border-foreground min-h-8"></div>
      <p>Could not find requested resource</p>
    </div>
  );
}
