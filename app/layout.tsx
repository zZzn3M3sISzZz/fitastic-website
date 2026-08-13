import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fitastic | Your Next Level Starts Here",
  description:
    "Track your progress, crush your goals, and redefine what’s possible with real-time AI analytics. Join the Fitastic waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-canvas font-sans antialiased">{children}</body>
    </html>
  );
}
