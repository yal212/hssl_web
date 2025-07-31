import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthErrorHandler } from "@/components/AuthErrorHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "High School Soap Lab - 製作清潔環保手工皂，創造更美好的世界",
  description: "一群高中學生推廣環保手工皂。製作清潔環保手工皂，為地球和世界創造更美好的未來。",
  keywords: ["環保手工皂", "高中", "永續", "手工製作肥皂"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable} font-sans antialiased text-green-900`} style={{backgroundColor: '#f4efe1'}}>
        {/* Skip Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-800 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
        >
          跳至主要內容
        </a>

        <AuthErrorHandler />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
