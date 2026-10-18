import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import HistoryOrganizationSection from "@/components/HistoryOrganizationSection";

export const metadata: Metadata = {
  title: "History of the Organization | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর ইতিহাস, ঐতিহ্য ও পথচলার পূর্ণাঙ্গ বিবরণ।",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar with ABOUT US dropdown */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main History of Organization Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <HistoryOrganizationSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

