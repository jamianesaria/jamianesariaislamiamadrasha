import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import CustomScrollbar from "@/components/CustomScrollbar";
import SanityVisualEditing from "@/components/SanityVisualEditing";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা | Jamia Nesaria Islamia Madrasha & Orphanage",
  description:
    "কুরআন-সুন্নাহর আলোকে দ্বীনি শিক্ষা, নৈতিকতা ও আদর্শ মানুষ গড়ার প্রত্যয়ে। মরকুন, (তিস্তাগেট- আনোয়ার সিল্ক মিলস সংলগ্ন) টঙ্গী, গাজীপুর, বাংলাদেশ। প্রতিষ্ঠাকাল: ১৯৬৯ খ্রিষ্টাব্দ।",
  icons: {
    icon: [
      { url: "/jamia-logo-v2.png" },
      { url: "/icon.png?v=3" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/jamia-logo-v2.png",
    apple: "/jamia-logo-v2.png",
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
        <CustomScrollbar />
        {children}
        <Suspense fallback={null}><SanityVisualEditing /></Suspense>
      </body>
    </html>
  );
}
