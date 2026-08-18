"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main>
      <p>
        Page not found. <Link href="/">Home</Link>
      </p>
    </main>
  );
}
