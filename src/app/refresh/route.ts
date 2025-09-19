import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("access_token", "test", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 60 * 1000),
  });
}