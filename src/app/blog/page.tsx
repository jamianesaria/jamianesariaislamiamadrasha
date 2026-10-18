import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Blog | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর অফিসিয়াল ব্লগ - শিক্ষা, অভিভাবকত্ব, স্বাস্থ্য, দ্বীনি প্রবন্ধ ও সচেতনতামূলক নিয়মিত লেখা।",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Blog Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <BlogSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

