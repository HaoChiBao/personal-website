import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "James Yang · Experimental",
  robots: { index: false, follow: false },
};

export default function ExperimentalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SiteChrome forest>{children}</SiteChrome>;
}
