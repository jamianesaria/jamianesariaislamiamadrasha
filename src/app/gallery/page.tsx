import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import MainGallerySection from "@/components/MainGallerySection";

export const generateMetadata = editableMetadata("/gallery", {
  title: "ফটো ও ভিডিও গ্যালারি | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মনোরম ক্যাম্পাস, পাঠদান, হিফজুল কুরআন ও বিভিন্ন দ্বীনি আয়োজনের স্থিরচিত্র, ড্রোন ফুটেজ ও ভিডিও মহাফেজখানা।",
});

function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Gallery Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 w-full flex-1">
        <MainGallerySection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
export default editableRoute("/gallery", GalleryPage);
