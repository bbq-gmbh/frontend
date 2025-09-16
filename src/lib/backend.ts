import * as sdk from "@/backend/sdk.gen";
import * as types from "@/backend/types.gen";
import { client } from "@/backend/client.gen";
import { createConfig } from "@/backend/client";

const backendUri = process.env.BACKEND;

export function api(path: string): string {
  client.setConfig(
    createConfig({
      baseUrl: "http://localhost:3001",
    })
  );

  sdk.createUserUsersPost({
    body: {
      username: "abcd",
      password: "pswd",
    },
  });

  const token = "";

  sdk.refreshTokenAuthRefreshPost({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (backendUri === undefined)
    throw Error("Backend uri not defined in environment");

  try {
    const base =
      backendUri.startsWith("http://") || backendUri.startsWith("https://")
        ? backendUri
        : `http://${backendUri}`;
    return new URL(path, base).href;
  } catch (e) {
    throw new Error(`Invalid backend URI or path: ${e}`);
  }
}
