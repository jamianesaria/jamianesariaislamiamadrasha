import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import WebsiteRuntime from "@/components/WebsiteRuntime";
import SanityVisualEditing from "@/components/SanityVisualEditing";
import { seoDefaults, SITE_URL, seoRoutes } from "@/data/seoData";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seoRoutes["/"].label,
  description: seoDefaults.description,
  applicationName: seoDefaults.siteName,
  // Next's file conventions supply favicon.ico, icon.png and apple-icon.png.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-[#FAF7F0] font-sans antialiased text-gray-800">
        {children}
        <Suspense fallback={null}><WebsiteRuntime><SanityVisualEditing /></WebsiteRuntime></Suspense>
      </body>
    </html>
  );
}
