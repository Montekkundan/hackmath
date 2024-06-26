import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { auth } from "@/auth";
import { SessionProvider } from 'next-auth/react'
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackMath",
  description: "Your personal Math learning platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <Analytics />
          {children}
        </body>
      </html>
  </SessionProvider>
  );
}