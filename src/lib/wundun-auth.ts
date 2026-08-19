import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "wundun";
const HMAC_MSG = "wundun-ok";

function password() {
  return process.env.WUNDUN_PASSWORD ?? "";
}

function tokenFor(secret: string) {
  return createHmac("sha256", secret).update(HMAC_MSG).digest("hex");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  const expected = password();
  if (!expected) return false;
  return equal(tokenFor(input), tokenFor(expected));
}

export async function isWundunUnlocked() {
  const expected = password();
  if (!expected) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  return equal(token, tokenFor(expected));
}

export async function setWundunCookie() {
  const expected = password();
  if (!expected) return;
  (await cookies()).set(COOKIE, tokenFor(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/wundun",
    maxAge: 60 * 60 * 24 * 30,
  });
}
