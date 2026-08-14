import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "James Yang",
  description: "Software engineer in Toronto.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={plex.variable}>
      <body style={{ fontFamily: "var(--font-plex), var(--font)" }}>
        <LoadingScreen />
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
