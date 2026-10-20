import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import AboutJamiaSection from "@/components/AboutJamiaSection";

export const metadata: Metadata = {
  title: "জামিয়া পরিচিতি ও ইতিহাস | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার প্রতিষ্ঠাকাল, ইতিহাস, জমিদাতাদের অবদান ও পূর্ণাঙ্গ পরিচিতি।",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F0] flex flex-col">
      <HeaderBanner />
      <NavigationBar />
      <BreakingNewsBar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <AboutJamiaSection />
      </main>

      <Footer />
    </div>
  );
}
