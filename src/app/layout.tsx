import { ThemeScript } from "@/src/features/theme/components/theme-script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "../components/ui/sonner";
import { Providers } from "../providers";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worldtone Website",
  description: "Worldtone official website",
  icons: {
    icon: "/worldtoneLogo.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const theme = cookieStore.get(`_theme`)?.value || "light";
  const themeScript = await ThemeScript();


  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>{themeScript}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>

      </body>
    </html>
  );
}
