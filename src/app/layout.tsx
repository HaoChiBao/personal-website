import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif, Instrument_Serif } from "next/font/google";
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
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plex-serif",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-plex-mono",
});

const fireworksFace = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-fireworks",
});

const description = "Building agentic systems people rely on.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yangjames.com"),
  title: "James Yang",
  description,
  openGraph: {
    title: "James Yang",
    description,
    url: "https://yangjames.com",
    siteName: "James Yang",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1024,
        height: 537,
        alt: "James Yang. Building agentic systems people rely on.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Yang",
    description,
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plex.variable} ${plexSerif.variable} ${plexMono.variable} ${fireworksFace.variable}`}
    >
      <body style={{ fontFamily: "var(--font-plex), var(--font)" }}>
        {children}
      </body>
    </html>
  );
}
