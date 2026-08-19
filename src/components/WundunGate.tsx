"use client";

import { useActionState, useEffect, useRef } from "react";
import { unlockWundun } from "@/app/wundun/actions";

export default function WundunGate() {
  const [attempts, action, pending] = useActionState(unlockWundun, 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const failed = attempts > 0;

  useEffect(() => {
    if (!failed) return;
    const input = inputRef.current;
    if (!input) return;
    input.value = "";
    input.focus();
  }, [attempts, failed]);

  return (
    <form action={action} className="wundun-gate">
      <input
        ref={inputRef}
        type="password"
        name="password"
        autoFocus
        autoComplete="off"
        spellCheck={false}
        disabled={pending}
        aria-label="Password"
        aria-invalid={failed || undefined}
      />
    </form>
  );
}
