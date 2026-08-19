import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  variable: "--font-plex-serif",
});

export const metadata: Metadata = {
  title: "James Yang",
  description: "Software engineer in Toronto.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${plexSerif.variable}`}>
      <body style={{ fontFamily: "var(--font-plex), var(--font)" }}>
        {children}
      </body>
    </html>
  );
}
