import "server-only";

import { JWTPayload, jwtVerify } from "jose";

const tokenAlgorithm = process.env.TOKEN_ALGORITHM;
const tokenSecret = process.env.TOKEN_SECRET;
const tokenEncodedSecret = new TextEncoder().encode(tokenSecret);

export async function decrypt(token: string): Promise<JWTPayload | undefined> {
  if (!tokenAlgorithm || !tokenSecret) {
    throw new Error("TOKEN_ALGORITHM and TOKEN_SECRET must be set in .env");
  }

  try {
    const { payload } = await jwtVerify(token, tokenEncodedSecret, {
      algorithms: [tokenAlgorithm],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
