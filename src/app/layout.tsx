import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { TranstackProvider } from "@/providers/transtack-provider";
import { MuiThemeProvider } from "@/providers/mui-theme-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Highway Management System",
  description: "Application for managing highway traffic and revenue reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<>Loading...</>}>
          <TranstackProvider>
            <AppRouterCacheProvider>
              <MuiThemeProvider>
                <AuthProvider>{children}</AuthProvider>
              </MuiThemeProvider>
            </AppRouterCacheProvider>
          </TranstackProvider>
        </Suspense>
      </body>
    </html>
  );
}
