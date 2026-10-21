import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import NoticeBoardSection from "@/components/NoticeBoardSection";
import { getNotices, getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "নোটিশ ও বিজ্ঞপ্তি | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার কেন্দ্রীয় নোটিশ বোর্ড, ভর্তি বিজ্ঞপ্তি, বেফাক ও হাইআতুল উলয়া পরীক্ষার সময়সূচি, বাৎসরিক ছুটির তালিকা এবং অফিশিয়াল প্রজ্ঞাপন।",
};

export default async function NoticesPage() {
  const [notices, siteData, newsTicker] = await Promise.all([
    getNotices(),
    getSiteSettings(),
    getNewsTicker(),
  ]);

  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col">
      {/* 1. Header Banner */}
      <HeaderBanner initialSettings={siteData} />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News Ticker */}
      <BreakingNewsBar newsItems={newsTicker} />

      {/* 4. Main Notice Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-9 w-full flex-1">
        <NoticeBoardSection initialNotices={notices} />
      </main>

      {/* 5. Footer */}
      <Footer initialSettings={siteData} />
    </div>
  );
}
