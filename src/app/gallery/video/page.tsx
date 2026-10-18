import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import VideoGallerySection from "@/components/VideoGallerySection";

export const metadata: Metadata = {
  title: "Video Gallery | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর ভিডিও গ্যালারি - পবিত্র কুরআন তেলাওয়াত, তাফসির, দ্বীনি নসিহত ও মাদ্রাসার অনুষ্ঠানমালার ভিডিও সংগ্রহ।",
};

export default function VideoGalleryPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Video Gallery Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <VideoGallerySection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

