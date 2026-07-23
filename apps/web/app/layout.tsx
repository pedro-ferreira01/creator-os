import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/dashboard.css";
import { ToastProvider } from "@/providers/ToastProvider";
import { ConfirmProvider } from "@/providers/ConfirmProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CreatorOS",
  description: "Operating System for Creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${geistSans.variable} ${geistMono.variable}`}>
  <ToastProvider>
  <ConfirmProvider>
    {children}
  </ConfirmProvider>
</ToastProvider>
  
</body>
    </html>
  );
}
