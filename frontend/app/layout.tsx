import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./ui/landing/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newzly | Daily News",
  description: "All in one news app. Enjoy your dialy dose of news.",
};

export const viewport: Viewport = {
  themeColor: "#05472A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} scroll-smooth`}>
        <nav className="z-40 fixed w-full flex items-center justify-center">
          <Navbar />
        </nav>
        <section className="w-full" id="home">
          {children}
        </section>
      </body>
    </html>
  );
}
