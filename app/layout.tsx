import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Eureka Quest",
  description: "Survey tool for asking smart questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "flex flex-col min-h-screen bg-background antialiased",
        fontSans.className)}
      >{children}</body>
    </html>
  );
}
