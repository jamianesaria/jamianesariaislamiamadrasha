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
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: seoDefaults.siteName,
    title: seoRoutes["/"].label,
    description: seoDefaults.description,
    url: SITE_URL,
    images: [{ url: seoDefaults.image, alt: seoDefaults.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoRoutes["/"].label,
    description: seoDefaults.description,
    images: [seoDefaults.image],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
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
