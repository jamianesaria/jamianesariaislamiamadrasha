import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ExamRoutineSection from "@/components/ExamRoutineSection";

export const metadata: Metadata = {
  title: "পরীক্ষা রুটিন (Exam Routine) | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর সকল শ্রেণির পরীক্ষা রুটিন ও পরীক্ষার সময়সূচী।",
};

export default function ExamRoutinePage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Exam Routine Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <ExamRoutineSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

