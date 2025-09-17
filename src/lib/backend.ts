import * as sdk from "@/backend/sdk.gen";

const backendUri = process.env.BACKEND;

export function api(path: string): URL {
  if (backendUri === undefined)
    throw Error("Backend uri not defined in environment");

  try {
    const base =
      backendUri.startsWith("http://") || backendUri.startsWith("https://")
        ? backendUri
        : `http://${backendUri}`;
    return new URL(path, base);
  } catch (e) {
    throw new Error(`Invalid backend URI or path: ${e}`);
  }
}
