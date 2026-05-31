import crypto from "crypto";
import { cookies } from "next/headers";
import type { SessionUser, UserRole } from "./types";

const COOKIE_NAME = "jasaku_session";

function secret() {
  return process.env.AUTH_SECRET || "jasaku-local-development-secret";
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

function encodeSession(user: SessionUser) {
  const payload = toBase64Url(JSON.stringify({ ...user, issued_at: Date.now() }));
  return `${payload}.${sign(payload)}`;
}

function decodeSession(value: string | undefined) {
  if (!value) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature || sign(payload) !== signature) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as SessionUser & { issued_at?: number };
    if (!parsed.id || !parsed.email || !parsed.role) {
      return null;
    }

    return {
      id: Number(parsed.id),
      username: parsed.username,
      email: parsed.email,
      full_name: parsed.full_name,
      role: parsed.role,
      profile_image: parsed.profile_image,
    } satisfies SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const store = await cookies();
  return decodeSession(store.get(COOKIE_NAME)?.value);
}

export async function setSessionUser(user: SessionUser) {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionUser() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function hasRole(role: UserRole) {
  const user = await getSessionUser();
  return user?.role === role;
}
