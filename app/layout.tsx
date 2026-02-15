import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import FontAwesomeConfig from "@/lib/fontawesome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nauffal Code",
  description: "A portfolio that contains all of my dream.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Breadcrumbs
  const urlPathName = useMemo(() => {
    if (typeof window === "undefined") return "";
    const path = window.location.pathname;
    return path === "/"
      ? "Home"
      : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  }, []);
  return (
    <html lang="en">
      <head>
        <FontAwesomeConfig />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
