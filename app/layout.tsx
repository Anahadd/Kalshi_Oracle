import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = localFont({
  src: [
    { path: "./fonts/inter-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
});

const dahlia = localFont({
  src: "./fonts/dahlia-medium.woff2",
  variable: "--font-dahlia",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Andreas Antonsson - Interaction Designer & Creative Developer",
  description: "Portfolio of Andreas Antonsson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dahlia.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
