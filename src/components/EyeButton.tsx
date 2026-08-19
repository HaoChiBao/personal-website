import Link from "next/link";

export default function EyeButton() {
  return (
    <Link href="/wundun" className="eye-btn" aria-label="Look">
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2.1 12s3.4-7 9.9-7 9.9 7 9.9 7-3.4 7-9.9 7-9.9-7-9.9-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </Link>
  );
}
