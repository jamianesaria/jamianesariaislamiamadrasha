import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import FacultyAndTeachersSection from "@/components/FacultyAndTeachersSection";

export const metadata: Metadata = {
  title: "সম্মানিত শিক্ষক মণ্ডলী ও উলামায়ে কেরাম | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার বুখারী শরিফের বিশেষ দরস প্রদানকারী উলামা, মুহাদ্দিস ও কিতাব বিভাগ, হিফজুল কুরআন বিভাগ, মক্তব বিভাগ এবং কর্মকর্তা ও স্টাফবৃন্দের পরিচিতি।",
};

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      <HeaderBanner />
      <NavigationBar />
      <BreakingNewsBar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <FacultyAndTeachersSection />
      </main>

      <Footer />
    </div>
  );
}

