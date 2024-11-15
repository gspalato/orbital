import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Link from "next/link";

import "./globals.css";


export const metadata: Metadata = {
  title: "Orbital",
  description: "A chemistry tool for university students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <header className="flex items-center w-full h-8 flex-row justify-between px-12 my-8">
          <Link href="/" className="font-black text-xl font-[Syne] text-white">
            orbital
          </Link>
          <div>
            <Link
              href="/quizzes"
              className="font-[Inter] text-white/75 text-md"
            >
              Quizzes
            </Link>
          </div>
        </header>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
