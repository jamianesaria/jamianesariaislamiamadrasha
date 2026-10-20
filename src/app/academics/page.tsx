import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import AcademicsPageSection from "@/components/AcademicsPageSection";

export const metadata: Metadata = {
  title: "শিক্ষা বিভাগ ও পাঠ্যক্রম | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাব বিভাগ, পূর্ণাঙ্গ সিলেবাস, ছাত্র প্রশিক্ষণ এবং ভবিষ্যৎ শিক্ষা পরিকল্পনা।",
};

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F0] flex flex-col">
      <HeaderBanner />
      <NavigationBar />
      <BreakingNewsBar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <AcademicsPageSection />
      </main>

      <Footer />
    </div>
  );
}

