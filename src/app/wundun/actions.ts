"use server";

import { redirect } from "next/navigation";
import { passwordMatches, setWundunCookie } from "@/lib/wundun-auth";

export async function unlockWundun(attempts: number, formData: FormData) {
  const value = String(formData.get("password") ?? "");
  if (!passwordMatches(value)) return attempts + 1;
  await setWundunCookie();
  redirect("/wundun");
}
