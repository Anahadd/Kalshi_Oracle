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
  title: "Kalshi Called It | 2025 Prediction Accuracy",
  description: "Explore how Kalshi's prediction markets accurately forecasted hundreds of events in 2025. See the markets that called it before it happened.",
  openGraph: {
    title: "Kalshi Called It | 2025 Prediction Accuracy",
    description: "Before it happened, the market knew. Explore 742 predictions Kalshi got right in 2025.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalshi Called It | 2025 Prediction Accuracy",
    description: "Before it happened, the market knew. Explore 742 predictions Kalshi got right in 2025.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dahlia.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-[#00D991] selection:text-black overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
