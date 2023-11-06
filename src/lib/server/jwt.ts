import { JWT_SECRET } from "$env/static/private";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
const secret = new TextEncoder().encode(JWT_SECRET);
const alg = "HS256";

async function createJWT(claims: JWTPayload) {
  return await new SignJWT(claims)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

async function validateJWT(jwt: string) {
  return jwtVerify(jwt, secret);
}
export { createJWT, validateJWT };
