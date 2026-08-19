import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: " ",
  robots: { index: false, follow: false },
};

export default function WundunLayout({ children }: { children: ReactNode }) {
  return <div className="wundun">{children}</div>;
}
