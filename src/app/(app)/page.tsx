import { api } from "@/lib/backend";

export default async function Home() {
  let result = await fetch(api(""));

  let response = "<nothing>";

  if (result.ok) {
    response = await result.text();
  }

  return (
    // <div className="flex flex-1 flex-col gap-4 px-4 py-10">
    //   <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
    //   <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
    // </div>
    <div className="flex-1 p-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Start
      </h1>
      <p>{response}</p>
    </div>
  );
}
